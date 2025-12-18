import { ROOM_CONFIG, SOCKET_EVENT } from '@shared/constants/socket-event';
import type { RoomAvailabilityPayload, RoomUserEventPayload } from '@shared/types/room';
import type { Socket } from 'socket.io-client';
import { create } from 'zustand';

import { connectBattleSocket, disconnectBattleSocket } from '../lib/battleSocket';

type RoomListenerSet = {
  availability: (payload: RoomAvailabilityPayload) => void;
  stateSync: (payload: RoomAvailabilityPayload) => void;
  joined: (payload: RoomUserEventPayload) => void;
  left: (payload: RoomUserEventPayload) => void;
};

interface BattleSocketState {
  socket: Socket | null;
  isConnected: boolean;
  roomState: RoomAvailabilityPayload | null;
  listeners: RoomListenerSet | null;
  connect: () => Socket;
  disconnect: () => void;
  bindRoomEvents: (roomId: string) => void;
  requestRoomAvailability: (roomId: string) => void;
  clearRoomListeners: () => void;
}

export const useBattleSocketStore = create<BattleSocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  roomState: null,
  listeners: null,
  // 단일 소켓 인스턴스를 유지하고 기본 연결 상태를 관리합니다.
  connect: () => {
    const existing = get().socket;
    if (existing?.connected) {
      return existing;
    }

    if (existing) {
      existing.connect();
      return existing;
    }

    const newSocket = connectBattleSocket();

    newSocket.on(SOCKET_EVENT.CONNECT, () => set({ isConnected: true }));
    newSocket.on(SOCKET_EVENT.DISCONNECT, () => set({ isConnected: false }));

    set({ socket: newSocket, isConnected: newSocket.connected });
    return newSocket;
  },
  // 소켓과 방 상태를 정리합니다.
  disconnect: () => {
    get().clearRoomListeners();
    disconnectBattleSocket();
    set({ isConnected: false, socket: null, roomState: null });
  },
  // 방 관련 리스너가 등록된 경우 제거합니다.
  clearRoomListeners: () => {
    const socket = get().socket;
    const listeners = get().listeners;
    if (!socket || !listeners) return;

    socket.off(SOCKET_EVENT.ROOM_AVAILABILITY, listeners.availability);
    socket.off(SOCKET_EVENT.ROOM_STATE_SYNC, listeners.stateSync);
    socket.off(SOCKET_EVENT.ROOM_USER_JOINED, listeners.joined);
    socket.off(SOCKET_EVENT.ROOM_USER_LEFT, listeners.left);

    set({ listeners: null });
  },
  // 방의 인원 현황/동기화/입장/퇴장 이벤트를 바인딩합니다.
  bindRoomEvents: (roomId: string) => {
    const socket = get().connect();

    // 기존 리스너 제거 후 재등록
    get().clearRoomListeners();

    const setRoomState = (payload: RoomAvailabilityPayload) => {
      if (payload.roomId !== roomId) return;
      set({ roomState: payload });
    };

    const handleUserJoined = (payload: RoomUserEventPayload) => {
      if (payload.roomId !== roomId) return;
      set((state) => {
        const prev =
          state.roomState ??
          ({
            roomId,
            currentPlayers: [],
            currentSpectators: [],
            maxPlayers: ROOM_CONFIG.MAX_PLAYERS,
          } as RoomAvailabilityPayload);
        const targetKey = payload.user.role === 'player' ? 'currentPlayers' : 'currentSpectators';
        const alreadyIn = prev[targetKey].some((user) => user.userId === payload.user.userId);
        if (alreadyIn) {
          return { roomState: prev };
        }
        return {
          roomState: {
            ...prev,
            [targetKey]: [...prev[targetKey], payload.user],
          },
        };
      });
    };

    const handleUserLeft = (payload: RoomUserEventPayload) => {
      if (payload.roomId !== roomId) return;
      set((state) => {
        if (!state.roomState) return state;
        const targetKey = payload.user.role === 'player' ? 'currentPlayers' : 'currentSpectators';
        return {
          roomState: {
            ...state.roomState,
            [targetKey]: state.roomState[targetKey].filter(
              (user) => user.userId !== payload.user.userId,
            ),
          },
        };
      });
    };

    socket.on(SOCKET_EVENT.ROOM_AVAILABILITY, setRoomState);
    socket.on(SOCKET_EVENT.ROOM_STATE_SYNC, setRoomState);
    socket.on(SOCKET_EVENT.ROOM_USER_JOINED, handleUserJoined);
    socket.on(SOCKET_EVENT.ROOM_USER_LEFT, handleUserLeft);

    set({
      listeners: {
        availability: setRoomState,
        stateSync: setRoomState,
        joined: handleUserJoined,
        left: handleUserLeft,
      },
    });
  },
  // 방 상태를 한 번 요청합니다.
  requestRoomAvailability: (roomId: string) => {
    const socket = get().connect();
    socket.emit(SOCKET_EVENT.CHECK_ROOM_AVAILABILITY, { roomId });
  },
}));

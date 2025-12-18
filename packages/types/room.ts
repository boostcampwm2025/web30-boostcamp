import type { RoomUser } from './user';

export type RoomStatus = 'waiting' | 'in-battle';

export interface Room {
  roomId: string;
  title: string;
  hostId: string;
  status: RoomStatus;
  createdAt: Date;
  settings: RoomSettings;
  // 현재 접속한 유저 리스트
  currentPlayers: RoomUser[];
  currentSpectators: RoomUser[];
}

// 방 설정(방 생성)
export interface RoomSettings {
  maxPlayers: number;
  password?: string;
  timeout?: number;
}

export interface RoomCreateDTO {
  title: string;
  hostId: string;
  settings: RoomSettings;
}

// === Socket DTOs ===

// Client -> Server
export interface RoomAvailabilityRequest {
  roomId: string;
}

// Server -> Client
export interface RoomAvailabilityPayload {
  roomId: string;
  currentPlayers: RoomUser[];
  currentSpectators: RoomUser[];
  maxPlayers: number;
}

// 방 유저 입장/퇴장 이벤트 페이로드
export interface RoomUserEventPayload {
  roomId: string;
  user: RoomUser;
}

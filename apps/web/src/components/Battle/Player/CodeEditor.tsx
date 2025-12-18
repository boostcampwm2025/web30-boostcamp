import { BATTLE_EVENTS } from '@shared/constants/battle';
import { SOCKET_EVENT } from '@shared/constants/socket-event';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import { useRoomStore } from '@/store/roomStore';

function CodeEditor() {
  const { roomId: roomIdParam } = useParams<{ roomId?: string }>();
  const [searchParams] = useSearchParams();
  const roomId = roomIdParam ?? searchParams.get('roomId') ?? 'room-unknown';
  const { me, setMe } = useRoomStore((state) => ({ me: state.me, setMe: state.setMe }));

  // 소켓은 useMemo로 생성 후 useEffect로 언마운트 시 disconnect
  const socket = useMemo(
    () =>
      io('/', {
        transports: ['websocket'],
        autoConnect: true,
      }),
    [],
  );
  const [code, setCode] = useState(`function solution() {
  // TODO
}`);

  useEffect(
    () => () => {
      socket.disconnect();
    },
    [socket],
  );

  useEffect(() => {
    const handleStateSync = (payload: {
      roomId: string;
      role: string;
      userId: string;
      username: string;
    }) => {
      if (payload.roomId !== roomId) return;
      setMe({
        roomId: payload.roomId,
        role: payload.role as never,
        userId: payload.userId,
        username: payload.username,
      });
    };

    socket.on(SOCKET_EVENT.ROOM_STATE_SYNC, handleStateSync);
    return () => {
      socket.off(SOCKET_EVENT.ROOM_STATE_SYNC, handleStateSync);
    };
  }, [roomId, setMe, socket]);

  const handleChange = (value: string) => {
    setCode(value);
    if (!socket?.connected) return;

    socket.emit(BATTLE_EVENTS.CODE_CHANGE, {
      roomId,
      userId: me?.userId ?? socket.id,
      code: value,
      language: 'javascript',
    });
  };

  return (
    <>
      <section className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/90 shadow-xl shadow-slate-950/50">
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-sm font-semibold">
          <div className="flex items-center gap-2 text-slate-200">
            <span className="rounded bg-slate-800 px-3 py-1 text-xs font-bold text-emerald-200">
              코드 에디터
            </span>
            <button className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/40">
              JavaScript
            </button>
            {/* <button className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700">
              Python
            </button>
            <button className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700">
              Java
            </button>
            <button className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700">
              C++
            </button> */}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <button className="rounded-lg border border-slate-700 px-2 py-1 hover:border-slate-500">
              -
            </button>
            <span className="rounded-lg border border-slate-700 px-2 py-1 text-slate-100">
              16px
            </span>
            <button className="rounded-lg border border-slate-700 px-2 py-1 hover:border-slate-500">
              +
            </button>
            <button className="rounded-lg border border-slate-700 px-2 py-1 hover:border-slate-500">
              ⟳
            </button>
          </div>
        </div>
        <div className="flex-1 bg-slate-950 px-5 py-4 font-mono text-sm text-slate-100">
          <textarea
            value={code}
            onChange={(e) => handleChange(e.target.value)}
            spellCheck={false}
            className="h-[520px] w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm leading-relaxed text-slate-100 shadow-inner shadow-slate-950/50 focus:border-emerald-400 focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200">
          <button className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700">
            ▶ 코드 실행
          </button>
          <div className="text-xs text-slate-400">
            테스트: <span className="text-emerald-300">0/10</span> 통과
          </div>
          <button className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400">
            제출하기
          </button>
        </div>
      </section>
    </>
  );
}

export default CodeEditor;

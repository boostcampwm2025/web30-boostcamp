import type { UserRole } from '@shared/types/user';
import { useEffect, useState } from 'react';

import { JoinModal } from '../components/JoinModal';
import { useBattleSocketStore } from '../stores/battleSocketStore';

const DEFAULT_ROOM_ID = '1';

function MainPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('player');
  const {
    connect,
    disconnect,
    bindRoomEvents,
    requestRoomAvailability,
    roomState,
    clearRoomListeners,
  } = useBattleSocketStore();

  const handleCloseModal = () => {
    setModalOpen(false);
    clearRoomListeners();
    //disconnect();
  };

  const participants = {
    count: roomState?.currentPlayers.length ?? 0,
    limit: roomState?.maxPlayers ?? 2,
  };
  const spectators = {
    count: roomState?.currentSpectators.length ?? 0,
    limit: Infinity,
  };

  const handleStartBattle = () => {
    connect();
    bindRoomEvents(DEFAULT_ROOM_ID);
    requestRoomAvailability(DEFAULT_ROOM_ID);
    setModalOpen(true);
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return (
    <div className="min-h-screen">
      <header className="mb-2 flex items-center gap-3 border-b border-soft bg-white px-10 py-6 shadow-sm">
        <div className="grid h-12 w-12 rounded-2xl bg-brand shadow-lg"></div>
        <div className="flex flex-col">
          <span className="text-lg font-extrabold tracking-tight logo-gradient">CODE RENA</span>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-10 pt-10 px-10 pb-16 bg-surface">
        <div className="flex items-start gap-3">
          <div className="h-10 w-1 rounded-full bg-brand" />
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">대결 로비</h1>
            <p className="text-sm text-slate-600">실시간 코딩 대결에 참여하세요</p>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="rounded-2xl border border-soft bg-white px-12 py-16 text-center shadow-sm">
            <button
              type="button"
              onClick={handleStartBattle}
              className="rounded-2xl bg-cta-main px-8 py-4 text-lg font-semibold text-white shadow-md transition hover:scale-[1.02]"
            >
              배틀 시작하기
            </button>
          </div>
        </div>
      </main>

      <JoinModal
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedRole={selectedRole}
        onSelectRole={setSelectedRole}
        participants={participants}
        spectators={spectators}
      />
    </div>
  );
}

export default MainPage;

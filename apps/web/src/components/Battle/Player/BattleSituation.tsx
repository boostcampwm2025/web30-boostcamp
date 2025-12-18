function BattleProgress() {
  const activityLogs = [
    { label: '코드 작성 시작', time: '00:15' },
    { label: '첫 번째 테스트 실행', time: '02:30' },
    { label: '코드 수정 중', time: '04:45' },
  ];
  return (
    <>
      <section className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 text-lg font-bold text-white">
            C
          </div>
          <div>
            <p className="text-lg font-semibold text-white">CodeNinja</p>
            {/* <p className="text-xs font-semibold text-amber-300">🥇 Gold · 승률 72%</p> */}
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            실시간 상태
          </div>
          <p className="text-sm text-slate-200">코딩 중...</p>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-200">
            <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">
              <p className="text-slate-400">코드 라인</p>
              <p className="text-lg text-white">42</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">
              <p className="text-slate-400">실행 횟수</p>
              <p className="text-lg text-white">6</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            활동 기록
          </div>
          <div className="space-y-2 text-xs text-slate-200">
            {activityLogs.map((log) => (
              <div
                key={log.label}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2"
              >
                <span>{log.label}</span>
                <span className="text-slate-400">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-center">
          <p className="text-xs font-semibold text-slate-400">상대 통계</p>
          <div className="mt-2 flex items-center justify-center gap-4 text-sm font-bold">
            <div className="text-emerald-300">
              156 <span className="text-slate-400 font-semibold">배틀</span>
            </div>
            <div className="text-emerald-300">
              112 <span className="text-slate-400 font-semibold">승리</span>
            </div>
            <div className="text-pink-300">
              44 <span className="text-slate-400 font-semibold">패배</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BattleProgress;

function BattleHeader() {
  return (
    <header className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 shadow-lg shadow-slate-950/40 backdrop-blur">
      <div className="flex w-full flex-wrap items-center gap-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Battle
            </p>
            <h1 className="text-lg font-bold text-white">CODE RENA</h1>
          </div>
        </div>

        <div className="flex flex-1 justify-center">
          <div className="flex items-center gap-3 rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-emerald-200 shadow-inner shadow-black/50">
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-emerald-300">
              남은 시간
            </span>
            <span className="text-lg text-emerald-300">27:16</span>
          </div>
        </div>

        <button className="ml-auto inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800">
          나가기
        </button>
      </div>

      <div className="flex w-full flex-row gap-5">
        <div className="flex flex-1 items-center gap-2 min-w-[220px]">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            You
          </div>
          <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
            <span className="absolute left-0 top-0 h-full w-[12%] bg-emerald-400" />
            <span className="absolute left-0 top-0 h-full w-full bg-emerald-600/30" />
            <span className="absolute left-0 top-0 h-full w-[60%] bg-emerald-600" />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <span>0%</span>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-2 min-w-[220px]">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-[10px] font-bold text-white">
              C
            </div>
          </div>
          <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
            <span className="absolute left-0 top-0 h-full w-[12%] bg-emerald-400" />
            <span className="absolute left-0 top-0 h-full w-full bg-pink-600/30" />
            <span className="absolute left-0 top-0 h-full w-[60%] bg-pink-600" />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-300">
            <span>0%</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default BattleHeader;

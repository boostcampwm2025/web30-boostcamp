function ProgressBar() {
  return (
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
  );
}

export default ProgressBar;

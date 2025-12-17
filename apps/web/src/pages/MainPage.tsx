export function MainPage() {
  return (
    <div className="min-h-screen">
      <header className="flex items-center gap-3 px-10 py-6 bg-white border-b border-black/5 shadow-sm mb-2">
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
          <div className="rounded-2xl border border-black/5 bg-white px-12 py-16 text-center shadow-sm">
            <button
              type="button"
              //onClick={handleStartBattle}
              className="rounded-2xl bg-linear-to-br from-cta-main-start to-cta-main-end px-8 py-4 text-lg font-semibold text-white shadow-md transition hover:scale-[1.02]"
            >
              배틀 시작하기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

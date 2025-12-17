function ChatSpectator() {
  const chatMessages = [
    { author: 'CodeFan123', time: '14:31', text: 'CodeMaster 화이팅!' },
    { author: 'AlgoLover', time: '14:32', text: '이 문제 어렵네요 ㄷㄷ' },
    { author: 'DevWatcher', time: '14:33', text: 'AlgoKing 진행도 빠르다' },
    { author: 'System', time: '방금 전', text: 'CodeMaster님이 테스트를 통과했습니다!' },
  ];
  return (
    <>
      <section className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/40">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-200">실시간 채팅</p>
          <span className="text-[11px] font-semibold text-emerald-300">관전 모드</span>
        </div>
        <div className="flex-1 space-y-3 overflow-auto rounded-xl border border-slate-800 bg-slate-900/80 p-3">
          {chatMessages.map((msg) => (
            <div
              key={msg.author + msg.time}
              className="space-y-1 rounded-lg border border-slate-800 bg-slate-900/80 p-3 text-xs text-slate-200"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-slate-200">{msg.author}</span>
                <span>{msg.time}</span>
              </div>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">
          <input
            placeholder="메시지를 입력하세요..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          <button className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400">
            전송
          </button>
        </div>
      </section>
    </>
  );
}

export default ChatSpectator;

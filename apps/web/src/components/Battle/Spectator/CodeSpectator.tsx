import { useMemo, useState } from 'react';

function CodeSpectator() {
  const participants = [
    {
      id: 'codeMaster',
      name: 'CodeMaster',
      tier: 'Gold',
      progress: 75,
      solved: 6,
      total: 8,
      color: 'emerald',
      code: `function twoSum(nums, target) {
    const map = new Map();
  
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (map.has(complement)) {
        return [map.get(complement), i];
      }
      map.set(nums[i], i);
    }
    return [];
  }
  
  // 테스트 케이스
  console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`,
    },
    {
      id: 'algoKing',
      name: 'AlgoKing',
      tier: 'Gold',
      progress: 65,
      solved: 5,
      total: 8,
      color: 'rose',
      code: `function twoSum(nums, target) {
    const indexes = new Map();
    for (let i = 0; i < nums.length; i++) {
      const diff = target - nums[i];
      if (indexes.has(diff)) return [indexes.get(diff), i];
      indexes.set(nums[i], i);
    }
    return [];
  }`,
    },
  ];

  const [selectedId, setSelectedId] = useState(participants[0].id);
  const selected = useMemo(
    () => participants.find((p) => p.id === selectedId) ?? participants[0],
    [selectedId],
  );

  return (
    <>
      <section className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/40">
        <div className="grid gap-3 md:grid-cols-2">
          {participants.map((player) => (
            <button
              key={player.id}
              type="button"
              onClick={() => setSelectedId(player.id)}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                selectedId === player.id
                  ? 'border-emerald-500/70 bg-slate-900 shadow-lg shadow-emerald-500/30'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white ${
                    player.color === 'emerald' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                >
                  {player.name[0]}
                </span>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-white">{player.name}</p>
                  {/* <p className="text-xs font-semibold text-amber-300">🏅 {player.tier}</p> */}
                  <p className="text-[11px] text-slate-400">
                    {player.solved}/{player.total} 통과
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 text-sm font-semibold text-white">
                <span>{player.progress}%</span>
                <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-800">
                  <span
                    className={`block h-full rounded-full ${
                      player.color === 'emerald' ? 'bg-emerald-400' : 'bg-rose-500'
                    }`}
                    style={{ width: `${player.progress}%` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-inner shadow-slate-950/50">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-emerald-300">🧑‍💻</span>
              <span>{selected.name}의 코드</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-200">JavaScript</span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-200">읽기 전용</span>
            </div>
          </div>

          <div className="min-h-[420px] rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 font-mono text-sm leading-relaxed text-slate-100">
            <pre className="whitespace-pre-wrap">{selected.code}</pre>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-emerald-300">
                ● {selected.solved}개 테스트 통과
              </span>
              <span className="flex items-center gap-1 text-rose-300">
                ● {selected.total - selected.solved}개 실패
              </span>
            </div>
            <span>마지막 업데이트: 방금 전</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default CodeSpectator;

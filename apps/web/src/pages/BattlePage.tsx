import BattleHeader from '@/components/Battle/BattleHeader';
import BattleProblem from '@/components/Battle/BattleProblem';
import BattleProgress from '@/components/Battle/BattleProgress';
import CodeEditor from '@/components/Battle/CodeEditor';

function BattlePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="flex min-h-screen w-full flex-col gap-4 px-4 py-4 lg:px-6">
        <BattleHeader />

        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[1.2fr_2fr_1fr]">
          <BattleProblem />
          <CodeEditor />
          <BattleProgress />
        </div>
      </div>
    </div>
  );
}

export default BattlePage;

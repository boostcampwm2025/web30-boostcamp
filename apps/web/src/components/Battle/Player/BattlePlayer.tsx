import BattleProblem from '@/components/Battle/BattleProblem';
import BattleProgress from '@/components/Battle/Player/BattleSituation';
import CodeEditor from '@/components/Battle/Player/CodeEditor';
import ProgressBar from '@/components/Battle/Player/ProgressBar';

function BattlePlayer() {
  return (
    <>
      <ProgressBar />
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[1.2fr_2fr_1fr]">
        <BattleProblem />
        <CodeEditor />
        <BattleProgress />
      </div>
    </>
  );
}

export default BattlePlayer;

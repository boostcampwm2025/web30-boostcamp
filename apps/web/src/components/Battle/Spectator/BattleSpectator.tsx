import BattleProblem from '../BattleProblem';
import ChatSpectator from './ChatSpectator';
import CodeSpectator from './CodeSpectator';

function BattleSpectator() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_1.9fr_1fr]">
        <BattleProblem />
        <CodeSpectator />
        <ChatSpectator />
      </div>
    </>
  );
}

export default BattleSpectator;

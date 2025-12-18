import { useSearchParams } from 'react-router-dom';

import BattleHeader from '@/components/Battle/BattleHeader';
import BattlePlayer from '@/components/Battle/Player/BattlePlayer';
import BattleSpectator from '@/components/Battle/Spectator/BattleSpectator';

function BattlePage() {
  const [searchParams] = useSearchParams();
  const isSpectator = searchParams.get('mode') === 'spectator';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="flex min-h-screen w-full flex-col gap-4 px-4 py-4 lg:px-6">
        <BattleHeader />
        {isSpectator ? <BattleSpectator /> : <BattlePlayer />}
      </div>
    </div>
  );
}

export default BattlePage;

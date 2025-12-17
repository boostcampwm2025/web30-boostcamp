import { Outlet } from 'react-router-dom';

function App() {
  return (
    <main className="min-h-screen bg-surface text-ink">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
        <Outlet />
      </div>
    </main>
  );
}

export default App;

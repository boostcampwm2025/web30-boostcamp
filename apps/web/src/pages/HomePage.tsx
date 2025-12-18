function HomePage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-brand px-3 py-1 text-sm font-semibold text-brand-foreground">
        <span className="h-2 w-2 rounded-full bg-brand-foreground" />
        Tailwind v4
      </div>
      <div className="space-y-4 rounded-2xl border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Custom theme colors</h1>
        <p className="text-lg text-slate-600">
          index.css defines <code className="rounded bg-slate-100 px-1">brand</code> /
          <code className="rounded bg-slate-100 px-1">surface</code> /{' '}
          <code className="rounded bg-slate-100 px-1">ink</code> colors with Tailwind v4&apos;s
          <code className="rounded bg-slate-100 px-1">@theme</code> block. These utilities are now
          available as <code className="rounded bg-slate-100 px-1">bg-brand</code> or{' '}
          <code className="rounded bg-slate-100 px-1">text-ink</code>.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-brand-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <span className="h-2 w-2 rounded-full bg-brand-foreground" />
            Brand CTA
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-surface px-4 py-2 text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            Secondary
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomePage;

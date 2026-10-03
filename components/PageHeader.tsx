export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header>
      <h1 className="font-display text-5xl font-light tracking-[0.12em] sm:text-6xl md:text-8xl">
        {title}
      </h1>
      <p className="mt-4 font-mono text-[11px] tracking-[0.3em] text-mute">{subtitle}</p>
    </header>
  );
}

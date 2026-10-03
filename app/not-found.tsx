import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[80dvh] max-w-6xl flex-col justify-center px-6 pt-24 md:px-10"
    >
      <p className="font-mono text-[11px] tracking-[0.3em] text-mute">404</p>
      <h1 className="mt-4 font-display text-5xl font-light sm:text-7xl">Halaman tidak ditemukan.</h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-mute">
        Alamat yang kamu tuju tidak ada atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-12 w-fit items-center border border-ink/40 px-7 py-4 font-mono text-xs tracking-[0.3em] transition-colors duration-500 hover:bg-ink hover:text-void"
      >
        KEMBALI KE BERANDA
      </Link>
    </main>
  );
}

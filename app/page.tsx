import { About } from "@/components/About";
import { Constitutional } from "@/components/Constitutional";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { IntroProvider } from "@/components/IntroProvider";
import { Statistics } from "@/components/Statistics";
import { Structure } from "@/components/Structure";
import { getStats } from "@/lib/members";

export default function HomePage() {
  // Semua angka diturunkan dari data/members.ts, tidak ada yang di-hardcode.
  const stats = getStats();

  return (
    <IntroProvider>
      <main id="main">
        <Hero />
        <About />
        <Constitutional />
        <Statistics stats={stats} />
        <Structure stats={stats} />
        <Contact />
      </main>
    </IntroProvider>
  );
}

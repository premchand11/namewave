import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { PronunciationForm } from "@/components/pronunciation-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen text-foreground">

      <div className="absolute inset-0 -z-10 grid-background" />

      <Navbar />

      <main>
        <Hero />
        <PronunciationForm />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}

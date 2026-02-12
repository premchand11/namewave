"use client"

export function Hero() {
  return (
    <section className="relative text-center py-14 sm:py-20">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
        Make Sure The World <br />
        Pronounces Your Name Correctly
      </h2>

      <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
        Generate natural-sounding pronunciations in multiple voices instantly.
      </p>

      <button
        className="mt-8 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
        onClick={() =>
          document
            .getElementById("generator")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        🎙️ Try It Now
      </button>
    </section>
  );
}

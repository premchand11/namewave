"use client";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-tight">
        NameWave
      </h1>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={() =>
            document
              .getElementById("generator")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Try Now
        </Button>

        <ThemeToggle />
      </div>
    </nav>
  );
}

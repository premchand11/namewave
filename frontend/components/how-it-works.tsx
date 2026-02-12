import { Card } from "@/components/ui/card";
import { Mic, SlidersHorizontal, Download } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Mic className="h-6 w-6" />,
      title: "Enter Your Name",
      description:
        "Type your name exactly how you'd like it to be pronounced.",
    },
    {
      icon: <SlidersHorizontal className="h-6 w-6" />,
      title: "Choose Voice & Style",
      description:
        "Select from multiple voices and adjust pitch and speed.",
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Preview & Download",
      description:
        "Listen instantly and download your personalized pronunciation.",
    },
  ];

  return (
    <section className=" py-12 sm:py-18">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          How It Works
        </h2>

        <p className="mt-4 text-muted-foreground">
          Simple. Fast. Natural.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-6 text-left hover:shadow-lg transition"
            >
              <div className="mb-4 text-primary">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

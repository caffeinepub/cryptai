import { Brain, Cpu, LineChart, Zap } from "lucide-react";

const AI_SECTIONS = [
  {
    icon: Brain,
    title: "AI Research",
    desc: "Latest papers and breakthroughs from top AI labs.",
    color: "text-blue-400",
  },
  {
    icon: Cpu,
    title: "ML Tools",
    desc: "Curated tools, frameworks, and platforms for ML engineers.",
    color: "text-violet-400",
  },
  {
    icon: LineChart,
    title: "AI Market Impact",
    desc: "How AI is reshaping industries and investment landscapes.",
    color: "text-green-400",
  },
  {
    icon: Zap,
    title: "AI Signals",
    desc: "AI-generated trading and market signals. Coming soon.",
    color: "text-yellow-400",
  },
];

export function AIPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="mb-12 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5">
          <Brain size={32} />
        </div>
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">
          Artificial Intelligence
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore the frontier of artificial intelligence — from research
          breakthroughs to practical tools and market implications.
        </p>
      </div>

      {/* Sub-sections grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {AI_SECTIONS.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors cursor-pointer group"
          >
            <div className={`mb-4 ${section.color}`}>
              <section.icon size={28} />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
              {section.title}
            </h3>
            <p className="text-muted-foreground text-sm">{section.desc}</p>
          </div>
        ))}
      </div>

      {/* Coming soon banner */}
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
          Coming Soon
        </p>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          AI Tools & Analysis
        </h2>
        <p className="text-muted-foreground">
          Advanced AI analytics, model comparisons, and intelligence reports are
          in development. Subscribe to our newsletter to be notified when they
          launch.
        </p>
      </div>
    </main>
  );
}

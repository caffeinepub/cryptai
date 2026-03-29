interface PlaceholderPageProps {
  name: string;
}

export function PlaceholderPage({ name }: PlaceholderPageProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-6 text-3xl">
        📄
      </div>
      <h1 className="text-3xl font-display font-bold text-foreground mb-4">
        {name}
      </h1>
      <p className="text-muted-foreground text-lg max-w-md mx-auto">
        This page is under construction. Check back soon for updates.
      </p>
    </main>
  );
}

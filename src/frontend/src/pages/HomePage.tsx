import { ArticlesSection } from "../components/ArticlesSection";
import { MainTiles } from "../components/MainTiles";
import { MarketTicker } from "../components/MarketTicker";
import { Newsletter } from "../components/Newsletter";
import { PlanCards } from "../components/PlanCards";

interface HomePageProps {
  navigate: (path: string) => void;
}

export function HomePage({ navigate }: HomePageProps) {
  return (
    <main>
      <MarketTicker />
      <MainTiles navigate={navigate} />
      <PlanCards />
      <ArticlesSection />
      <Newsletter />
    </main>
  );
}

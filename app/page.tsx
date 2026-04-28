import HeroCarousel     from "@/components/home/HeroCarousel";
import CategoryCards    from "@/components/home/CategoryCards";
import AboutSection     from "@/components/home/AboutSection";
import TopDestinations  from "@/components/home/TopDestinations";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <CategoryCards />
      <AboutSection />
      <TopDestinations />
    </>
  );
}
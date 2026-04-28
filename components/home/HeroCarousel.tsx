"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1600&q=80",
    title: "Paradise on Earth",
    subtitle: "Kashmir",
    description: "Where mountains touch the sky and valleys bloom with eternal beauty",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
    title: "Explore Nature",
    subtitle: "Culture & Adventure",
    description: "Discover the untouched beauty of Dal Lake, Gulmarg and beyond",
  },
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    title: "Experience the Magic",
    subtitle: "Of the Himalayas",
    description: "Snow-capped peaks, lush meadows and warm Kashmiri hospitality await",
  },
  {
    image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1600&q=80",
    title: "Journey Through",
    subtitle: "Heaven on Earth",
    description: "From the gardens of Srinagar to the slopes of Pahalgam",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent]   = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[8000ms]"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: index === current ? "scale(1)" : "scale(1.05)",
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div
          key={current}
          className="animate-slide-up max-w-4xl mx-auto"
        >
          <p className="text-kashmir-gold font-display text-lg md:text-xl mb-2 tracking-widest uppercase">
            {slides[current].subtitle}
          </p>
          <h1 className="text-shadow font-display text-5xl md:text-7xl lg:text-8xl
                         font-bold text-white mb-6 leading-tight">
            {slides[current].title}
          </h1>
          <p className="text-shadow text-white/90 text-lg md:text-xl max-w-2xl
                        mx-auto mb-10 leading-relaxed">
            {slides[current].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/destinations" className="btn-primary text-base px-8 py-4">
              Explore Destinations
            </a>
            <a href="/accommodations" className="inline-block px-8 py-4 rounded-full
                                                  border-2 border-white text-white font-medium
                                                  hover:bg-white hover:text-kashmir-dark
                                                  transition-all duration-300 text-base">
              Find Stays
            </a>
          </div>
        </div>
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm
                   rounded-full flex items-center justify-center
                   transition-all duration-200 text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm
                   rounded-full flex items-center justify-center
                   transition-all duration-200 text-white"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
                      flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex
                      flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 w-full bg-white/80 animate-bounce"
               style={{ height: "40%" }} />
        </div>
      </div>
    </section>
  );
}
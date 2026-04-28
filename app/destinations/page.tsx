"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Search } from "lucide-react";

const destinations = [
  {
    name: "Gulmarg",
    tagline: "Meadow of Flowers",
    description: "World-class skiing destination with Asia's highest gondola and breathtaking Himalayan views. Perfect for winter sports and summer trekking.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Mountain",
    badge: "Most Popular",
  },
  {
    name: "Dal Lake",
    tagline: "Jewel of Kashmir",
    description: "Iconic lake famous for its stunning houseboats, shikaras and vibrant floating markets. A unique experience unlike anywhere else.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
    category: "Lake",
    badge: "Must Visit",
  },
  {
    name: "Pahalgam",
    tagline: "Valley of Shepherds",
    description: "Scenic valley surrounded by pine forests, river Lidder and the famous Betaab Valley. Starting point for the Amarnath Yatra.",
    image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80",
    category: "Valley",
    badge: "Trending",
  },
  {
    name: "Sonmarg",
    tagline: "Meadow of Gold",
    description: "Gateway to glaciers and high-altitude lakes, with spectacular views of the Himalayas and the Thajiwas Glacier.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Mountain",
    badge: null,
  },
  {
    name: "Srinagar",
    tagline: "City of Lakes",
    description: "The summer capital of J&K — home to Mughal gardens, ancient shrines, Dal Lake and the iconic Boulevard Road.",
    image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80",
    category: "City",
    badge: "Top Rated",
  },
  {
    name: "Yusmarg",
    tagline: "Meadow of Jesus",
    description: "A hidden gem nestled in the Pir Panjal range, offering pristine meadows, dense forests and peaceful solitude.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    category: "Valley",
    badge: "Hidden Gem",
  },
  {
    name: "Doodhpathri",
    tagline: "Valley of Milk",
    description: "An untouched paradise with milky white streams, lush green meadows and stunning mountain backdrop.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    category: "Valley",
    badge: null,
  },
  {
    name: "Nagin Lake",
    tagline: "Ring of Nagin",
    description: "A quieter and cleaner alternative to Dal Lake, surrounded by mountains and perfect for water sports.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    category: "Lake",
    badge: null,
  },
];

const categories = ["All", "Mountain", "Lake", "Valley", "City"];

export default function DestinationsPage() {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All");

  const filtered = destinations.filter((d) => {
    const matchSearch   = d.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || d.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-kashmir-snow">

      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center
                        justify-center text-center px-4 pt-16">
          <p className="text-kashmir-gold uppercase tracking-widest text-sm mb-3">
            Explore Kashmir
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            All Destinations
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Discover every corner of paradise
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2
                               w-4 h-4 text-kashmir-muted" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200
                         bg-white text-kashmir-dark placeholder:text-gray-400
                         focus:outline-none focus:ring-2 focus:ring-kashmir-green/30
                         focus:border-kashmir-green transition-all duration-200"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? "bg-kashmir-green text-white shadow-md"
                    : "bg-white text-kashmir-dark hover:bg-kashmir-green/10 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-md
                         hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110
                             transition-transform duration-700"
                />
                {dest.badge && (
                  <div className="absolute top-4 left-4 bg-kashmir-saffron text-white
                                  text-xs font-medium px-3 py-1 rounded-full">
                    {dest.badge}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm
                                text-kashmir-green text-xs font-medium px-3 py-1 rounded-full">
                  {dest.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-1 text-kashmir-muted text-xs mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>Jammu & Kashmir, India</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-kashmir-dark mb-1">
                  {dest.name}
                </h3>
                <p className="text-kashmir-gold font-display italic text-sm mb-3">
                  {dest.tagline}
                </p>
                <p className="text-kashmir-muted text-sm leading-relaxed mb-5">
                  {dest.description}
                </p>
                <button className="flex items-center gap-2 text-kashmir-green font-medium
                                   text-sm group/btn hover:gap-3 transition-all duration-200">
                  <span>Explore More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-kashmir-muted text-lg">
              No destinations found. Try a different search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Search } from "lucide-react";

const accommodations = [
  {
    name: "The Lalit Grand Palace",
    type: "hotel",
    location: "Srinagar",
    price: 12000,
    rating: 4.9,
    description: "A majestic 19th-century palace hotel with stunning Dal Lake views, royal interiors and world-class amenities.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    badge: "Luxury",
  },
  {
    name: "Sukoon Houseboat",
    type: "houseboat",
    location: "Dal Lake, Srinagar",
    price: 8500,
    rating: 4.8,
    description: "A premium Cedar wood houseboat on Dal Lake offering authentic Kashmiri hospitality and breathtaking views.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
    badge: "Most Loved",
  },
  {
    name: "Khyber Himalayan Resort",
    type: "resort",
    location: "Gulmarg",
    price: 18000,
    rating: 4.9,
    description: "An iconic ski resort surrounded by pine forests and the majestic Apharwat peak in Gulmarg.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    badge: "Top Rated",
  },
  {
    name: "Pine Spring Guest House",
    type: "guesthouse",
    location: "Pahalgam",
    price: 3500,
    rating: 4.5,
    description: "A cozy guesthouse nestled among pine trees by the Lidder river, perfect for budget travellers.",
    image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80",
    badge: "Best Value",
  },
  {
    name: "Welcomheritage Gurkha Houseboats",
    type: "houseboat",
    location: "Dal Lake, Srinagar",
    price: 6500,
    rating: 4.6,
    description: "Heritage houseboats with ornate woodwork, offering an authentic and luxurious Kashmir experience.",
    image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80",
    badge: null,
  },
  {
    name: "Snow Land Hotel",
    type: "hotel",
    location: "Sonmarg",
    price: 4500,
    rating: 4.3,
    description: "Comfortable hotel near the Thajiwas Glacier, ideal for exploring Sonmarg's natural beauty.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    badge: null,
  },
];

const types = ["All", "hotel", "houseboat", "resort", "guesthouse"];

export default function AccommodationsPage() {
  const [search, setSearch] = useState("");
  const [type,   setType]   = useState("All");

  const filtered = accommodations.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
                        a.location.toLowerCase().includes(search.toLowerCase());
    const matchType   = type === "All" || a.type === type;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen bg-kashmir-snow">

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center
                        justify-center text-center px-4">
          <p className="text-kashmir-gold uppercase tracking-widest text-sm mb-3">
            Stay in Paradise
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Accommodations
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            From luxury resorts to authentic houseboats
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2
                               w-4 h-4 text-kashmir-muted" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200
                         bg-white text-kashmir-dark placeholder:text-gray-400
                         focus:outline-none focus:ring-2 focus:ring-kashmir-green/30
                         focus:border-kashmir-green transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize
                            transition-all duration-200 ${
                  type === t
                    ? "bg-kashmir-green text-white shadow-md"
                    : "bg-white text-kashmir-dark hover:bg-kashmir-green/10 border border-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((acc, index) => (
            <motion.div
              key={acc.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-md
                         hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={acc.image}
                  alt={acc.name}
                  className="w-full h-full object-cover group-hover:scale-110
                             transition-transform duration-700"
                />
                {acc.badge && (
                  <div className="absolute top-4 left-4 bg-kashmir-saffron text-white
                                  text-xs font-medium px-3 py-1 rounded-full">
                    {acc.badge}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm
                                text-kashmir-green text-xs font-medium px-3 py-1
                                rounded-full capitalize">
                  {acc.type}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-kashmir-muted text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>{acc.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-kashmir-gold fill-kashmir-gold" />
                    <span className="text-xs font-medium text-kashmir-dark">
                      {acc.rating}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-kashmir-dark mb-3">
                  {acc.name}
                </h3>
                <p className="text-kashmir-muted text-sm leading-relaxed mb-5">
                  {acc.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-kashmir-green font-bold text-xl">
                      ₹{acc.price.toLocaleString()}
                    </span>
                    <span className="text-kashmir-muted text-xs ml-1">/night</span>
                  </div>
                  <button className="btn-primary text-sm py-2 px-5">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import {
  Mountain, Waves, Zap, Landmark, UtensilsCrossed
} from "lucide-react";

const categories = [
  {
    icon: Mountain,
    title: "Mountains",
    description: "Majestic Himalayan peaks and snow-covered summits",
    color: "from-slate-700 to-slate-900",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  },
  {
    icon: Waves,
    title: "Lakes & Gardens",
    description: "Serene Dal Lake, Nagin Lake and Mughal gardens",
    color: "from-blue-700 to-blue-900",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80",
  },
  {
    icon: Zap,
    title: "Adventures",
    description: "Skiing, trekking, rafting and paragliding",
    color: "from-orange-600 to-red-800",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
  },
  {
    icon: Landmark,
    title: "Cultural & Heritage",
    description: "Mughal architecture, shrines and ancient traditions",
    color: "from-amber-700 to-yellow-900",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80",
  },
  {
    icon: UtensilsCrossed,
    title: "Cuisines",
    description: "Wazwan, Rogan Josh, Kahwa and authentic Kashmiri flavors",
    color: "from-kashmir-green to-kashmir-dark",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
  },
];

export default function CategoryCards() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-kashmir-green font-medium uppercase tracking-widest text-sm mb-3">
            Explore Kashmir
          </p>
          <h2 className="section-title">Discover by Category</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            From towering peaks to tranquil lakes — Kashmir has something magical for every traveller
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group cursor-pointer rounded-3xl overflow-hidden
                           shadow-md hover:shadow-2xl transition-shadow duration-300"
                style={{ minHeight: "280px" }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform
                              duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                {/* Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color}
                                 opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6"
                     style={{ minHeight: "280px" }}>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl
                                  flex items-center justify-center mb-4
                                  group-hover:bg-white/30 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
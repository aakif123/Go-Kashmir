"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const destinations = [
  {
    name: "Gulmarg",
    tagline: "Meadow of Flowers",
    description: "World-class skiing destination with Asia's highest gondola and breathtaking Himalayan views.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Mountain",
    badge: "Most Popular",
  },
  {
    name: "Dal Lake",
    tagline: "Jewel of Kashmir",
    description: "Iconic lake famous for its stunning houseboats, shikaras and vibrant floating markets.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
    category: "Lake",
    badge: "Must Visit",
  },
  {
    name: "Pahalgam",
    tagline: "Valley of Shepherds",
    description: "Scenic valley surrounded by pine forests, river Lidder and the famous Betaab Valley.",
    image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80",
    category: "Valley",
    badge: "Trending",
  },
  {
    name: "Sonmarg",
    tagline: "Meadow of Gold",
    description: "Gateway to glaciers and high-altitude lakes, with spectacular views of the Himalayas.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Mountain",
    badge: null,
  },
  {
    name: "Srinagar",
    tagline: "City of Lakes",
    description: "The summer capital of J&K — home to Mughal gardens, ancient shrines and Dal Lake.",
    image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80",
    category: "City",
    badge: "Top Rated",
  },
];

export default function TopDestinations() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-kashmir-green font-medium uppercase tracking-widest text-sm mb-3">
            Where to Go
          </p>
          <h2 className="section-title">Top Destinations</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Handpicked places that showcase the very best of Kashmir's natural and cultural beauty
          </p>
        </div>

        {/* Featured (first 2 large) + rest grid */}
        <div className="space-y-6">

          {/* Top 2 large cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations.slice(0, 2).map((dest, index) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{ height: "420px" }}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover
                             group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80
                                via-black/20 to-transparent" />

                {dest.badge && (
                  <div className="absolute top-5 left-5 bg-kashmir-saffron text-white
                                  text-xs font-medium px-3 py-1 rounded-full">
                    {dest.badge}
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 text-kashmir-gold text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{dest.category}</span>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-1">
                    {dest.name}
                  </h3>
                  <p className="text-kashmir-gold font-display italic mb-3">
                    {dest.tagline}
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed mb-5 max-w-sm">
                    {dest.description}
                  </p>
                  <button className="flex items-center gap-2 text-white font-medium
                                     group/btn hover:text-kashmir-gold transition-colors duration-200">
                    <span>Explore More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1
                                          transition-transform duration-200" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom 3 smaller cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations.slice(2).map((dest, index) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{ height: "300px" }}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover
                             group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80
                                via-black/20 to-transparent" />

                {dest.badge && (
                  <div className="absolute top-4 left-4 bg-kashmir-saffron text-white
                                  text-xs font-medium px-3 py-1 rounded-full">
                    {dest.badge}
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-kashmir-gold text-xs mb-1">
                    <MapPin className="w-3 h-3" />
                    <span>{dest.category}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    {dest.name}
                  </h3>
                  <p className="text-kashmir-gold font-display italic text-sm mb-3">
                    {dest.tagline}
                  </p>
                  <button className="flex items-center gap-2 text-white text-sm font-medium
                                     group/btn hover:text-kashmir-gold transition-colors duration-200">
                    <span>Explore More</span>
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1
                                          transition-transform duration-200" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a href="/destinations" className="btn-outline">
            View All Destinations
          </a>
        </div>
      </div>
    </section>
  );
}
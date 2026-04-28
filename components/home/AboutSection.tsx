"use client";

import { motion } from "framer-motion";
import { Leaf, Star, Shield } from "lucide-react";

const highlights = [
  {
    icon: Star,
    title: "UNESCO Heritage Sites",
    description: "Home to stunning Mughal gardens and ancient shrines",
  },
  {
    icon: Leaf,
    title: "Pristine Nature",
    description: "Untouched valleys, alpine meadows and crystal rivers",
  },
  {
    icon: Shield,
    title: "Rich Traditions",
    description: "Centuries-old craftsmanship, music and warm hospitality",
  },
];

export default function AboutSection() {
  return (
    <section className="section-padding bg-kashmir-snow relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-kashmir-green/5
                      rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-kashmir-teal/5
                      rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden h-48 md:h-64">
                <img
                  src="https://images.unsplash.com/photo-1566837945700-30057527ade0?w=600&q=80"
                  alt="Kashmir valley"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-3xl overflow-hidden h-36 md:h-44">
                <img
                  src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80"
                  alt="Dal Lake"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="rounded-3xl overflow-hidden h-36 md:h-44">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                  alt="Gulmarg"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-3xl overflow-hidden h-48 md:h-64">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
                  alt="Mountains"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-kashmir-green font-medium uppercase tracking-widest text-sm mb-3">
              About Kashmir
            </p>
            <h2 className="section-title">
              The Crown Jewel of India
            </h2>
            <p className="text-kashmir-muted leading-relaxed mb-6">
              Nestled in the lap of the mighty Himalayas, Kashmir is a land of
              extraordinary beauty that has captivated travellers, poets and conquerors
              for centuries. Often called the "Paradise on Earth", this breathtaking
              valley offers a unique blend of natural splendour and rich cultural heritage.
            </p>
            <p className="text-kashmir-muted leading-relaxed mb-10">
              From the iconic houseboats of Dal Lake to the snow-clad slopes of Gulmarg,
              from the saffron fields of Pampore to the spiritual shrines of Srinagar —
              Kashmir is a destination that leaves every visitor spellbound.
            </p>

            {/* Highlights */}
            <div className="space-y-6">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-11 h-11 bg-kashmir-green/10 rounded-2xl
                                    flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-kashmir-green" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-kashmir-dark mb-1">
                        {item.title}
                      </h4>
                      <p className="text-kashmir-muted text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <a href="/destinations" className="btn-primary mt-10 inline-block">
              Discover More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
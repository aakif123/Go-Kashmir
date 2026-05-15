"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChefHat } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";
import { Destination } from "@/types";

export default function TasteOfKashmir() {
  const [dishes, setDishes] = useState<Destination[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("destinations")
        .select("*")
        .eq("category", "cuisine")
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(3);
      setDishes(data ?? []);
    };
    load();
  }, []);

  if (dishes.length === 0) return null;

  return (
    <section className="section-padding bg-kashmir-dark">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-kashmir-gold font-medium uppercase tracking-widest text-sm mb-3">
              Flavours of the Valley
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Taste of Kashmir
            </h2>
            <p className="text-white/60 mt-2 max-w-lg">
              From slow-cooked Wazwan feasts to saffron-kissed kehwa — Kashmir's
              cuisine is as rich as its landscapes.
            </p>
          </div>
          <Link
            href="/destinations?category=cuisine"
            className="flex items-center gap-2 text-kashmir-gold font-medium text-sm
                       hover:gap-3 transition-all duration-200 shrink-0"
          >
            <span>See All Cuisine</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-3xl overflow-hidden"
              style={{ height: "340px" }}
            >
              <img
                src={dish.image_url ?? ""}
                alt={dish.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover
                           group-hover:scale-110 transition-transform duration-700"
              />
              {/* Dark overlay — stronger at bottom for text, lighter at top */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90
                              via-black/30 to-black/10" />

              {/* Cuisine badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5
                              bg-kashmir-gold/20 backdrop-blur-sm border border-kashmir-gold/40
                              text-kashmir-gold text-xs font-medium px-3 py-1 rounded-full">
                <ChefHat className="w-3 h-3" />
                <span>Signature Dish</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                {dish.location && (
                  <p className="text-kashmir-gold text-xs uppercase tracking-wider mb-1">
                    Best found in {dish.location}
                  </p>
                )}
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {dish.name}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
                  {dish.description}
                </p>
                <Link
                  href={`/destinations/${dish.id}`}
                  className="flex items-center gap-2 text-kashmir-gold text-sm font-medium
                             group/btn hover:gap-3 transition-all duration-200"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1
                                        transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

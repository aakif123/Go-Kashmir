"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";
import { Destination } from "@/types";

export default function TopDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("destinations")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(5);
      setDestinations(data ?? []);
    };
    load();
  }, []);

  if (destinations.length === 0) return null;

  const large = destinations.slice(0, 2);
  const small = destinations.slice(2);

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

        <div className="space-y-6">

          {/* Top 2 large cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {large.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{ height: "420px" }}
              >
                <img
                  src={dest.image_url ?? ""}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover
                             group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80
                                via-black/20 to-transparent" />

                <div className="absolute top-5 left-5 bg-kashmir-saffron text-white
                                text-xs font-medium px-3 py-1 rounded-full">
                  Featured
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 text-kashmir-gold text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="capitalize">{dest.category}</span>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-1">
                    {dest.name}
                  </h3>
                  {dest.location && (
                    <p className="text-kashmir-gold font-display italic mb-3">
                      {dest.location}
                    </p>
                  )}
                  <p className="text-white/80 text-sm leading-relaxed mb-5 max-w-sm">
                    {dest.description}
                  </p>
                  <Link
                    href={`/destinations/${dest.id}`}
                    className="flex items-center gap-2 text-white font-medium
                               group/btn hover:text-kashmir-gold transition-colors duration-200"
                  >
                    <span>Explore More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1
                                          transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom smaller cards */}
          {small.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {small.map((dest, index) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer"
                  style={{ height: "300px" }}
                >
                  <img
                    src={dest.image_url ?? ""}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover
                               group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80
                                  via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-kashmir-gold text-xs mb-1">
                      <MapPin className="w-3 h-3" />
                      <span className="capitalize">{dest.category}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-1">
                      {dest.name}
                    </h3>
                    {dest.location && (
                      <p className="text-kashmir-gold font-display italic text-sm mb-3">
                        {dest.location}
                      </p>
                    )}
                    <Link
                      href={`/destinations/${dest.id}`}
                      className="flex items-center gap-2 text-white text-sm font-medium
                                 group/btn hover:text-kashmir-gold transition-colors duration-200"
                    >
                      <span>Explore More</span>
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1
                                            transition-transform duration-200" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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

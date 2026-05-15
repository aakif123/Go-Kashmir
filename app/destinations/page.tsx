"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { Destination } from "@/types";

const CATEGORIES = ["All", "Mountain", "Lake", "Adventure", "Cultural", "Cuisine"];

export default function DestinationsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-kashmir-snow">
        <div className="w-10 h-10 border-4 border-kashmir-green/30
                        border-t-kashmir-green rounded-full animate-spin" />
      </div>
    }>
      <DestinationsContent />
    </Suspense>
  );
}

function DestinationsContent() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [category,     setCategory]     = useState("All");
  const searchParams = useSearchParams();
  const supabase     = createClient();

  useEffect(() => {
    const param = searchParams.get("category");
    if (param) {
      const matched = CATEGORIES.find((c) => c.toLowerCase() === param.toLowerCase());
      if (matched) setCategory(matched);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("destinations")
        .select("*")
        .order("created_at", { ascending: false });
      setDestinations(data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered = destinations.filter((d) => {
    const matchSearch   = d.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || d.category === category.toLowerCase();
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
                        justify-center text-center px-4">
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
            {CATEGORIES.map((cat) => (
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-kashmir-green/30
                            border-t-kashmir-green rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((dest, index) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-md
                             hover:shadow-2xl transition-all duration-300 hover:-translate-y-2
                             flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 shrink-0 overflow-hidden">
                    <img
                      src={dest.image_url ?? ""}
                      alt={dest.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110
                                 transition-transform duration-700"
                    />
                    {dest.is_featured && (
                      <div className="absolute top-4 left-4 bg-kashmir-saffron text-white
                                      text-xs font-medium px-3 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm
                                    text-kashmir-green text-xs font-medium px-3 py-1 rounded-full capitalize">
                      {dest.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-1 text-kashmir-muted text-xs mb-2">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{dest.location ?? "Jammu & Kashmir, India"}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-kashmir-dark mb-3">
                      {dest.name}
                    </h3>
                    <p className="text-kashmir-muted text-sm leading-relaxed mb-5
                                  line-clamp-3 flex-1">
                      {dest.description}
                    </p>
                    <Link
                      href={`/destinations/${dest.id}`}
                      className="flex items-center gap-2 text-kashmir-green font-medium
                                 text-sm hover:gap-3 transition-all duration-200 mt-auto w-fit"
                    >
                      <span>Explore More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
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
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Tag } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import { Destination } from "@/types";

export default function DestinationDetailPage() {
  const { id }                          = useParams<{ id: string }>();
  const router                          = useRouter();
  const [destination, setDestination]   = useState<Destination | null>(null);
  const [loading,     setLoading]       = useState(true);
  const [notFound,    setNotFound]      = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("destinations")
        .select("*")
        .eq("id", id)
        .single();

      if (!data) {
        setNotFound(true);
      } else {
        setDestination(data);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kashmir-snow">
        <div className="w-12 h-12 border-4 border-kashmir-green/30
                        border-t-kashmir-green rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center
                      bg-kashmir-snow gap-4 px-4">
        <p className="text-kashmir-dark text-xl font-medium">Destination not found.</p>
        <button onClick={() => router.push("/destinations")} className="btn-primary">
          Back to Destinations
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kashmir-snow">

      {/* Hero Image */}
      <div className="relative h-72 md:h-[500px] overflow-hidden">
        <img
          src={destination.image_url ?? ""}
          alt={destination.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70
                        via-black/20 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-4 md:left-8 flex items-center gap-2
                     bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full
                     hover:bg-white/30 transition-all duration-200 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {destination.is_featured && (
          <div className="absolute top-6 right-4 md:right-8 bg-kashmir-saffron text-white
                          text-xs font-medium px-3 py-1 rounded-full">
            Featured
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-2">
              {destination.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              {destination.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {destination.location}
                </span>
              )}
              <span className="flex items-center gap-1.5 capitalize">
                <Tag className="w-4 h-4" />
                {destination.category}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Details */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-sm"
        >
          <h2 className="font-display text-2xl font-bold text-kashmir-dark mb-4">
            About {destination.name}
          </h2>
          <p className="text-kashmir-muted leading-relaxed text-base md:text-lg">
            {destination.description}
          </p>

          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-kashmir-muted uppercase tracking-wider">Category</span>
              <span className="capitalize font-medium text-kashmir-dark">{destination.category}</span>
            </div>
            {destination.location && (
              <div className="flex flex-col gap-1">
                <span className="text-xs text-kashmir-muted uppercase tracking-wider">Location</span>
                <span className="font-medium text-kashmir-dark">{destination.location}</span>
              </div>
            )}
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/destinations")}
            className="btn-outline"
          >
            View All Destinations
          </button>
        </div>
      </div>
    </div>
  );
}

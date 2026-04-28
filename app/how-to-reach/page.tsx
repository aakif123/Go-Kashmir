"use client";

import { motion } from "framer-motion";
import { Plane, Train, Bus, Car, Clock, MapPin, AlertCircle } from "lucide-react";

const routes = [
  {
    icon: Plane,
    title: "By Air",
    color: "bg-blue-50 text-blue-600",
    iconBg: "bg-blue-100",
    details: [
      {
        heading: "Sheikh ul-Alam International Airport (SXR)",
        points: [
          "Located 14 km from Srinagar city center",
          "Direct flights from Delhi, Mumbai, Bangalore, Chennai",
          "Airlines: IndiGo, Air India, SpiceJet, Vistara",
          "Flight duration from Delhi: ~1.5 hours",
        ],
      },
    ],
  },
  {
    icon: Train,
    title: "By Train",
    color: "bg-green-50 text-green-700",
    iconBg: "bg-green-100",
    details: [
      {
        heading: "Banihal Railway Station",
        points: [
          "Nearest major railway station to Srinagar",
          "Connected via the Banihal-Baramulla rail line",
          "Train from Jammu to Banihal, then road to Srinagar",
          "Jammu Tawi is the main railhead (~3 hrs from Srinagar)",
        ],
      },
    ],
  },
  {
    icon: Bus,
    title: "By Bus",
    color: "bg-amber-50 text-amber-700",
    iconBg: "bg-amber-100",
    details: [
      {
        heading: "J&K State Road Transport",
        points: [
          "JKSRTC buses from Jammu to Srinagar daily",
          "Distance: ~300 km via NH-44 (Jammu-Srinagar Highway)",
          "Duration: 8-10 hours depending on road conditions",
          "Private luxury buses also available",
        ],
      },
    ],
  },
  {
    icon: Car,
    title: "By Road",
    color: "bg-kashmir-green/10 text-kashmir-green",
    iconBg: "bg-kashmir-green/20",
    details: [
      {
        heading: "Self Drive / Taxi",
        points: [
          "Jammu to Srinagar via NH-44 (~300 km)",
          "Manali to Leh to Srinagar (scenic but seasonal)",
          "Best time to drive: May to October",
          "Taxis available from Jammu, Delhi and Chandigarh",
        ],
      },
    ],
  },
];

const tips = [
  {
    icon: Clock,
    title: "Best Time to Visit",
    description: "March to October for pleasant weather. December to February for snow and skiing in Gulmarg.",
  },
  {
    icon: MapPin,
    title: "Local Transport",
    description: "Auto-rickshaws, Shikaras on Dal Lake, and local taxis are the best ways to get around Srinagar.",
  },
  {
    icon: AlertCircle,
    title: "Important Note",
    description: "Always check road and weather conditions before travelling. NH-44 may close during heavy snowfall.",
  },
];

export default function HowToReachPage() {
  return (
    <div className="min-h-screen bg-kashmir-snow">

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center
                        justify-center text-center px-4 pt-16">
          <p className="text-kashmir-gold uppercase tracking-widest text-sm mb-3">
            Plan Your Trip
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            How to Reach Kashmir
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Everything you need to know to get here
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto section-padding">

        {/* Route Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {routes.map((route, index) => {
            const Icon = route.icon;
            return (
              <motion.div
                key={route.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl
                           transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 ${route.iconBg} rounded-2xl
                                   flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${route.color.split(" ")[1]}`} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-kashmir-dark">
                    {route.title}
                  </h3>
                </div>

                {route.details.map((detail) => (
                  <div key={detail.heading}>
                    <p className="font-medium text-kashmir-dark mb-4">
                      {detail.heading}
                    </p>
                    <ul className="space-y-3">
                      {detail.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-kashmir-muted text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-kashmir-green
                                          mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="text-center mb-12">
          <h2 className="section-title">Travel Tips</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-kashmir-green/5 border border-kashmir-green/20
                           rounded-3xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-kashmir-green/10 rounded-2xl
                                flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-kashmir-green" />
                </div>
                <h4 className="font-display font-semibold text-kashmir-dark mb-2">
                  {tip.title}
                </h4>
                <p className="text-kashmir-muted text-sm leading-relaxed">
                  {tip.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
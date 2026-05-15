"use client";

import { useEffect, useState } from "react";
import { MapPin, Hotel, MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    destinations:   0,
    accommodations: 0,
    messages:       0,
    users:          0,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchStats = async () => {
      const [dest, acc, msg, users] = await Promise.all([
        supabase.from("destinations").select("*",     { count: "exact", head: true }),
        supabase.from("accommodations").select("*",   { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*",         { count: "exact", head: true }),
      ]);

      setStats({
        destinations:   dest.count  ?? 0,
        accommodations: acc.count   ?? 0,
        messages:       msg.count   ?? 0,
        users:          users.count ?? 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Destinations",
      value: stats.destinations,
      icon:  MapPin,
      color: "bg-blue-50 text-blue-600",
      href:  "/admin/destinations",
    },
    {
      label: "Accommodations",
      value: stats.accommodations,
      icon:  Hotel,
      color: "bg-kashmir-green/10 text-kashmir-green",
      href:  "/admin/accommodations",
    },
    {
      label: "Messages",
      value: stats.messages,
      icon:  MessageSquare,
      color: "bg-amber-50 text-amber-600",
      href:  "/admin/messages",
    },
    {
      label: "Registered Users",
      value: stats.users,
      icon:  Users,
      color: "bg-purple-50 text-purple-600",
      href:  "/admin/destinations",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-kashmir-dark">
          Dashboard
        </h1>
        <p className="text-kashmir-muted mt-1">
          Welcome to the Go Kashmir admin panel
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-2xl p-6 shadow-sm
                         hover:shadow-md transition-shadow duration-200 block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 ${card.color} rounded-xl
                                 flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-kashmir-dark mb-1">
                {loading ? "..." : card.value}
              </p>
              <p className="text-kashmir-muted text-sm">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-kashmir-dark mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/destinations"
            className="flex items-center gap-4 p-4 rounded-xl border-2
                       border-dashed border-kashmir-green/30 hover:border-kashmir-green
                       hover:bg-kashmir-green/5 transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-kashmir-green/10 rounded-xl
                            flex items-center justify-center
                            group-hover:bg-kashmir-green/20 transition-colors">
              <MapPin className="w-5 h-5 text-kashmir-green" />
            </div>
            <div>
              <p className="font-medium text-kashmir-dark">Add Destination</p>
              <p className="text-xs text-kashmir-muted">Add a new place to explore</p>
            </div>
          </Link>

          <Link
            href="/admin/accommodations"
            className="flex items-center gap-4 p-4 rounded-xl border-2
                       border-dashed border-blue-300 hover:border-blue-500
                       hover:bg-blue-50 transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center
                            justify-center group-hover:bg-blue-100 transition-colors">
              <Hotel className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-kashmir-dark">Add Accommodation</p>
              <p className="text-xs text-kashmir-muted">Add a new place to stay</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
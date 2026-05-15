"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Mountain, LayoutDashboard, MapPin,
  Hotel, MessageSquare, LogOut, ExternalLink
} from "lucide-react";
import { createClient } from "@/lib/supabaseClient";

const navItems = [
  { href: "/admin",                icon: LayoutDashboard, label: "Dashboard"      },
  { href: "/admin/destinations",   icon: MapPin,          label: "Destinations"   },
  { href: "/admin/accommodations", icon: Hotel,           label: "Accommodations" },
  { href: "/admin/messages",       icon: MessageSquare,   label: "Messages"       },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-kashmir-dark
                      text-white flex flex-col z-40">

      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-kashmir-green rounded-full
                          flex items-center justify-center">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-display font-semibold text-white">Go Kashmir</p>
            <p className="text-xs text-white/50">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                          font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-kashmir-green text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                     text-white/60 hover:bg-white/10 hover:text-white
                     transition-all duration-200"
        >
          <ExternalLink className="w-4 h-4" />
          View Website
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                     text-red-400 hover:bg-red-500/10 hover:text-red-300
                     transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
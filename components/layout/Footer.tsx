import Link from "next/link";
import { Mountain, Mail, Phone, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-kashmir-dark text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-kashmir-green rounded-full flex items-center justify-center">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-semibold">Go Kashmir</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover the paradise on earth. Explore Kashmir's breathtaking landscapes,
              rich culture, and warm hospitality.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center
                                     justify-center hover:bg-kashmir-green transition-colors duration-300">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center
                                     justify-center hover:bg-kashmir-green transition-colors duration-300">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center
                                     justify-center hover:bg-kashmir-green transition-colors duration-300">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/",               label: "Home"           },
                { href: "/destinations",   label: "Destinations"   },
                { href: "/accommodations", label: "Accommodations" },
                { href: "/how-to-reach",   label: "How to Reach"   },
                { href: "/contact",        label: "Contact Us"     },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-kashmir-light
                               transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Top Destinations</h4>
            <ul className="space-y-3">
              {["Gulmarg", "Pahalgam", "Sonmarg", "Srinagar", "Dal Lake"].map((place) => (
                <li key={place}>
                  <Link
                    href="/destinations"
                    className="text-gray-400 text-sm hover:text-kashmir-light
                               transition-colors duration-200"
                  >
                    {place}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-kashmir-light shrink-0" />
                <span>info@gokashmir.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-kashmir-light shrink-0" />
                <span>+91 194 000 0000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row
                        items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Go Kashmir. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Made with ❤️ for the Paradise on Earth
          </p>
        </div>
      </div>
    </footer>
  );
}
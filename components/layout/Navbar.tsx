"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mountain, User, LogOut, LayoutDashboard } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import AuthModal from "@/components/ui/AuthModal";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/accommodations", label: "Accommodations" },
    { href: "/how-to-reach", label: "How to Reach" },
    { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const pathname = usePathname();
    const supabase = createClient();
    const [authOpen, setAuthOpen] = useState(false);

    // Detect scroll for navbar background
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Get current user
    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", user.id)
                    .single();
                setIsAdmin(profile?.role === "admin");
            }
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user ?? null);

                if (session?.user) {
                    const { data: profile } = await supabase
                        .from("profiles")
                        .select("role")
                        .eq("id", session.user.id)
                        .single();
                    setIsAdmin(profile?.role === "admin");
                } else {
                    setIsAdmin(false);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setDropdownOpen(false);
        setIsOpen(false);
    };

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white shadow-lg"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-kashmir-green rounded-full flex items-center
                            justify-center group-hover:bg-kashmir-teal transition-colors duration-300">
                            <Mountain className="w-5 h-5 text-white" />
                        </div>
                        <span
                            className={`font-display text-xl font-semibold transition-colors duration-300 ${scrolled ? "text-kashmir-dark" : "text-white"
                                }`}
                        >
                            Go Kashmir
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive(link.href)
                                    ? "bg-kashmir-green text-white"
                                    : scrolled
                                        ? "text-kashmir-dark hover:bg-kashmir-green/10 hover:text-kashmir-green"
                                        : "text-white hover:bg-white/20"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm
                              font-medium transition-all duration-200 ${scrolled
                                            ? "bg-kashmir-green/10 text-kashmir-green hover:bg-kashmir-green hover:text-white"
                                            : "bg-white/20 text-white hover:bg-white/30"
                                        }`}
                                >
                                    <User className="w-4 h-4" />
                                    <span>{user.email?.split("@")[0]}</span>
                                </button>

                                {/* Dropdown */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl
                                  border border-gray-100 py-2 animate-slide-down">
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-kashmir-dark
             hover:bg-kashmir-green/10 hover:text-kashmir-green transition-colors"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <User className="w-4 h-4" />
                                            My Profile
                                        </Link>

                                        {isAdmin && (
                                            <Link
                                                href="/admin"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-kashmir-dark
               hover:bg-kashmir-green/10 hover:text-kashmir-green transition-colors"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                Admin Panel
                                            </Link>
                                        )}
                                        <hr className="my-1 border-gray-100" />
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm
                                 text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setAuthOpen(true)}
                                className="px-5 py-2 bg-kashmir-green text-white rounded-full text-sm
               font-medium hover:bg-kashmir-teal transition-all duration-300
               hover:shadow-lg"
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 rounded-full transition-colors duration-200 ${scrolled
                            ? "text-kashmir-dark hover:bg-gray-100"
                            : "text-white hover:bg-white/20"
                            }`}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-white rounded-2xl shadow-xl mb-4 py-4
                          border border-gray-100 animate-slide-down">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-6 py-3 text-sm font-medium transition-colors duration-200 ${isActive(link.href)
                                    ? "text-kashmir-green bg-kashmir-green/10"
                                    : "text-kashmir-dark hover:text-kashmir-green hover:bg-kashmir-green/5"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <hr className="my-2 border-gray-100" />

                        {user ? (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 px-6 py-3 text-sm text-kashmir-dark
                             hover:text-kashmir-green"
                                >
                                    <User className="w-4 h-4" />
                                    My Profile
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-2 px-6 py-3 text-sm
                             text-red-500 hover:bg-red-50"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <div className="px-6 pt-2">
                                <button
                                    onClick={() => { setIsOpen(false); setAuthOpen(true); }}
                                    className="w-full btn-primary text-center text-sm py-2"
                                >
                                    Sign In
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </nav>
    );
}
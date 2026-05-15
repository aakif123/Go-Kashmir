"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mountain, Mail, Lock, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

const schema = z.object({
  email:    z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);
  const router   = useRouter();
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email:    data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Welcome back!");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-center" />

      {/* Left — Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1200&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-kashmir-dark/80
                        via-kashmir-green/40 to-kashmir-dark/60" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full
                            flex items-center justify-center">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-semibold">Go Kashmir</span>
          </Link>

          {/* Quote */}
          <div>
            <blockquote className="font-display text-3xl font-medium leading-relaxed mb-4">
              "If there is paradise on earth, it is here, it is here, it is here."
            </blockquote>
            <cite className="text-white/70 text-sm">— Emperor Jahangir</cite>
          </div>
        </div>
      </div>

      {/* Right — Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center
                      px-6 py-12 bg-white">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-kashmir-green rounded-full flex items-center justify-center">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-semibold text-kashmir-dark">
              Go Kashmir
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-kashmir-dark mb-2">
              Welcome back
            </h1>
            <p className="text-kashmir-muted">
              Sign in to continue your Kashmir journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-kashmir-dark mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2
                                 w-4 h-4 text-kashmir-muted" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-11 pr-4 py-3 rounded-2xl border
                              text-kashmir-dark placeholder:text-gray-400
                              focus:outline-none focus:ring-2 focus:ring-kashmir-green/30
                              focus:border-kashmir-green transition-all duration-200
                              ${errors.email
                                ? "border-red-400 bg-red-50"
                                : "border-gray-200 bg-gray-50"
                              }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-kashmir-dark">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-kashmir-green hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2
                                 w-4 h-4 text-kashmir-muted" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-3 rounded-2xl border
                              text-kashmir-dark placeholder:text-gray-400
                              focus:outline-none focus:ring-2 focus:ring-kashmir-green/30
                              focus:border-kashmir-green transition-all duration-200
                              ${errors.password
                                ? "border-red-400 bg-red-50"
                                : "border-gray-200 bg-gray-50"
                              }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2
                             text-kashmir-muted hover:text-kashmir-dark"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye    className="w-4 h-4" />
                  }
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-kashmir-green text-white py-3 rounded-2xl
                         font-medium flex items-center justify-center gap-2
                         hover:bg-kashmir-teal transition-all duration-300
                         hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white
                                rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-kashmir-muted text-sm mt-8">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-kashmir-green font-medium hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
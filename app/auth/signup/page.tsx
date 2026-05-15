"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mountain, Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

const schema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email:     z.string().email({ message: "Please enter a valid email" }),
  password:  z.string().min(6, "Password must be at least 6 characters"),
  confirm:   z.string(),
}).refine((d) => d.password === d.confirm, {
  message: "Passwords do not match",
  path:    ["confirm"],
});

type FormData = z.infer<typeof schema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [success,      setSuccess]      = useState(false);
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email:    data.email,
      password: data.password,
      options: {
        data: { full_name: data.full_name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
  };

  // Success State
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kashmir-snow px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-kashmir-green/10 rounded-full flex items-center
                          justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-kashmir-green" />
          </div>
          <h2 className="font-display text-3xl font-bold text-kashmir-dark mb-3">
            Check your email!
          </h2>
          <p className="text-kashmir-muted mb-8">
            We've sent a verification link to your email address.
            Please verify your email to start exploring Kashmir.
          </p>
          <Link href="/auth/login" className="btn-primary">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-center" />

      {/* Left — Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-kashmir-dark/80
                        via-kashmir-teal/40 to-kashmir-dark/60" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full
                            flex items-center justify-center">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-semibold">Go Kashmir</span>
          </Link>

          <div>
            <h2 className="font-display text-3xl font-bold mb-4">
              Begin your journey to Paradise
            </h2>
            <p className="text-white/70 leading-relaxed">
              Join thousands of travellers who have discovered the magic of Kashmir.
              Create your account and start planning your dream trip today.
            </p>
          </div>
        </div>
      </div>

      {/* Right — Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center
                      px-6 py-12 bg-white overflow-y-auto">
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

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-kashmir-dark mb-2">
              Create account
            </h1>
            <p className="text-kashmir-muted">
              Your Kashmir adventure starts here
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-kashmir-dark mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2
                                 w-4 h-4 text-kashmir-muted" />
                <input
                  {...register("full_name")}
                  type="text"
                  placeholder="Your full name"
                  className={`w-full pl-11 pr-4 py-3 rounded-2xl border
                              text-kashmir-dark placeholder:text-gray-400
                              focus:outline-none focus:ring-2 focus:ring-kashmir-green/30
                              focus:border-kashmir-green transition-all duration-200
                              ${errors.full_name
                                ? "border-red-400 bg-red-50"
                                : "border-gray-200 bg-gray-50"
                              }`}
                />
              </div>
              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>
              )}
            </div>

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
              <label className="block text-sm font-medium text-kashmir-dark mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2
                                 w-4 h-4 text-kashmir-muted" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 6 characters"
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
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-kashmir-dark mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2
                                 w-4 h-4 text-kashmir-muted" />
                <input
                  {...register("confirm")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  className={`w-full pl-11 pr-4 py-3 rounded-2xl border
                              text-kashmir-dark placeholder:text-gray-400
                              focus:outline-none focus:ring-2 focus:ring-kashmir-green/30
                              focus:border-kashmir-green transition-all duration-200
                              ${errors.confirm
                                ? "border-red-400 bg-red-50"
                                : "border-gray-200 bg-gray-50"
                              }`}
                />
              </div>
              {errors.confirm && (
                <p className="text-red-500 text-xs mt-1">{errors.confirm.message}</p>
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
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-kashmir-muted text-sm mt-8">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-kashmir-green font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
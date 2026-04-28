"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  X, Eye, EyeOff, Mountain, Mail,
  Lock, User, ArrowRight, CheckCircle
} from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

/* ── Schemas ── */
const loginSchema = z.object({
  email:    z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email:     z.string().email("Please enter a valid email"),
  password:  z.string().min(6, "Password must be at least 6 characters"),
  confirm:   z.string(),
}).refine((d) => d.password === d.confirm, {
  message: "Passwords do not match",
  path:    ["confirm"],
});

type LoginData  = z.infer<typeof loginSchema>;
type SignupData = z.infer<typeof signupSchema>;

interface Props {
  isOpen:  boolean;
  onClose: () => void;
}

/* ── Input Component ── */
function Input({
  icon: Icon, type, placeholder, error, showToggle, onToggle, registration
}: any) {
  return (
    <div>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-kashmir-muted" />
        <input
          {...registration}
          type={type}
          placeholder={placeholder}
          className={`w-full pl-11 pr-${showToggle ? "12" : "4"} py-3 rounded-2xl border
                      text-kashmir-dark placeholder:text-gray-400 text-sm
                      focus:outline-none focus:ring-2 focus:ring-kashmir-green/30
                      focus:border-kashmir-green transition-all duration-200
                      ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2
                       text-kashmir-muted hover:text-kashmir-dark"
          >
            {type === "password"
              ? <Eye className="w-4 h-4" />
              : <EyeOff className="w-4 h-4" />
            }
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

/* ── Login Form ── */
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);
  const supabase = createClient();
  const router   = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
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
    onSuccess();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        icon={Mail}
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        registration={register("email")}
      />
      <Input
        icon={Lock}
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        error={errors.password?.message}
        showToggle
        onToggle={() => setShowPassword(!showPassword)}
        registration={register("password")}
      />

      <div className="text-right">
        <a href="#" className="text-xs text-kashmir-green hover:underline">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-kashmir-green text-white py-3 rounded-2xl font-medium
                   flex items-center justify-center gap-2 hover:bg-kashmir-teal
                   transition-all duration-300 hover:shadow-lg
                   disabled:opacity-60 disabled:cursor-not-allowed text-sm"
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
  );
}

/* ── Signup Form ── */
function SignupForm({ onSuccess }: { onSuccess: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupData) => {
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

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        icon={User}
        type="text"
        placeholder="Your full name"
        error={errors.full_name?.message}
        registration={register("full_name")}
      />
      <Input
        icon={Mail}
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        registration={register("email")}
      />
      <Input
        icon={Lock}
        type={showPassword ? "text" : "password"}
        placeholder="Min 6 characters"
        error={errors.password?.message}
        showToggle
        onToggle={() => setShowPassword(!showPassword)}
        registration={register("password")}
      />
      <Input
        icon={Lock}
        type={showPassword ? "text" : "password"}
        placeholder="Repeat your password"
        error={errors.confirm?.message}
        registration={register("confirm")}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-kashmir-green text-white py-3 rounded-2xl font-medium
                   flex items-center justify-center gap-2 hover:bg-kashmir-teal
                   transition-all duration-300 hover:shadow-lg
                   disabled:opacity-60 disabled:cursor-not-allowed text-sm"
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
  );
}

/* ── Main Modal ── */
export default function AuthModal({ isOpen, onClose }: Props) {
  const [isFlipped,      setIsFlipped]      = useState(false);
  const [signupSuccess,  setSignupSuccess]  = useState(false);
  const [isAnimating,    setIsAnimating]    = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsFlipped(false);
      setSignupSuccess(false);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const flip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
    setTimeout(() => setIsAnimating(false), 600);
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster position="top-center" />

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        {/* Modal Card */}
        <div
          className="relative w-full max-w-md"
          style={{ perspective: "1200px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Flip Container */}
          <div
            style={{
              transformStyle:  "preserve-3d",
              transition:      "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              transform:       isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              position:        "relative",
              minHeight:       "520px",
            }}
          >

            {/* ── FRONT — Login ── */}
            <div
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                position: isFlipped ? "absolute" : "relative",
                width: "100%",
                top: 0,
                left: 0,
              }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Kashmir Banner */}
              <div
                className="relative h-32 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80)`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b
                                from-kashmir-dark/40 to-kashmir-dark/70" />
                <div className="relative z-10 h-full flex items-center
                                justify-between px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full
                                    flex items-center justify-center">
                      <Mountain className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-display text-white font-semibold">
                      Go Kashmir
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full
                               flex items-center justify-center text-white
                               hover:bg-white/40 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-6 right-6">
                  <p className="text-white/70 text-xs font-display italic">
                    "Paradise on Earth"
                  </p>
                </div>
              </div>

              {/* Login Content */}
              <div className="p-6">
                <div className="mb-5">
                  <h2 className="font-display text-2xl font-bold text-kashmir-dark">
                    Welcome back
                  </h2>
                  <p className="text-kashmir-muted text-sm mt-1">
                    Sign in to continue your Kashmir journey
                  </p>
                </div>

                <LoginForm onSuccess={onClose} />

                <p className="text-center text-kashmir-muted text-sm mt-5">
                  Don't have an account?{" "}
                  <button
                    onClick={flip}
                    className="text-kashmir-green font-medium hover:underline"
                  >
                    Sign up free
                  </button>
                </p>
              </div>
            </div>

            {/* ── BACK — Signup ── */}
            <div
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                position: "absolute",
                width: "100%",
                top: 0,
                left: 0,
              }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              {signupSuccess ? (
                /* Success State */
                <div className="p-10 text-center">
                  <div className="w-16 h-16 bg-kashmir-green/10 rounded-full
                                  flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-kashmir-green" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-kashmir-dark mb-2">
                    Check your email!
                  </h3>
                  <p className="text-kashmir-muted text-sm mb-6">
                    We've sent a verification link to your email.
                    Please verify to start exploring Kashmir.
                  </p>
                  <button onClick={onClose} className="btn-primary">
                    Done
                  </button>
                </div>
              ) : (
                <>
                  {/* Kashmir Banner */}
                  <div
                    className="relative h-32 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b
                                    from-kashmir-dark/40 to-kashmir-dark/70" />
                    <div className="relative z-10 h-full flex items-center
                                    justify-between px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm
                                        rounded-full flex items-center justify-center">
                          <Mountain className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-display text-white font-semibold">
                          Go Kashmir
                        </span>
                      </div>
                      <button
                        onClick={onClose}
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full
                                   flex items-center justify-center text-white
                                   hover:bg-white/40 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-6 right-6">
                      <p className="text-white/70 text-xs font-display italic">
                        "Begin your journey to Paradise"
                      </p>
                    </div>
                  </div>

                  {/* Signup Content */}
                  <div className="p-6">
                    <div className="mb-5">
                      <h2 className="font-display text-2xl font-bold text-kashmir-dark">
                        Create account
                      </h2>
                      <p className="text-kashmir-muted text-sm mt-1">
                        Your Kashmir adventure starts here
                      </p>
                    </div>

                    <SignupForm onSuccess={() => setSignupSuccess(true)} />

                    <p className="text-center text-kashmir-muted text-sm mt-5">
                      Already have an account?{" "}
                      <button
                        onClick={flip}
                        className="text-kashmir-green font-medium hover:underline"
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
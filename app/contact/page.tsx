"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

const schema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email({ message: "Please enter a valid email" }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await supabase
      .from("contact_messages")
      .insert([data]);

    if (error) {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    reset();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-kashmir-snow">
      <Toaster position="top-center" />

      {/* Hero */}
      <div className="relative h-72 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1600&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center
                        justify-center text-center px-4">
          <p className="text-kashmir-gold uppercase tracking-widest text-sm mb-3">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            We'd love to help plan your Kashmir journey
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Let's Plan Your Trip</h2>
            <p className="text-kashmir-muted leading-relaxed mb-10">
              Have questions about visiting Kashmir? Want help planning your itinerary?
              Our team is here to make your Kashmir dream a reality.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail,  label: "Email Us",    value: "info@gokashmir.com"  },
                { icon: Phone, label: "Call Us",     value: "+91 194 000 0000"    },
                { icon: MapPin,label: "Find Us",     value: "Srinagar, J&K, India"},
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-kashmir-green/10 rounded-2xl
                                    flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-kashmir-green" />
                    </div>
                    <div>
                      <p className="text-xs text-kashmir-muted uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-medium text-kashmir-dark">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            {success ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-kashmir-green/10 rounded-full
                                flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-kashmir-green" />
                </div>
                <h3 className="font-display text-2xl font-bold text-kashmir-dark mb-2">
                  Message Sent!
                </h3>
                <p className="text-kashmir-muted mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <h3 className="font-display text-2xl font-bold text-kashmir-dark mb-6">
                  Send us a message
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-kashmir-dark mb-2">
                    Your Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Full name"
                    className={`w-full px-4 py-3 rounded-2xl border text-kashmir-dark
                                placeholder:text-gray-400 focus:outline-none
                                focus:ring-2 focus:ring-kashmir-green/30
                                focus:border-kashmir-green transition-all duration-200
                                ${errors.name
                                  ? "border-red-400 bg-red-50"
                                  : "border-gray-200 bg-gray-50"
                                }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-kashmir-dark mb-2">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-2xl border text-kashmir-dark
                                placeholder:text-gray-400 focus:outline-none
                                focus:ring-2 focus:ring-kashmir-green/30
                                focus:border-kashmir-green transition-all duration-200
                                ${errors.email
                                  ? "border-red-400 bg-red-50"
                                  : "border-gray-200 bg-gray-50"
                                }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-kashmir-dark mb-2">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us about your trip plans..."
                    className={`w-full px-4 py-3 rounded-2xl border text-kashmir-dark
                                placeholder:text-gray-400 focus:outline-none
                                focus:ring-2 focus:ring-kashmir-green/30
                                focus:border-kashmir-green transition-all duration-200
                                resize-none ${errors.message
                                  ? "border-red-400 bg-red-50"
                                  : "border-gray-200 bg-gray-50"
                                }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-kashmir-green text-white py-3 rounded-2xl
                             font-medium flex items-center justify-center gap-2
                             hover:bg-kashmir-teal transition-all duration-300
                             hover:shadow-lg disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white
                                    rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
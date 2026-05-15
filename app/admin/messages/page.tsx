"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { Mail, Trash2, Calendar, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type Message = {
  id:         string;
  name:       string;
  email:      string;
  message:    string;
  created_at: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading,  setLoading]  = useState(true);
  const supabase = createClient();

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load messages.");
    } else {
      setMessages(data ?? []);
    }
    setLoading(false);
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete message.");
    } else {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success("Message deleted.");
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  return (
    <div>
      <Toaster position="top-center" />

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-kashmir-dark">
          Messages
        </h1>
        <p className="text-kashmir-muted mt-1">
          Contact form submissions from visitors
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-kashmir-green/30
                          border-t-kashmir-green rounded-full animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 shadow-sm text-center">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center
                          justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-amber-500" />
          </div>
          <p className="font-medium text-kashmir-dark">No messages yet</p>
          <p className="text-kashmir-muted text-sm mt-1">
            Messages from the contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white rounded-2xl p-6 shadow-sm
                         hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
                    <span className="flex items-center gap-1.5 font-medium text-kashmir-dark">
                      <User className="w-4 h-4 text-kashmir-muted shrink-0" />
                      {msg.name}
                    </span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="flex items-center gap-1.5 text-kashmir-green
                                 hover:underline text-sm truncate"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      {msg.email}
                    </a>
                    <span className="flex items-center gap-1.5 text-kashmir-muted text-xs">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-kashmir-dark leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>

                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="shrink-0 p-2 text-gray-400 hover:text-red-500
                             hover:bg-red-50 rounded-xl transition-all duration-200"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

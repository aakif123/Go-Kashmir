"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Hotel } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import AccommodationForm from "@/components/admin/AccommodationForm";
import toast, { Toaster } from "react-hot-toast";
import { Accommodation } from "@/types";

export default function AdminAccommodationsPage() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading,        setLoading]        = useState(true);
  const [showForm,       setShowForm]       = useState(false);
  const [editing,        setEditing]        = useState<Accommodation | null>(null);
  const supabase = createClient();

  const fetchAccommodations = async () => {
    const { data } = await supabase
      .from("accommodations")
      .select("*")
      .order("created_at", { ascending: false });
    setAccommodations(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchAccommodations(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this accommodation?")) return;
    const { error } = await supabase.from("accommodations").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Accommodation deleted!");
    fetchAccommodations();
  };

  return (
    <div>
      <Toaster position="top-center" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-kashmir-dark">
            Accommodations
          </h1>
          <p className="text-kashmir-muted mt-1">
            Manage all Kashmir stays
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Accommodation
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-kashmir-green/30
                            border-t-kashmir-green rounded-full animate-spin" />
          </div>
        ) : accommodations.length === 0 ? (
          <div className="text-center py-20">
            <Hotel className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-kashmir-muted">No accommodations yet.</p>
            <button onClick={() => setShowForm(true)} className="btn-primary mt-4">
              Add First Accommodation
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Image", "Name", "Type", "Location", "Price/Night", "Actions"].map((h) => (
                    <th key={h} className="text-left px-6 py-4 text-xs font-medium
                                           text-kashmir-muted uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {accommodations.map((acc) => (
                  <tr key={acc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={acc.image_url ?? ""}
                        alt={acc.name}
                        className="w-14 h-10 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-kashmir-dark">{acc.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-sm bg-blue-50 text-blue-600
                                       px-3 py-1 rounded-full">
                        {acc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-kashmir-muted">
                      {acc.location}
                    </td>
                    <td className="px-6 py-4 font-medium text-kashmir-green">
                      ₹{acc.price_per_night?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setEditing(acc); setShowForm(true); }}
                          className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg
                                     flex items-center justify-center
                                     hover:bg-blue-100 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(acc.id)}
                          className="w-8 h-8 bg-red-50 text-red-500 rounded-lg
                                     flex items-center justify-center
                                     hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <AccommodationForm
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSuccess={fetchAccommodations}
          existing={editing}
        />
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import PlaceForm from "@/components/admin/PlaceForm";
import toast, { Toaster } from "react-hot-toast";
import { Destination } from "@/types";

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [showForm,     setShowForm]     = useState(false);
  const [editing,      setEditing]      = useState<Destination | null>(null);
  const supabase = createClient();

  const fetchDestinations = async () => {
    const { data } = await supabase
      .from("destinations")
      .select("*")
      .order("created_at", { ascending: false });
    setDestinations(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchDestinations(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;
    const { error } = await supabase.from("destinations").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Destination deleted!");
    fetchDestinations();
  };

  return (
    <div>
      <Toaster position="top-center" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-kashmir-dark">
            Destinations
          </h1>
          <p className="text-kashmir-muted mt-1">
            Manage all Kashmir destinations
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Destination
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-kashmir-green/30
                            border-t-kashmir-green rounded-full animate-spin" />
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-20">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-kashmir-muted">No destinations yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary mt-4"
            >
              Add First Destination
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Image", "Name", "Category", "Location", "Featured", "Actions"].map((h) => (
                    <th key={h} className="text-left px-6 py-4 text-xs font-medium
                                           text-kashmir-muted uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {destinations.map((dest) => (
                  <tr key={dest.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={dest.image_url ?? ""}
                        alt={dest.name}
                        className="w-14 h-10 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-kashmir-dark">{dest.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-sm bg-kashmir-green/10
                                       text-kashmir-green px-3 py-1 rounded-full">
                        {dest.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-kashmir-muted">
                      {dest.location}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        dest.is_featured
                          ? "bg-kashmir-gold/20 text-kashmir-saffron"
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        {dest.is_featured ? "Featured" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setEditing(dest); setShowForm(true); }}
                          className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg
                                     flex items-center justify-center
                                     hover:bg-blue-100 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(dest.id)}
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

      {/* Form Modal */}
      {showForm && (
        <PlaceForm
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSuccess={fetchDestinations}
          existing={editing}
        />
      )}
    </div>
  );
}
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { Accommodation } from "@/types";

const schema = z.object({
  name:            z.string().min(2, "Name is required"),
  description:     z.string().min(10, "Description is required"),
  type:            z.enum(["hotel", "houseboat", "resort", "guesthouse"]),
  location:        z.string().min(2, "Location is required"),
  image_url:       z.string().url("Must be a valid URL"),
  price_per_night: z.number().min(1, "Price is required"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onClose:   () => void;
  onSuccess: () => void;
  existing?: Accommodation | null;
}

export default function AccommodationForm({ onClose, onSuccess, existing }: Props) {
  const supabase = createClient();
  const isEdit   = !!existing;

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: existing
        ? {
            name:            existing.name,
            description:     existing.description     ?? "",
            type:            existing.type,
            location:        existing.location        ?? "",
            image_url:       existing.image_url       ?? "",
            price_per_night: existing.price_per_night ?? 0,
          }
        : {
            name:            "",
            description:     "",
            type:            "hotel",
            location:        "",
            image_url:       "",
            price_per_night: 0,
          },
    });

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      price_per_night: Number(data.price_per_night),
    };

    const { error } = isEdit
      ? await supabase.from("accommodations").update(payload).eq("id", existing!.id)
      : await supabase.from("accommodations").insert([payload]);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(isEdit ? "Accommodation updated!" : "Accommodation added!");
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50
                    flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh]
                      overflow-y-auto shadow-2xl">

        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-display text-xl font-bold text-kashmir-dark">
            {isEdit ? "Edit Accommodation" : "Add New Accommodation"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center
                       justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-kashmir-dark mb-2">
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="e.g. Khyber Resort"
              className={`w-full px-4 py-3 rounded-xl border text-kashmir-dark
                          placeholder:text-gray-400 focus:outline-none
                          focus:ring-2 focus:ring-kashmir-green/30
                          focus:border-kashmir-green transition-all
                          ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-kashmir-dark mb-2">
              Location
            </label>
            <input
              {...register("location")}
              type="text"
              placeholder="e.g. Gulmarg, Kashmir"
              className={`w-full px-4 py-3 rounded-xl border text-kashmir-dark
                          placeholder:text-gray-400 focus:outline-none
                          focus:ring-2 focus:ring-kashmir-green/30
                          focus:border-kashmir-green transition-all
                          ${errors.location ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-kashmir-dark mb-2">
              Image URL
            </label>
            <input
              {...register("image_url")}
              type="text"
              placeholder="https://images.unsplash.com/..."
              className={`w-full px-4 py-3 rounded-xl border text-kashmir-dark
                          placeholder:text-gray-400 focus:outline-none
                          focus:ring-2 focus:ring-kashmir-green/30
                          focus:border-kashmir-green transition-all
                          ${errors.image_url ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
            />
            {errors.image_url && (
              <p className="text-red-500 text-xs mt-1">{errors.image_url.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-kashmir-dark mb-2">
              Price per Night (₹)
            </label>
            <input
              {...register("price_per_night", { valueAsNumber: true })}
              type="number"
              placeholder="e.g. 5000"
              className={`w-full px-4 py-3 rounded-xl border text-kashmir-dark
                          placeholder:text-gray-400 focus:outline-none
                          focus:ring-2 focus:ring-kashmir-green/30
                          focus:border-kashmir-green transition-all
                          ${errors.price_per_night ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
            />
            {errors.price_per_night && (
              <p className="text-red-500 text-xs mt-1">{errors.price_per_night.message}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-kashmir-dark mb-2">
              Type
            </label>
            <select
              {...register("type")}
              className="w-full px-4 py-3 rounded-xl border border-gray-200
                         bg-gray-50 text-kashmir-dark focus:outline-none
                         focus:ring-2 focus:ring-kashmir-green/30
                         focus:border-kashmir-green transition-all capitalize"
            >
              <option value="hotel">Hotel</option>
              <option value="houseboat">Houseboat</option>
              <option value="resort">Resort</option>
              <option value="guesthouse">Guesthouse</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-kashmir-dark mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Describe this accommodation..."
              className={`w-full px-4 py-3 rounded-xl border text-kashmir-dark
                          placeholder:text-gray-400 focus:outline-none resize-none
                          focus:ring-2 focus:ring-kashmir-green/30
                          focus:border-kashmir-green transition-all
                          ${errors.description ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200
                         text-kashmir-dark font-medium hover:bg-gray-50
                         transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-xl bg-kashmir-green text-white
                         font-medium hover:bg-kashmir-teal transition-all duration-200
                         disabled:opacity-60 flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white
                                rounded-full animate-spin" />
              ) : (
                isEdit ? "Update" : "Add Accommodation"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
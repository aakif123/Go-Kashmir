"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { Destination } from "@/types";

const schema = z.object({
  name:        z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description is required"),
  category:    z.enum(["mountain", "lake", "adventure", "cultural", "cuisine"]),
  image_url:   z.string().url("Must be a valid URL"),
  location:    z.string().min(2, "Location is required"),
  is_featured: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onClose:   () => void;
  onSuccess: () => void;
  existing?: Destination | null;
}

export default function PlaceForm({ onClose, onSuccess, existing }: Props) {
  const supabase = createClient();
  const isEdit   = !!existing;

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: existing
        ? {
            name:        existing.name,
            description: existing.description ?? "",
            category:    existing.category,
            image_url:   existing.image_url   ?? "",
            location:    existing.location    ?? "",
            is_featured: existing.is_featured,
          }
        : { is_featured: false },
    });

  const onSubmit = async (data: FormData) => {
    const { error } = isEdit
      ? await supabase.from("destinations").update(data).eq("id", existing!.id)
      : await supabase.from("destinations").insert([data]);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(isEdit ? "Destination updated!" : "Destination added!");
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50
                    flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh]
                      overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-display text-xl font-bold text-kashmir-dark">
            {isEdit ? "Edit Destination" : "Add New Destination"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center
                       justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">

          {[
            { name: "name",      label: "Name",     type: "text", placeholder: "e.g. Gulmarg"                            },
            { name: "location",  label: "Location", type: "text", placeholder: "e.g. Baramulla, Kashmir"                 },
            { name: "image_url", label: "Image URL",type: "text", placeholder: "https://images.unsplash.com/..."         },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-kashmir-dark mb-2">
                {field.label}
              </label>
              <input
                {...register(field.name as keyof FormData)}
                type={field.type}
                placeholder={field.placeholder}
                className={`w-full px-4 py-3 rounded-xl border text-kashmir-dark
                            placeholder:text-gray-400 focus:outline-none
                            focus:ring-2 focus:ring-kashmir-green/30
                            focus:border-kashmir-green transition-all
                            ${errors[field.name as keyof FormData]
                              ? "border-red-400 bg-red-50"
                              : "border-gray-200 bg-gray-50"
                            }`}
              />
              {errors[field.name as keyof FormData] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[field.name as keyof FormData]?.message}
                </p>
              )}
            </div>
          ))}

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-kashmir-dark mb-2">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full px-4 py-3 rounded-xl border border-gray-200
                         bg-gray-50 text-kashmir-dark focus:outline-none
                         focus:ring-2 focus:ring-kashmir-green/30
                         focus:border-kashmir-green transition-all"
            >
              <option value="mountain">Mountain</option>
              <option value="lake">Lake</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="cuisine">Cuisine</option>
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
              placeholder="Describe this destination..."
              className={`w-full px-4 py-3 rounded-xl border text-kashmir-dark
                          placeholder:text-gray-400 focus:outline-none resize-none
                          focus:ring-2 focus:ring-kashmir-green/30
                          focus:border-kashmir-green transition-all
                          ${errors.description
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 bg-gray-50"
                          }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              {...register("is_featured")}
              type="checkbox"
              id="is_featured"
              className="w-4 h-4 accent-kashmir-green"
            />
            <label htmlFor="is_featured" className="text-sm text-kashmir-dark">
              Mark as Featured Destination
            </label>
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
                         disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white
                                rounded-full animate-spin" />
              ) : (
                isEdit ? "Update" : "Add Destination"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
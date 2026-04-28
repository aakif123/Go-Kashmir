export type UserRole = "user" | "admin";

export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string | null;
  category: "mountain" | "lake" | "adventure" | "cultural" | "cuisine";
  image_url: string | null;
  location: string | null;
  is_featured: boolean;
  created_at: string;
}

export interface Accommodation {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  price_per_night: number | null;
  image_url: string | null;
  type: "hotel" | "houseboat" | "resort" | "guesthouse";
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}
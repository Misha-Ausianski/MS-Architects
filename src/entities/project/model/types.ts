export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  serviceSlug: string;
  city?: string;
  year?: number;
  area_m2?: number;
  cover: string;
  gallery: string[];
  excerpt?: string;
  content?: string;
  featured?: boolean;
  customer?: string;
};

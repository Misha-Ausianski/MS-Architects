export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  city?: string;
  year?: number;
  area_m2?: number;
  cover: string;
  gallery: string[];
  excerpt?: string;
  content?: string;
  featured?: boolean;
};
export type ProjectList = { items: Project[]; total: number };

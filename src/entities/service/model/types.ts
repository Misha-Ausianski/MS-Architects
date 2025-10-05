export type Service = {
  id: number;
  slug: string;
  title: string;
  cover: string;
  description?: string;
};
export type ServiceList = { items: Service[]; total: number };

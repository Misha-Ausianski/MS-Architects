export type ServiceIntro = {
  left: string[];
  right: string[];
};

export type Service = {
  id: number;
  slug: string;
  title: string;
  cover: string;
  description?: string;
  intro: ServiceIntro;
};

export type ServiceLink = Pick<Service, 'id' | 'slug' | 'title'>;

export type ServiceList = {
  items: Service[];
  total: number;
};

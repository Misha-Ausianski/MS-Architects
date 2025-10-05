import { useQuery } from '@tanstack/react-query';
import { api, safeJson } from '@shared/api/client';
import type { Service, ServiceList } from '../model/types';

export async function fetchServices() {
  return await safeJson<ServiceList>(api.get('services.json'));
}
export async function fetchService(slug: string) {
  const all = await safeJson<ServiceList>(api.get('services.json'));
  const found = all.items.find(s => s.slug === slug);
  if (!found) throw new Error('Услуга не найдена');
  return found;
}

export function useServices() {
  return useQuery({ queryKey: ['services'], queryFn: () => fetchServices() });
}
export function useService(slug: string) {
  return useQuery({ queryKey: ['service', slug], queryFn: () => fetchService(slug) });
}

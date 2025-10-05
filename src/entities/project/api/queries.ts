import { useQuery } from '@tanstack/react-query';
import { api, safeJson } from '@shared/api/client';
import type { Project, ProjectList } from '../model/types';

export async function fetchProjects(params?: { category?: string; q?: string; page?: number; size?: number }) {
  const all = await safeJson<ProjectList>(api.get('projects.json'));
  let items = all.items;
  if (params?.category && params.category !== 'all') {
    items = items.filter(p => p.category === params.category);
  }
  // Простейшая пагинация на клиенте по size/page
  if (params?.size) {
    const page = params.page ?? 1;
    const start = (page - 1) * params.size;
    items = items.slice(start, start + params.size);
  }
  return { items, total: all.total };
}
export async function fetchProject(slug: string) {
  const all = await safeJson<ProjectList>(api.get('projects.json'));
  const found = all.items.find(p => p.slug === slug);
  if (!found) throw new Error('Проект не найден');
  return found;
}

export function useProjects(params?: { category?: string; q?: string; page?: number; size?: number }) {
  return useQuery({ queryKey: ['projects', params], queryFn: () => fetchProjects(params) });
}
export function useProject(slug: string) {
  return useQuery({ queryKey: ['project', slug], queryFn: () => fetchProject(slug) });
}

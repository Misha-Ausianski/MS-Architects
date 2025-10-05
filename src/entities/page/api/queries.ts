import { useQuery } from '@tanstack/react-query';
import { api, safeJson } from '@shared/api/client';
import type { Page } from '../model/types';

export function usePage(slug: string) {
  return useQuery({
    queryKey: ['page', slug],
    queryFn: async () => await safeJson<Page>(api.get(`pages/${slug}.json`))
  });
}

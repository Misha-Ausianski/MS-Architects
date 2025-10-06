import ky from 'ky';

export const api = ky.create({
  prefixUrl: `${import.meta.env.BASE_URL}api/`,
  headers: { Accept: 'application/json' },
  timeout: 8000,
});

export async function safeJson<T>(p: Promise<Response>): Promise<T> {
  return await (await p).json<T>();
}

import ky from 'ky';
export const api = ky.create({
  prefixUrl: '/api', // статические мок-данные в public/api
  headers: { Accept: 'application/json' },
  timeout: 8000,
});
export async function safeJson<T>(p: Promise<Response>): Promise<T> {
  return await (await p).json<T>();
}

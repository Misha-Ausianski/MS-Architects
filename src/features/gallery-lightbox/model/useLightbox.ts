import { useState } from 'react';
export function useLightbox() {
  const [src, setSrc] = useState<string | null>(null);
  const open = (s: string) => setSrc(s);
  const close = () => setSrc(null);
  return { src, open, close };
}

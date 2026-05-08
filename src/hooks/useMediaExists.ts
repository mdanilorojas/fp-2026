'use client';

import { useEffect, useState } from 'react';

const cache = new Map<string, boolean>();

export function useMediaExists(path: string | undefined | null): boolean | null {
  const [exists, setExists] = useState<boolean | null>(
    path && cache.has(path) ? (cache.get(path) as boolean) : null,
  );

  useEffect(() => {
    if (!path) {
      setExists(false);
      return;
    }
    if (cache.has(path)) {
      setExists(cache.get(path) as boolean);
      return;
    }
    let cancelled = false;
    fetch(path, { method: 'HEAD' })
      .then((res) => {
        const ok = res.ok;
        cache.set(path, ok);
        if (!cancelled) setExists(ok);
      })
      .catch(() => {
        cache.set(path, false);
        if (!cancelled) setExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return exists;
}

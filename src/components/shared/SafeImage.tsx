'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type Props = Omit<ImageProps, 'onError'> & {
  fallback?: React.ReactNode;
};

export function SafeImage({ fallback = null, ...props }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return <Image {...props} onError={() => setFailed(true)} />;
}

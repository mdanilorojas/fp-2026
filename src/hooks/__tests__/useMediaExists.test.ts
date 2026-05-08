import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMediaExists } from '../useMediaExists';

describe('useMediaExists', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns null then true when HEAD returns 200', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, status: 200 } as Response);
    const { result } = renderHook(() => useMediaExists('/foo.mp3'));
    expect(result.current).toBe(null);
    await waitFor(() => expect(result.current).toBe(true));
  });

  it('returns false when HEAD returns 404', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 } as Response);
    const { result } = renderHook(() => useMediaExists('/missing.mp3'));
    await waitFor(() => expect(result.current).toBe(false));
  });

  it('returns false when fetch throws', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('network'));
    const { result } = renderHook(() => useMediaExists('/error.mp3'));
    await waitFor(() => expect(result.current).toBe(false));
  });
});

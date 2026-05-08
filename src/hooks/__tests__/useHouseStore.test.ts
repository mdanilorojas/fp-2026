import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useHouseStore } from '../useHouseStore';

describe('useHouseStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useHouseStore.getState().reset();
  });

  it('starts with no visited rooms and firstVisit=true', () => {
    const { result } = renderHook(() => useHouseStore());
    expect(Array.from(result.current.visitedRooms)).toEqual([]);
    expect(result.current.firstVisit).toBe(true);
    expect(result.current.audioEnabled).toBe(true);
  });

  it('visitRoom adds slug and deduplicates', () => {
    const { result } = renderHook(() => useHouseStore());
    act(() => {
      result.current.visitRoom('cocina');
      result.current.visitRoom('cocina');
      result.current.visitRoom('patio');
    });
    expect(result.current.visitedRooms.has('cocina')).toBe(true);
    expect(result.current.visitedRooms.has('patio')).toBe(true);
    expect(result.current.visitedRooms.size).toBe(2);
  });

  it('firstVisit becomes false after visiting 6 non-buzon rooms', () => {
    const { result } = renderHook(() => useHouseStore());
    act(() => {
      ['puerta', 'pasaje', 'cocina', 'patio', 'musica', 'familia'].forEach((s) =>
        result.current.visitRoom(s as any),
      );
    });
    expect(result.current.firstVisit).toBe(false);
  });

  it('toggleAudio flips audioEnabled', () => {
    const { result } = renderHook(() => useHouseStore());
    act(() => result.current.toggleAudio());
    expect(result.current.audioEnabled).toBe(false);
    act(() => result.current.toggleAudio());
    expect(result.current.audioEnabled).toBe(true);
  });

  it('saveCoupon and hasOpenedLetter work', () => {
    const { result } = renderHook(() => useHouseStore());
    act(() => {
      result.current.saveCoupon('masaje');
      result.current.markLetterOpened();
    });
    expect(result.current.savedCoupons).toContain('masaje');
    expect(result.current.hasOpenedLetter).toBe(true);
  });
});

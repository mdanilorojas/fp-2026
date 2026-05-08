import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { AudioEngine } from '../AudioEngine';

describe('AudioEngine', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // Mock HTMLAudioElement.play to return a resolved promise
    HTMLAudioElement.prototype.play = vi.fn().mockResolvedValue(undefined);
    HTMLAudioElement.prototype.pause = vi.fn();
  });

  it('renders two audio elements', () => {
    const { container } = render(<AudioEngine currentRoomSlug="puerta" enabled={true} />);
    const audios = container.querySelectorAll('audio');
    expect(audios.length).toBe(2);
  });

  it('does not throw when enabled=false', () => {
    expect(() =>
      render(<AudioEngine currentRoomSlug="pasaje" enabled={false} />),
    ).not.toThrow();
  });
});

import '@testing-library/jest-dom/vitest';

// Polyfill localStorage for tests
if (typeof window !== 'undefined') {
  class LocalStorageMock {
    private store: Record<string, string> = {};

    getItem(key: string) {
      return this.store[key] || null;
    }

    setItem(key: string, value: string) {
      this.store[key] = value;
    }

    removeItem(key: string) {
      delete this.store[key];
    }

    clear() {
      this.store = {};
    }
  }

  global.localStorage = new LocalStorageMock() as any;
}

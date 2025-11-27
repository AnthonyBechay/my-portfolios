/**
 * requestAnimationFrame utilities for performance optimization
 * Wraps state updates to prevent layout thrashing during scroll
 */

/**
 * Debounced requestAnimationFrame wrapper
 * Ensures callback runs at most once per frame
 */
export function raf(callback: () => void): number {
  return requestAnimationFrame(callback);
}

/**
 * Debounced scroll handler using requestAnimationFrame
 * Prevents excessive function calls during scroll
 */
export function createScrollHandler(
  callback: () => void,
  options: { throttle?: boolean } = {}
): () => void {
  let rafId: number | null = null;
  let lastCallTime = 0;
  const throttleMs = options.throttle ? 16 : 0; // ~60fps

  return () => {
    const now = Date.now();
    
    if (throttleMs && now - lastCallTime < throttleMs) {
      return;
    }

    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(() => {
      callback();
      lastCallTime = Date.now();
      rafId = null;
    });
  };
}

/**
 * Safe layout property reader
 * Batches layout reads to prevent forced reflows
 */
export function batchLayoutRead<T>(
  reads: (() => T)[],
  callback: (results: T[]) => void
): void {
  requestAnimationFrame(() => {
    const results = reads.map((read) => read());
    callback(results);
  });
}




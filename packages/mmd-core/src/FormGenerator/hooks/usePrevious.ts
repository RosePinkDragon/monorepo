import { useState } from "react";

/**
 * Returns the previous value of the provided value.
 *
 * This is picked from: {@link https://usehooks.com/usePrevious | useHooks}
 * For more info {@link https://github.com/uidotdev/usehooks/blob/main/index.js#L1017C1-L1028C1 | check git repo}
 *
 * @template T - The type of the value.
 * @param {T} value - The current value.
 * @returns {T | null} - The previous value.
 *
 * @example
 * const previousCount = usePrevious(count);
 */
function usePrevious(value: any) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(null);

  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
}

export default usePrevious;

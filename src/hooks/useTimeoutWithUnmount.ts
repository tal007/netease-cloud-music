import { useRef, useEffect } from 'react';

export const useTimeoutWithUnmount = (callback: () => void, clearCallback: () => void, delay: number) => {
  const savedCallback = useRef(() => {});
  const savedClearCallback = useRef(() => {});
  useEffect(() => {
    savedCallback.current = callback;
    savedClearCallback.current = clearCallback;
  })
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }
    const listener = setTimeout(tick, delay);
    return () => {
      clearTimeout(listener);
      savedClearCallback.current();
    }
  }, [delay])
}
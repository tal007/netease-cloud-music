import { useEffect, useRef } from 'react';

function useAnimationFrame(callback: Function, runing: boolean) {
  const cb = useRef<Function>(callback);
  const animationID = useRef(0);

  useEffect(() => {
    cb.current = callback;
  });

  useEffect(() => {
    const animationFrame =
      window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    const cancelAnimationFrame =
      window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
    function run() {
      cb.current();
      if (runing) {
        animationID.current = animationFrame(run);
      }
    }
    console.log(runing);

    if (runing) {
      animationID.current = animationFrame(run);
      return () => cancelAnimationFrame(animationID.current);
    } else {
      cancelAnimationFrame(animationID.current);
    }
  }, [runing]);
}

export default useAnimationFrame;

import { useEffect, useRef } from 'react';

/**
 * 使用自定义 hook 可以解决直接在代码中使用 
 * requestAnimationFrame 回调函数无法读取 state 的情况
 *
 * @param {Function} callback 回调函数
 * @param {boolean} runing 是否执行
 */
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

    if (runing) {
      animationID.current = animationFrame(run);
      return () => cancelAnimationFrame(animationID.current);
    } else {
      cancelAnimationFrame(animationID.current);
    }
  }, [runing]);
}

export default useAnimationFrame;

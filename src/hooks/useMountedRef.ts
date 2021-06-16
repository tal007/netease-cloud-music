/*
 * @Author: 刘玉田
 * @Date: 2021-06-16 16:47:24
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-16 16:51:12
 * 用于判断组件是否已经卸载,如果还没挂载或者已经卸载返回false，否则返回true
 */

import { useEffect, useRef } from "react";

export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};

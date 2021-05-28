/*
 * @Author: 刘玉田 
 * @Date: 2021-05-27 17:59:49 
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-27 18:06:49
 * 防抖
 */

import { useRef, useEffect } from 'react';

function useDebounce(callback: Function, delay: number) {
  const debounce = useRef(callback);
  
  useEffect(() => {
    const timer = window.setTimeout(() => {
      debounce.current();
    }, delay)

    return () => {
      window.clearTimeout(timer);
    }
  })

  return debounce
}

export default useDebounce;
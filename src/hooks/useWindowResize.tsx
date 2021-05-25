import { useState, useEffect } from 'react';

function useWindowResize() {
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight);

  function setData() {
    setWindowInnerWidth(window.innerWidth);
    setWindowInnerHeight(window.innerHeight);
  }
  
  useEffect(() => {
    window.addEventListener('resize', setData)

    return () => {
      window.removeEventListener('resize', setData)
    }
  }, []);
  
  return {
    windowInnerWidth,
    windowInnerHeight
  }
}

export default useWindowResize
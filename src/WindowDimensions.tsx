import React, {useState, useEffect} from 'react';

interface Size {
  width: number;
  height: number;
}

const WindowDimensions = () => {
  const [windowSize, setWindowSize] = useState<Size>({width: window.innerWidth, height: window.innerHeight});

  const onResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setWindowSize({
      width: width,
      height: height,
    });
  }

  useEffect(() => {
    
    window.addEventListener('resize', onResize);
  }, []);

  return (
    <div style={{
      backgroundColor:
        !windowSize || windowSize.width <= 500
          ? "white"
          : windowSize && windowSize.width <= 700
          ? "green"
          : "orange",
    }}
  > width: {windowSize.width} x height: {windowSize.height}</div>
  
  )
}

export default WindowDimensions;
import React, { useState, useEffect } from 'react';

interface Size {
  width: number;
  height: number;
}

interface Values {
  name: string,
  minWidth: string
}

type Props = {
  values: Values[];
};

const WindowDimensions: React.FC<Props> = ({ values }) => {
  const [windowSize, setWindowSize] = useState<Size>({ width: window.innerWidth, height: window.innerHeight });

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
  });

  return (
    <div>
      {values && values.map(({ name, minWidth }: any, index: number) => {
        return (<div key={index}>{name} + {minWidth}</div>)
      })
      }
    </div>
  )
}

  export default WindowDimensions
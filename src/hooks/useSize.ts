import * as React from 'react';

interface Dimension {
  height: number;
  width: number;
}

export const useSize = (ref: React.RefObject<HTMLDivElement>) => {
  const [dimension, setDimension] = React.useState<Dimension>({
    height: 0,
    width: 0
  });

  React.useEffect(() => {
    if (ref.current) {
      setDimension({
        height: ref.current.clientHeight,
        width: ref.current.clientWidth
      });
    }
  }, [ref]);
  return dimension;
};

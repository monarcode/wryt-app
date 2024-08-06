import { Canvas, Path, TouchInfo, useTouchHandler, Skia, SkPath } from '@shopify/react-native-skia';
import React, { useState } from 'react';

export const SketchCanvas = ({ containerStyle }: { containerStyle: any }) => {
  const [paths, setPaths] = useState<SkPath[]>([]);

  const strokeWidth = 4;

  const touchHandler = useTouchHandler({
    onStart: (touchInfo: TouchInfo) => {
      const newPath = Skia.Path.Make();
      newPath.moveTo(touchInfo.x, touchInfo.y);
      setPaths((currentPaths) => [...currentPaths, newPath]);
    },
    onActive: (touchInfo: TouchInfo) => {
      setPaths((currentPaths) => {
        const lastIndex = currentPaths.length - 1;
        const lastPath = currentPaths[lastIndex];
        if (lastPath) {
          const updatedPath = lastPath.copy();
          updatedPath.lineTo(touchInfo.x, touchInfo.y);
          return [...currentPaths.slice(0, lastIndex), updatedPath];
        }
        return currentPaths;
      });
    },
    onEnd: () => {},
  });

  return (
    <Canvas onTouch={touchHandler} style={containerStyle}>
      {paths.map((path, index) => (
        <Path key={index} path={path} strokeWidth={strokeWidth} color="black" style="stroke" />
      ))}
    </Canvas>
  );
};

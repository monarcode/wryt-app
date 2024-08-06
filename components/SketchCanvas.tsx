import { Canvas, Path, TouchInfo, useTouchHandler, Skia, SkPath } from '@shopify/react-native-skia';
import React, { useState } from 'react';

export const SketchCanvas = ({ containerStyle }: { containerStyle: any }) => {
  const [currentPath, setCurrentPath] = useState<SkPath | null>(null);
  const [completedPaths, setCompletedPaths] = useState<SkPath[]>([]);

  const strokeWidth = 4;

  const touchHandler = useTouchHandler({
    onStart: (touchInfo: TouchInfo) => {
      const path = Skia.Path.Make();
      path.moveTo(touchInfo.x, touchInfo.y);
      setCurrentPath(path);
    },
    onActive: (touchInfo: TouchInfo) => {
      setCurrentPath((prevPath) => {
        const newPath = prevPath ? prevPath : null;
        if (newPath) {
          newPath.lineTo(touchInfo.x, touchInfo.y);
        }
        return newPath;
      });
    },
    onEnd: () => {
      if (currentPath) {
        setCompletedPaths((prevPaths) => [...prevPaths, currentPath]);
        setCurrentPath(null);
      }
    },
  });

  return (
    <Canvas onTouch={touchHandler} style={containerStyle}>
      {completedPaths.map((path, index) => (
        <Path key={index} path={path} strokeWidth={strokeWidth} color="black" style="stroke" />
      ))}
      {currentPath && (
        <Path path={currentPath} strokeWidth={strokeWidth} color="black" style="stroke" />
      )}
    </Canvas>
  );
};

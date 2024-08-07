import { Canvas, Path, Skia, SkPath, TouchInfo, useTouchHandler } from '@shopify/react-native-skia';
import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { Pressable } from 'react-native';

import UndoIcon from '~/assets/icons/undo-icon.svg';
import useSketchPadStore from '~/store/store';

interface Point {
  x: number;
  y: number;
}

interface SketchCanvasProps {
  containerStyle: any;
  color?: string;
  strokeWidth?: number;
}

export const SketchCanvas: React.FC<SketchCanvasProps> = ({
  containerStyle,
  color = 'black',
  strokeWidth = 1.5,
}) => {
  // const [paths, setPaths] = useState<SkPath[]>([]);
  const [undonePaths, setUndonePaths] = useState<SkPath[]>([]);
  const currentPath = useRef<SkPath | null>(null);
  const pointsRef = useRef<Point[]>([]);


  const { paths, startPath, addToPath, endPath, undo, redo } = useSketchPadStore();

  const touchHandler = useTouchHandler({
    onStart: ({ x, y }: TouchInfo) => {
      startPath(x, y);
    },
    onActive: ({ x, y }: TouchInfo) => {
      addToPath(x, y);
    },
    onEnd: () => {
      endPath();
    },
  });

  return (
    <Canvas onTouch={touchHandler} style={containerStyle}>
      {paths.map((path, index) => (
        <Path
          key={index}
          path={path.path}
          strokeWidth={path.strokeWidth}
          color={color}
          style="stroke"
          strokeCap="round"
          strokeJoin="round"
        />
      ))}
    </Canvas>
  );
};

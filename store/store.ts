import AsyncStorage from '@react-native-async-storage/async-storage';
import { Skia } from '@shopify/react-native-skia';
import { create } from 'zustand';

import { StoreType, PathType } from '~/types/store';

const useSketchPadStore = create<StoreType>((set, get) => ({
  paths: [],
  redoStack: [],
  color: '#FF5733',
  strokeWidth: 4,
  strokeStyle: 'stroke',
  currentPath: null,
  fileName: '',
  timeStamp: '',
  refreshTrigger: 0,

  setColor: (color) => set({ color }),
  setStrokeWidth: (strokeWidth) => set({ strokeWidth }),
  setStrokeStyle: (strokeStyle) => set({ strokeStyle }),
  setFileName: (fileName) => set({ fileName }),

  startPath: (x, y) => {
    const { color, strokeWidth, strokeStyle } = get();
    const newPath = Skia.Path.Make();
    newPath.moveTo(x, y);
    set({
      currentPath: { path: newPath, color, strokeWidth, strokeStyle },
    });
  },

  addToPath: (x, y) => {
    const { currentPath } = get();
    if (currentPath) {
      currentPath.path.lineTo(x, y);
      set({ currentPath });
    }
  },

  endPath: () => {
    const { paths, currentPath, redoStack } = get();
    if (currentPath) {
      set({
        paths: [...paths, currentPath],
        redoStack: [],
        currentPath: null,
      });
    }
  },

  undo: () => {
    const { paths, redoStack } = get();
    if (paths.length > 0) {
      const lastPath = paths.pop();
      set({
        paths: [...paths],
        redoStack: [...redoStack, lastPath as PathType],
      });
    }
  },

  redo: () => {
    const { paths, redoStack } = get();
    if (redoStack.length > 0) {
      const lastUndonePath = redoStack.pop();
      set({
        paths: [...paths, lastUndonePath as PathType],
        redoStack,
      });
    }
  },

  clear: () => {
    set({ paths: [], redoStack: [], currentPath: null });
  },

  saveDrawing: async () => {
    try {
      const { paths, fileName } = get();
      const serializedPaths = JSON.stringify(
        paths.map((p) => ({
          path: p.path.toSVGString(),
          color: p.color,
          strokeWidth: p.strokeWidth,
          strokeStyle: p.strokeStyle,
        }))
      );
      const timeStamp = new Date().toISOString();
      const key = `@sketchpad_drawing_${timeStamp}`;
      await AsyncStorage.setItem(
        key,
        JSON.stringify({ fileName, timeStamp, paths: serializedPaths })
      );
      set({ timeStamp });
      set((state) => ({ refreshTrigger: state.refreshTrigger + 1 }));
    } catch (e) {
      console.error('Failed to save drawing.', e);
    }
  },

  loadDrawing: async () => {
    try {
      const serializedData = await AsyncStorage.getItem('@sketchpad_drawing');
      if (serializedData) {
        const { fileName, timeStamp, paths } = JSON.parse(serializedData);
        const loadedPaths: PathType[] = paths.map((p: any) => ({
          path: Skia.Path.MakeFromSVGString(p.path),
          color: p.color,
          strokeWidth: p.strokeWidth,
          strokeStyle: p.strokeStyle,
        }));
        set({ paths: loadedPaths, fileName, timeStamp });
      }
    } catch (e) {
      console.error('Failed to load drawing.', e);
    }
  },
  getAllSavedDrawings: async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const drawingKeys = keys.filter((key) => key.startsWith('@sketchpad_drawing_'));
      const drawings = await AsyncStorage.multiGet(drawingKeys);
      return drawings
        .map(([key, value]) => (value ? JSON.parse(value) : null))
        .filter((drawing) => drawing !== null);
    } catch (e) {
      console.error('Failed to load drawings', e);
      return [];
    }
  },
}));

export default useSketchPadStore;

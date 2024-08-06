export type PathType = {
  path: SkPath;
  color: string;
  strokeWidth: number;
  strokeStyle: 'stroke' | 'fill';
};

export type StoreType = {
  paths: PathType[];
  redoStack: PathType[];
  color: string;
  strokeWidth: number;
  strokeStyle: 'stroke' | 'fill';
  currentPath: PathType | null;
  fileName: string;
  timeStamp: string;

  setColor: (color: string) => void;
  setStrokeWidth: (strokeWidth: number) => void;
  setStrokeStyle: (strokeStyle: 'stroke' | 'fill') => void;
  setFileName: (fileName: string) => void;

  startPath: (x: number, y: number) => void;
  addToPath: (x: number, y: number) => void;
  endPath: () => void;

  undo: () => void;
  redo: () => void;
  clear: () => void;

  saveDrawing: () => Promise<void>;
  loadDrawing: () => Promise<void>;
};

import { useCallback, useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

const DRAG_THRESHOLD = 12;

export interface UseDraggableOptions {
  initialX?: number;
  initialY?: number;
  onTap?: () => void;
  onDragEnd?: (x: number, y: number) => void;
  bounds?: { minX: number; maxX: number; minY: number; maxY: number };
}

export function useDraggable(options: UseDraggableOptions = {}) {
  const { initialX = 0, initialY = 0, onTap, onDragEnd, bounds } = options;

  const pan = useRef(
    new Animated.ValueXY({ x: initialX, y: initialY })
  ).current;
  const startOffset = useRef({ x: initialX, y: initialY });
  const dragged = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        dragged.current = false;
        pan.extractOffset();
      },
      onPanResponderMove: (_, gestureState) => {
        if (
          Math.abs(gestureState.dx) > DRAG_THRESHOLD ||
          Math.abs(gestureState.dy) > DRAG_THRESHOLD
        ) {
          dragged.current = true;
        }
        const {
          minX = -Infinity,
          maxX = Infinity,
          minY = -Infinity,
          maxY = Infinity,
        } = bounds ?? {};
        let x = startOffset.current.x + gestureState.dx;
        let y = startOffset.current.y + gestureState.dy;
        x = Math.max(minX, Math.min(maxX, x));
        y = Math.max(minY, Math.min(maxY, y));
        pan.setValue({
          x: x - startOffset.current.x,
          y: y - startOffset.current.y,
        });
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        const newX = startOffset.current.x + gestureState.dx;
        const newY = startOffset.current.y + gestureState.dy;
        startOffset.current = { x: newX, y: newY };
        if (!dragged.current && onTap) {
          onTap();
        } else if (onDragEnd) {
          onDragEnd(newX, newY);
        }
      },
    })
  ).current;

  const setPosition = useCallback((x: number, y: number) => {
    startOffset.current = { x, y };
  }, []);

  const getPosition = useCallback(() => startOffset.current, []);

  return { pan, panResponder, setPosition, getPosition };
}

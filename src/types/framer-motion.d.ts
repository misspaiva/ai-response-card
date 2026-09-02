declare module "framer-motion" {
  import * as React from "react";

  export type MotionValue<T> = {
    get(): T;
    set(value: T): void;
    onChange(listener: (value: T) => void): () => void;
    clear(): void;
    destroy(): void;
    getVelocity(): T;
    stop(): void;
  };

  export type AnimationControls = {
    start: (animationDefinitions?: unknown) => Promise<void>;
    stop: () => void;
    set: (key: string, value: unknown) => void;
  };

  export type Transition = {
    duration?: number;
    ease?: number[] | string;
    delay?: number;
    [key: string]: unknown;
  };

  export type Variants = {
    [key: string]: unknown;
  };

  export interface MotionProps {
    animate?: unknown;
    variants?: Variants;
    initial?: unknown;
    exit?: unknown;
    transition?: Transition;
    whileHover?: unknown;
    whileTap?: unknown;
    whileFocus?: unknown;
    whileInView?: unknown;
    onAnimationComplete?: () => void;
    onDrag?: (event: MouseEvent | TouchEvent | PointerEvent, info: unknown) => void;
    onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: unknown) => void;
    onDragStart?: (event: MouseEvent | TouchEvent | PointerEvent, info: unknown) => void;
    onViewportEnter?: () => void;
    onViewportLeave?: () => void;
    style?: React.CSSProperties & { [key: string]: unknown };
    className?: string;
    children?: React.ReactNode;
    [key: string]: unknown;
  }

  export type MotionComponent<T extends keyof JSX.IntrinsicElements> = React.ForwardRefExoticComponent<
    React.PropsWithoutRef<MotionProps & JSX.IntrinsicElements[T]> &
      React.RefAttributes<HTMLElement>
  >;

  export const motion: {
    [K in keyof JSX.IntrinsicElements]: MotionComponent<K>;
  };

  export const AnimatePresence: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<{
      children?: React.ReactNode;
      mode?: "sync" | "wait" | "popLayout";
      initial?: boolean;
      onExitComplete?: () => void;
      custom?: unknown;
    }> &
      React.RefAttributes<HTMLDivElement>
  >;

  export const useAnimation: () => AnimationControls;
  export const useMotionValue: <T>(initial: T) => MotionValue<T>;
  export const useTransform: <T, U>(
    motionValue: MotionValue<T>,
    transform: ((value: T) => U) | [number, number, number, number],
    outputRange?: U[]
  ) => MotionValue<U>;
  export const useSpring: <T>(
    source: MotionValue<T> | T,
    config?: { stiffness?: number; damping?: number; mass?: number }
  ) => MotionValue<T>;
  export const useScroll: () => {
    scrollX: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
  };
  export const useViewportScroll: () => {
    scrollX: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
  };
  export const useTime: () => MotionValue<number>;
  export const useVelocity: <T>(value: MotionValue<T>) => MotionValue<number>;
  export const useMotionTemplate: (...strings: string[]) => MotionValue<string>;
  export const useCycle: <T>(...values: T[]) => (index?: number) => T;
  export const useSprings: <T>(
    count: number,
    items: T[] | ((index: number) => T),
    configs?: Partial<Transition> | ((index: number) => Partial<Transition>)
  ) => MotionValue<T>[];
  export const useTrail: <T>(
    count: number,
    initial: T,
    config?: Partial<Transition>
  ) => MotionValue<T>[];
  export const useTransition: <T>(
    items: T[] | T | null,
    config?: { keys?: (item: T) => string | number; delay?: number; rest?: number; from?: unknown; enter?: unknown; leave?: unknown; update?: unknown; trail?: number }
  ) => {
    items: { key: string | number; value: T; data: unknown }[];
    set: (key: string | number, data: unknown) => void;
  };
  export const useReducedMotion: () => boolean | "always";
  export const useInView: (
    ref: React.RefObject<HTMLElement | null>,
    options?: { once?: boolean; amount?: number | "some" | "all" | string }
  ) => boolean;
  export const useDragControls: () => {
    start: (event: MouseEvent | TouchEvent | PointerEvent) => void;
    cancel: () => void;
    componentTouchId: number | null;
    componentMouseId: number | null;
  };
  export const LayoutGroup: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<{
      children?: React.ReactNode;
      id?: string;
    }> &
      React.RefAttributes<HTMLDivElement>
  >;
  export const Reorder: {
    Group: React.ForwardRefExoticComponent<
      React.PropsWithoutRef<MotionProps & {
        children?: React.ReactNode;
        axis?: "x" | "y";
        values?: unknown[];
        onReorder?: (values: unknown[]) => void;
      }> &
        React.RefAttributes<HTMLDivElement>
    >;
    Item: React.ForwardRefExoticComponent<
      React.PropsWithoutRef<MotionProps & {
        children?: React.ReactNode;
        value?: unknown;
        as?: string;
        id?: string;
      }> &
        React.RefAttributes<HTMLElement>
    >;
  };
  export const m: MotionComponent<"m">;
  export const svg: {
    [K in keyof JSX.IntrinsicElements]: MotionComponent<K>;
  };

  export { createContext as createMotionContext };
}

import { useEffect, useRef, useState } from "react";

export function useCounter(target: number): number {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    frameRef.current = 0;
    const tick = () => {
      frameRef.current++;
      setValue((prev) => {
        if (prev === target) return target;
        const next = Math.round(prev + (target - prev) * 0.15);
        return Math.abs(target - next) < 1 ? target : next;
      });
      if (frameRef.current < 80) {
        requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };
    requestAnimationFrame(tick);
  }, [target]);

  return value;
}

import { type RefObject, useEffect } from "react";

export function useSpotlight(scope: RefObject<HTMLElement | null>, selector: string) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(selector);
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  }, [scope, selector]);
}
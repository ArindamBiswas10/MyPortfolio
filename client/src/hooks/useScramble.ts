import { useEffect, useRef, useState } from "react";

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#$%&*";

export function useScramble(text: string, { stagger = 3, ticks = 6, speed = 35 } = {}) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<number | undefined>(undefined);

  const scramble = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    window.clearInterval(timer.current); // restart cleanly if already running
    let frame = 0;
    const end = text.length * stagger + ticks;

    timer.current = window.setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (!/[a-z]/i.test(ch)) return ch; // keep ~ / _ as they are
            if (frame >= i * stagger + ticks) return ch; // this letter has resolved
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      frame++;
      if (frame > end) {
        window.clearInterval(timer.current);
        setDisplay(text);
      }
    }, speed);
  };

  // stop the timer if the component unmounts mid-animation
  useEffect(() => () => window.clearInterval(timer.current), []);

  return { display, scramble };
}
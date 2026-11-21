"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";

type RevealTag = "div" | "article" | "li" | "section" | "p";

type RevealProps<T extends RevealTag> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "className" | "children">;

export function Reveal<T extends RevealTag = "div">({
  as,
  className,
  children,
  ...rest
}: RevealProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setRevealed(true));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = (as ?? "div") as React.ElementType;
  return (
    <Tag
      {...rest}
      ref={ref}
      className={className}
      data-reveal=""
      data-revealed={revealed ? "" : undefined}
    >
      {children}
    </Tag>
  );
}

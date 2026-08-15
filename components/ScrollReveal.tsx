"use client";
import { useEffect, useRef } from "react";
export default function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: { children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "left"; }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add("visible"), delay); obs.unobserve(el); } }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`${direction === "left" ? "reveal-left" : "reveal"} ${className}`}>{children}</div>;
}

"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { useCapability } from "@/lib/capability";
import { anchorClick } from "@/lib/lenis";
import { gsap, registerGsap } from "@/lib/motion/gsap";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  cursor?: string;
  onNavigate?: () => void;
};

/** Pulls toward the pointer, with the label drifting slightly further than the shell. */
export default function MagneticButton({ href, children, className = "", strength = 0.3, cursor, onNavigate }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inner = useRef<HTMLSpanElement>(null);
  const { finePointer, reducedMotion } = useCapability();

  useEffect(() => {
    const el = ref.current;
    const label = inner.current;
    if (!el || !label || !finePointer || reducedMotion) return;
    registerGsap();
    const o = { duration: 0.5, ease: "power3" };
    const ex = gsap.quickTo(el, "x", o), ey = gsap.quickTo(el, "y", o);
    const lx = gsap.quickTo(label, "x", o), ly = gsap.quickTo(label, "y", o);
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      ex(dx * strength); ey(dy * strength); lx(dx * strength * 0.5); ly(dy * strength * 0.5);
    };
    const leave = () => { ex(0); ey(0); lx(0); ly(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [finePointer, reducedMotion, strength]);

  return (
    <a ref={ref} href={href} className={`btn ${className}`} data-cursor={cursor} onClick={(e) => anchorClick(e, href, onNavigate)}>
      <span ref={inner} className="btn__label">{children}</span>
    </a>
  );
}

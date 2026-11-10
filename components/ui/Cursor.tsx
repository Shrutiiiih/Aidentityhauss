"use client";
import { useEffect, useRef } from "react";
import { useCapability } from "@/lib/capability";
import { gsap, registerGsap } from "@/lib/motion/gsap";

/** A quiet ring that follows the pointer and becomes a labelled disc over [data-cursor] elements. */
export default function Cursor() {
  const { ready, finePointer, reducedMotion } = useCapability();
  const el = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const c = el.current;
    const l = label.current;
    if (!ready || !c || !l || !finePointer || reducedMotion) return;
    registerGsap();
    gsap.set(c, { xPercent: -50, yPercent: -50 });
    const x = gsap.quickTo(c, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(c, "y", { duration: 0.35, ease: "power3" });
    const move = (e: PointerEvent) => { x(e.clientX); y(e.clientY); c.dataset.visible = "true"; };
    const over = (e: PointerEvent) => {
      const t = (e.target as Element).closest<HTMLElement>("[data-cursor]");
      c.dataset.state = t ? "label" : "idle";
      l.textContent = t?.dataset.cursor ?? "";
    };
    const leave = () => { c.dataset.visible = "false"; };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [ready, finePointer, reducedMotion]);

  return (
    <div ref={el} className="cursor" aria-hidden="true" data-state="idle" data-visible="false">
      <span ref={label} className="cursor__label" />
    </div>
  );
}

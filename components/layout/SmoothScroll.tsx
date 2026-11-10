"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { useCapability } from "@/lib/capability";
import { setLenis } from "@/lib/lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";

/** Lenis drives the scroll; GSAP's ticker drives Lenis, so ScrollTrigger stays in sync. Off for reduced motion. */
export default function SmoothScroll() {
  const { ready, reducedMotion } = useCapability();
  useEffect(() => {
    if (!ready || reducedMotion) return;
    registerGsap();
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [ready, reducedMotion]);
  return null;
}

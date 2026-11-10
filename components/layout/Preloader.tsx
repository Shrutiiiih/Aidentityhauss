"use client";
import { useEffect, useRef, useState } from "react";
import { useCapability } from "@/lib/capability";
import { useReady } from "@/lib/ready";
import { AGENCY } from "@/lib/content";
import { gsap, registerGsap, roof } from "@/lib/motion/gsap";
import "./preloader.css";

/** The primary logo rises out of masks (mark first, then wordmark + tagline), then a roofline lifts the curtain. Once per session. */
export default function Preloader() {
  const { ready: capReady, reducedMotion } = useCapability();
  const { setReady } = useReady();
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!capReady) return;
    const seen = sessionStorage.getItem("haus:seen") === "1";
    if (reducedMotion || seen) {
      setReady(true);
      setGone(true);
      return;
    }
    registerGsap();
    document.documentElement.classList.add("is-loading");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("haus:seen", "1");
          document.documentElement.classList.remove("is-loading");
          setGone(true);
        },
      });
      gsap.set(root.current, { clipPath: roof.curtain.full });
      tl.from(".preloader__glow", { autoAlpha: 0, scale: 0.7, duration: 1.4, ease: "power2.out" }, 0)
        .from(".preloader__rise--mark", { yPercent: 115, duration: 1, ease: "expo.out" }, 0.2)
        .from(".preloader__rise--word", { yPercent: 115, duration: 0.9, ease: "expo.out" }, 0.55)
        .addLabel("wipe", "+=0.8")
        .to(".preloader__logo", { yPercent: -40, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, "wipe")
        .to(root.current, { clipPath: roof.curtain.mid, duration: 0.55, ease: "power3.in" }, "wipe")
        .call(() => setReady(true), [], "wipe+=0.35")
        .to(root.current, { clipPath: roof.curtain.gone, duration: 0.7, ease: "power3.out" });
    }, root);
    return () => {
      ctx.revert();
      document.documentElement.classList.remove("is-loading");
    };
  }, [capReady, reducedMotion, setReady]);

  if (gone) return null;

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader__glow" />
      <div className="preloader__logo" role="img" aria-label={`${AGENCY.name} logo`}>
        <div className="preloader__mask">
          <img className="preloader__rise preloader__rise--mark" src="/logo-primary-mark.png" width={1100} height={399} alt="" />
        </div>
        <div className="preloader__mask">
          <img className="preloader__rise preloader__rise--word" src="/logo-primary-word.png" width={1100} height={245} alt="" />
        </div>
      </div>
    </div>
  );
}

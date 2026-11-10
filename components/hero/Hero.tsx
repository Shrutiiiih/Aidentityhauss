"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HERO, CTA } from "@/lib/content";
import { useCapability } from "@/lib/capability";
import { useReady } from "@/lib/ready";
import { anchorClick } from "@/lib/lenis";
import { gsap, registerGsap, ease } from "@/lib/motion/gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import { PhoneIcon } from "@/components/ui/Icons";
import HeroFallback from "./HeroFallback";
import "./hero.css";

function Words({ text }: { text: string }) {
  return <>{text.split(" ").map((w, i, a) => <span key={i}><span className="hero__word"><span className="hero__word-inner">{w}</span></span>{i < a.length - 1 ? " " : null}</span>)}</>;
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const cap = useCapability();
  const { ready } = useReady();
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = root.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useLayoutEffect(() => {
    const el = root.current; if (!el || !cap.ready || cap.reducedMotion) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.set(".hero__word-inner", { yPercent: 118 });
      gsap.set(".js-stage", { autoAlpha: 0, y: 35, scale: .94, rotate: -2 });
      gsap.set(".js-foot", { autoAlpha: 0, y: 24 });
      gsap.set(".hero-art__line, .hero-art__circle", { strokeDasharray: 900, strokeDashoffset: 900 });
      tl.current = gsap.timeline({ paused: true, defaults: { ease: ease.out } })
        .to(".hero__word-inner", { yPercent: 0, duration: 1.15, stagger: .07 }, .05)
        .to(".js-stage", { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 1.2, ease: ease.pop }, .2)
        .to(".hero-art__line, .hero-art__circle", { strokeDashoffset: 0, duration: 1.7, stagger: .04 }, .35)
        .to(".js-foot", { autoAlpha: 1, y: 0, duration: .8 }, .8);
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: .7 };
      gsap.to(".hero__line--solid", { xPercent: -5, ease: "none", scrollTrigger: st });
      gsap.to(".hero__line--ghost", { xPercent: 5, ease: "none", scrollTrigger: st });
      gsap.to(".js-stage", { yPercent: -9, scale: 1.08, ease: "none", scrollTrigger: st });
    }, el);
    return () => { ctx.revert(); tl.current = null; };
  }, [cap.ready, cap.reducedMotion]);
  useEffect(() => { if (ready) tl.current?.play(); }, [ready]);
  return <section id="top" ref={root} className="hero">
    <div className="hero__eyebrow">Independent creative studio <span>—</span> Vadodara / India</div>
    <h1 className="hero__title">
      <span className="hero__line hero__line--solid"><Words text={HERO.line1} /></span>
      <span className="hero__line hero__line--ghost"><Words text={HERO.line2} /></span>
    </h1>
    <div className="hero__stage js-stage" aria-hidden="true"><div className="hero__stage-inner js-stage-scroll"><HeroFallback /></div></div>
    <div className="hero__foot js-foot">
      <p className="hero__sub">{HERO.sub}</p>
      <div className="hero__actions">
        <MagneticButton href={CTA.href} className="btn--lg hero__cta" cursor="Book"><PhoneIcon size={18} /> {CTA.label}</MagneticButton>
        <a className="hero__link" href={HERO.secondary.href} onClick={(e) => anchorClick(e, HERO.secondary.href)}>{HERO.secondary.label} <span>↓</span></a>
      </div>
    </div>
    <div className="hero__index">01 / 06</div>
  </section>;
}

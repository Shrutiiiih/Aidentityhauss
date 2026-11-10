"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { NAV, CTA, PHONE } from "@/lib/content";
import { PhoneIcon } from "@/components/ui/Icons";
import { anchorClick, getLenis } from "@/lib/lenis";
import { gsap, registerGsap, roof } from "@/lib/motion/gsap";
import { useCapability } from "@/lib/capability";
import "./mobile-menu.css";

type Props = { open: boolean; onClose: () => void; active: string };

/** Full-screen panel. A pitched roofline sweeps up, links rise out of masks one after another. */
export default function MobileMenu({ open, onClose, active }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const first = useRef(true);
  const { reducedMotion } = useCapability();

  useLayoutEffect(() => {
    registerGsap();
    const el = panel.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.set(el, { clipPath: roof.coverFromBottom.closed });
      tl.current = gsap
        .timeline({ paused: true, onReverseComplete: () => { el.style.visibility = "hidden"; } })
        .to(el, { clipPath: roof.coverFromBottom.open, duration: reducedMotion ? 0.01 : 0.8, ease: "expo.inOut" })
        .fromTo(".mmenu__inner", { yPercent: 110 }, { yPercent: 0, duration: reducedMotion ? 0.01 : 0.7, ease: "expo.out", stagger: 0.06 }, 0.25)
        .fromTo(".mmenu__foot", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.7);
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    const el = panel.current;
    if (!el || !tl.current) return;
    if (first.current) { first.current = false; if (!open) return; }
    if (open) {
      el.style.visibility = "visible";
      tl.current.timeScale(1).play();
      getLenis()?.stop();
      document.documentElement.style.overflow = "hidden";
      el.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else {
      tl.current.timeScale(1.4).reverse();
      getLenis()?.start();
      document.documentElement.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div id="mobile-menu" ref={panel} className="mmenu" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open} inert={!open}>
      <nav className="mmenu__nav" aria-label="Mobile">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className="mmenu__link" aria-current={active === n.href ? "true" : undefined} onClick={(e) => anchorClick(e, n.href, onClose)}>
            <span className="mmenu__mask"><span className="mmenu__inner">{n.label}</span></span>
          </a>
        ))}
      </nav>
      <div className="mmenu__foot">
        <a href={CTA.href} className="mmenu__cta" onClick={onClose}>
          <PhoneIcon size={20} /> {CTA.label}
        </a>
        <p className="mmenu__phone">{PHONE.display}</p>
      </div>
    </div>
  );
}

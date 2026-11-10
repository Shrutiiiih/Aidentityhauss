"use client";
import { useEffect, useState } from "react";
import { NAV, CTA, AGENCY } from "@/lib/content";
import { anchorClick } from "@/lib/lenis";
import MagneticButton from "@/components/ui/MagneticButton";
import { PhoneIcon } from "@/components/ui/Icons";
import MobileMenu from "./MobileMenu";
import "./nav.css";

export default function Nav() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlights the link for whichever section crosses the middle of the viewport.
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.href.slice(1))).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header className="nav" data-compact={compact} data-open={open}>
        <div className="nav__bar">
          <a className="nav__logo" href="#top" onClick={(e) => anchorClick(e, "#top")} aria-label={`${AGENCY.name}, home`}>
            <img className="nav__logo-mark" src="/logo-icon.png" width={420} height={269} alt="" />
            <span className="nav__logo-text"><span className="nav__logo-ai">AI</span>dentityHaus</span>
          </a>
          <nav className="nav__links" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="nav__link" aria-current={active === n.href ? "true" : undefined} onClick={(e) => anchorClick(e, n.href)}>
                {n.label}
              </a>
            ))}
          </nav>
          <MagneticButton href={CTA.href} className="nav__cta">
            <PhoneIcon size={17} /> {CTA.label}
          </MagneticButton>
          <button className="nav__menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} />
    </>
  );
}

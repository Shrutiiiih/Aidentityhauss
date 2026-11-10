"use client";
import { useEffect, useState } from "react";
import { CTA } from "@/lib/content";
import { PhoneIcon } from "@/components/ui/Icons";
import "./sticky-cta.css";

/** Phone/tablet-portrait CTA, pinned to the thumb. Taps straight to a phone call. Steps aside once the contact section is in view. */
export default function StickyCTA() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setHide(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <a href={CTA.href} className="sticky-cta" data-hide={hide} aria-hidden={hide || undefined} tabIndex={hide ? -1 : undefined}>
      <PhoneIcon size={20} />
      <span>{CTA.label}</span>
    </a>
  );
}

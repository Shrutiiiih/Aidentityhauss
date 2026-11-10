"use client";
import type { ReactNode } from "react";
import { CapabilityProvider } from "@/lib/capability";
import { ReadyProvider } from "@/lib/ready";
import SmoothScroll from "./SmoothScroll";
import Preloader from "./Preloader";
import Nav from "./Nav";
import StickyCTA from "./StickyCTA";
import Cursor from "@/components/ui/Cursor";
import Grain from "@/components/ui/Grain";

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <CapabilityProvider>
      <ReadyProvider>
        <SmoothScroll />
        <a className="skip" href="#main">Skip to content</a>
        <Preloader />
        <Nav />
        <main id="main">{children}</main>
        <StickyCTA />
        <Cursor />
        <Grain />
      </ReadyProvider>
    </CapabilityProvider>
  );
}

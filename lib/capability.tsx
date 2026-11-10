"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Capability = {
  ready: boolean;
  reducedMotion: boolean;
  finePointer: boolean;
  lowPower: boolean;
  webgl: boolean;
};

const initial: Capability = { ready: false, reducedMotion: false, finePointer: false, lowPower: false, webgl: false };
const Ctx = createContext<Capability>(initial);

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Detects once, shares everywhere. Every animation reads from this to degrade gracefully. */
export function CapabilityProvider({ children }: { children: ReactNode }) {
  const [cap, setCap] = useState<Capability>(initial);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fp = window.matchMedia("(hover: hover) and (pointer: fine)");
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const update = () =>
      setCap({
        ready: true,
        reducedMotion: rm.matches,
        finePointer: fp.matches,
        lowPower: (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 2 || !!nav.connection?.saveData,
        webgl: hasWebGL(),
      });
    update();
    rm.addEventListener("change", update);
    return () => rm.removeEventListener("change", update);
  }, []);

  return <Ctx.Provider value={cap}>{children}</Ctx.Provider>;
}

export const useCapability = () => useContext(Ctx);

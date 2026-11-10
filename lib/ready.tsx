"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ReadyCtx = { ready: boolean; setReady: (v: boolean) => void };
const Ctx = createContext<ReadyCtx>({ ready: false, setReady: () => {} });

/** `ready` flips true when the preloader hands over. Entrance choreography keys off it. */
export function ReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (ready) document.documentElement.dataset.ready = "true";
  }, [ready]);
  return <Ctx.Provider value={{ ready, setReady }}>{children}</Ctx.Provider>;
}

export const useReady = () => useContext(Ctx);

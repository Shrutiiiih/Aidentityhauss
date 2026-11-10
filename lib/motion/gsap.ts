import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function registerGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

// One shared vocabulary so every section moves with the same character.
export const ease = {
  out: "expo.out",
  inOut: "power3.inOut",
  pop: "elastic.out(1, 0.65)",
};

// The roofline wipe: a pitched edge that sweeps across a panel. Used by the
// preloader and the mobile menu so the brand motif is also a motion motif.
export const roof = {
  coverFromBottom: {
    closed: "polygon(0% 112%, 50% 100%, 100% 112%, 100% 112%, 0% 112%)",
    open: "polygon(0% 0%, 50% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  curtain: {
    full: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)",
    mid: "polygon(0% 0%, 100% 0%, 100% 55%, 50% 38%, 0% 55%)",
    gone: "polygon(0% 0%, 100% 0%, 100% 0%, 50% 0%, 0% 0%)",
  },
};

export { gsap, ScrollTrigger };

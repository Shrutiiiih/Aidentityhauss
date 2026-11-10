import type Lenis from "lenis";
import type { MouseEvent } from "react";

let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

export function scrollToTarget(target: string | number) {
  if (instance) {
    instance.scrollTo(target, { duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

/** Click handler for in-page anchors: smooth-scrolls and keeps the URL hash in sync. */
export function anchorClick(e: MouseEvent<HTMLAnchorElement>, href: string, after?: () => void) {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  after?.();
  scrollToTarget(href === "#top" ? 0 : href);
  history.replaceState(null, "", href === "#top" ? location.pathname : href);
}

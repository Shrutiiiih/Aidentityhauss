export const AGENCY = { name: "AIdentityHaus" };
export const PHONE = { display: "+91 96622 70555", tel: "+919662270555" };
// Every "Schedule a Discovery Call" button dials this number.
export const CTA = { label: "Schedule a Discovery Call", href: `tel:${PHONE.tel}` };
export const NAV = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Our Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;
export const HERO = {
  line1: "Ideas with",
  line2: "a point of view.",
  sub: "AIdentityHaus is an independent creative studio for brands that want to be understood, remembered and chosen.",
  secondary: { label: "Explore our work", href: "#work" },
};

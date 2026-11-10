/** Anchor target for sections not built yet, so navigation and scroll-spy already work end to end. */
export default function Stub({ id, title, bg, dark }: { id: string; title: string; bg: string; dark?: boolean }) {
  return (
    <section id={id} style={{ background: bg, color: dark ? "var(--paper)" : "var(--ink)", minHeight: "90svh", display: "grid", alignItems: "center", padding: "0 var(--gutter)" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2.6rem, 9vw, 9rem)", lineHeight: 0.9, letterSpacing: "-0.035em", maxWidth: "12ch" }}>{title}</h2>
    </section>
  );
}

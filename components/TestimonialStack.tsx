"use client";

import { useState } from "react";

const testimonials = [
  {
    quote: "Brooo. Your work on the website is looking niiiice! thank you for helping.",
    client: "PMV Owner",
    project: "PMV Meme — Web3 Project",
  },
  {
    quote: "Fouad i did check very good job!!!! Start Looks good.",
    client: "Amit Margi",
    project: "Top Cleaning",
  },
  {
    quote: "Just heard from the leaders and they're genuinely impressed with what we pulled off. That's a big win guys! Honestly, thank you!",
    client: "Obanijesu",
    project: "TEDxOsogbo — Event Platform",
  },
  {
    quote: "They were fast, strategic, and technical without the usual agency fluff. The end result was clean, clear, and conversion-focused.",
    client: "Adebayo",
    project: "Software Delivery",
  },
];

export default function TestimonialStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;

  const goTo = (index: number) => setActiveIndex((index + total) % total);
  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);

  return (
    <div className="testimonial-outer" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
      <div>
        <span className="tag" style={{ marginBottom: "0.75rem" }}>Client Stories</span>
        <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "0.5rem" }}>Don&apos;t take our word for it</h2>
        <div className="section-divider" style={{ marginBottom: "1.5rem" }} />
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "#666", lineHeight: 1.75, maxWidth: 520 }}>
          We focus on the outcomes that matter: better clarity, better conversion, and software your team can trust.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.75rem" }} className="testimonial-nav">
          <button type="button" onClick={prev} aria-label="Previous testimonial" style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", background: "white", color: "#0d3b52", cursor: "pointer", fontSize: "1.1rem" }}>
            ←
          </button>
          <button type="button" onClick={next} aria-label="Next testimonial" style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", background: "white", color: "#0d3b52", cursor: "pointer", fontSize: "1.1rem" }}>
            →
          </button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#06b6d4", letterSpacing: "1px" }}>
            {String(activeIndex + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div style={{ position: "relative", minHeight: 360 }}>
        {testimonials.map((t, index) => {
          const offset = (index - activeIndex + total) % total;
          const isActive = index === activeIndex;
          const translateY = offset * 24;
          const scale = isActive ? 1 : 0.96;
          const opacity = isActive ? 1 : 0.52;
          const zIndex = total - offset;

          return (
            <div
              key={t.client}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translateY(${translateY}px) scale(${scale})`,
                width: "100%",
                maxWidth: 420,
                background: isActive ? "white" : "#eef1f3",
                border: isActive ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(0,0,0,0.04)",
                padding: "2rem",
                boxShadow: isActive ? "0 24px 50px rgba(13,59,82,0.08)" : "0 16px 24px rgba(0,0,0,0.04)",
                opacity,
                zIndex,
                transition: "all 0.35s ease",
              }}
            >
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#06b6d4", fontSize: "0.85rem" }}>★</span>)}
              </div>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.92rem", color: "#444", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "1rem" }}>
                <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.85rem", color: "#0d3b52" }}>{t.client}</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#06b6d4", letterSpacing: "0.5px" }}>{t.project}</p>
              </div>
            </div>
          );
        })}

        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.5rem" }}>
          {testimonials.map((item, index) => (
            <button
              key={item.client}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: "none",
                background: index === activeIndex ? "#06b6d4" : "rgba(13,59,82,0.18)",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonial-outer { grid-template-columns: 1fr !important; }
          .testimonial-nav { justify-content: center; }
        }
      `}</style>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Why Choose GroviaTech Solutions | Our USP & Core Values",
  description: "Why GroviaTech Solutions? We build secure software, think business-first, and deliver at speed — with transparency at every step.",
};

const values = [
  { icon: "🔒", title: "Integrity", desc: "We never oversell, never overcharge, and never disappear after launch. What we commit to, we deliver." },
  { icon: "⚡", title: "Technical Excellence", desc: "Certified engineers, modern stacks, security-first builds. We hold ourselves to a high technical bar because your business depends on it." },
  { icon: "👁️", title: "Transparency", desc: "You know what we're building, why we're building it, and what it costs — before we start. No surprises." },
  { icon: "📈", title: "Client Success", desc: "Your growth is our metric. We measure success in conversions, uptime, and business outcomes — not lines of code." },
  { icon: "🌱", title: "Continuous Growth", desc: "Technology moves fast. We invest in our team's certifications, skills, and tools so you always get up-to-date expertise." },
  { icon: "🤝", title: "Partnership Mindset", desc: "We're not a vendor. We're a technical partner — one that understands your business and grows with you over time." },
];

const differentiators = [
  { title: "Software + Security in One Team", desc: "Rare in the agency world. The same team that builds your software also reviews it for security vulnerabilities. No handoffs, no gaps, no blind spots.", stat: "100%", statLabel: "In-house delivery" },
  { title: "Certified & Experienced", desc: "Our team holds Google Cybersecurity and ISC2 CC certifications — and has the practical project history to back it up.", stat: "3", statLabel: "Certified professionals" },
  { title: "Business-First, Not Tech-First", desc: "We ask what business problem you're solving before we write a line of code. Technology is always a means, never an end.", stat: "10+", statLabel: "SMEs served" },
  { title: "Fast Delivery, No Cutting Corners", desc: "We have systems and processes that let us ship quickly without sacrificing quality, security, or maintainability.", stat: "7–14", statLabel: "Days avg. delivery" },
];

const objections = [
  { q: "Aren't you just a small agency?", a: "Yes — and that's an advantage. You get direct access to senior engineers, faster decisions, and people who genuinely care about your project. No junior staff being trained on your budget." },
  { q: "Why Lagos? Can you serve international clients?", a: "Absolutely. We serve clients in the US, UK, UAE, and globally. Lagos gives us cost efficiency we pass to you — the quality is international." },
  { q: "Can you handle both software and security?", a: "That's exactly our USP. Our team is cross-trained — our security experts understand development, and our developers understand security principles. It's rare and it matters." },
  { q: "What if I only need one service?", a: "That's fine. Whether it's just a website, just a pen test, or a full build-and-secure engagement — we scope to your needs." },
];

export default function WhyUsPage() {
  return (
    <>
      <section style={{ padding: "6rem 2rem 5rem", background: "#0d3b52", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 500, height: 500, background: "radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <Link href="/about" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", letterSpacing: "1px", display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>← BACK TO ABOUT</Link>
            <span className="tag" style={{ marginBottom: "1rem" }}>Why Choose Us</span>
            <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.5rem,5vw,4rem)", color: "white", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: 700 }}>
              Why businesses choose <span style={{ color: "#06b6d4" }}>GroviaTech Solutions</span>
            </h1>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: 580, lineHeight: 1.75 }}>
              Our USP is simple: we are the only tech agency where the same team that builds your software also secures it — from day one.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: "6rem 2rem", background: "#f8f8f6" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>Core Values</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "0.75rem" }}>What we stand for</h2>
            <div className="section-divider" style={{ marginBottom: "3.5rem" }} />
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 70}>
                <div style={{ background: "white", padding: "2.25rem", border: "1px solid rgba(0,0,0,0.06)", height: "100%" }} className="card-hover glow-hover">
                  <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "1rem" }}>{v.icon}</span>
                  <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.1rem", color: "#0d3b52", marginBottom: "0.75rem" }}>{v.title}</h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#666", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section style={{ padding: "6rem 2rem", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>Our Edge</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "3.5rem" }}>What makes us different</h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {differentiators.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 80}>
                <div style={{ padding: "2.5rem", background: "#f8f8f6", border: "1px solid rgba(0,0,0,0.06)", display: "flex", gap: "2rem", alignItems: "flex-start" }} className="card-hover">
                  <div style={{ flexShrink: 0, textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2rem", color: "#06b6d4" }}>{d.stat}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#999", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{d.statLabel}</div>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1rem", color: "#0d3b52", marginBottom: "0.6rem" }}>{d.title}</h3>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#666", lineHeight: 1.7 }}>{d.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <style>{`@media(max-width:700px){section > div > div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>

      {/* Objection handling */}
      <section style={{ padding: "6rem 2rem", background: "#081f2d" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>Common Questions</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "white", marginBottom: "3rem" }}>We&apos;ve heard the doubts</h2>
          </ScrollReveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {objections.map((o, i) => (
              <ScrollReveal key={o.q} delay={i * 80}>
                <div style={{ padding: "2rem", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                  <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, color: "white", fontSize: "1rem", marginBottom: "0.75rem" }}>{o.q}</h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{o.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#f8f8f6", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.5rem", color: "#0d3b52", marginBottom: "1rem" }}>Convinced? Let&apos;s talk.</h2>
            <p style={{ fontFamily: "var(--font-inter)", color: "#666", marginBottom: "2rem" }}>Get a free audit and see what we can build for you.</p>
            <Link href="/contact" className="btn-primary"><span>Get a Free Audit</span></Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

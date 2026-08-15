import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Services | Software Development & Cybersecurity | GroviaTech Solutions",
  description: "GroviaTech Solutions offers two core service stacks: Software Development and Cybersecurity. Built and secured by the same team.",
};

export default function ServicesPage() {
  return (
    <>
      <section style={{ padding: "6rem 2rem 5rem", background: "#f8f8f6", position: "relative", overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "1rem" }}>Our Services</span>
            <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.5rem,5vw,4rem)", color: "#0d3b52", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: 700 }}>
              Two stacks. One team. Zero handoffs.
            </h1>
            <div className="section-divider" style={{ marginBottom: "1.5rem" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.05rem", color: "#666", maxWidth: 560, lineHeight: 1.75 }}>
              We build software and secure it — with the same team. No agency-to-agency handoffs, no gaps in accountability.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "2rem" }}>
          {[
            { icon: "💻", color: "#0d3b52", title: "Software Development", desc: "From websites to AI — we build every layer of your digital presence. 8 capability areas, one delivery team.", href: "/services/software-development", subs: ["Website Development","Mobile Apps","Game Development","SEO","Security Testing","ML / AI Solutions","DevOps","Quality Assurance"] },
            { icon: "🛡️", color: "#06b6d4", title: "Cybersecurity", desc: "We find your vulnerabilities before attackers do. Certified professionals, proven methodology, clear reports.", href: "/services/cybersecurity", subs: ["Penetration Testing","AppSec","APISec","Mobile Security","Malware Removal","Security Hardening","Security Audit","Monitoring"] },
          ].map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 120}>
              <div style={{ border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden", height: "100%" }} className="card-hover">
                <div style={{ background: s.color, padding: "3rem", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", bottom: -20, right: -20, fontSize: "6rem", opacity: 0.08 }}>{s.icon}</div>
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1.5rem" }}>{s.icon}</span>
                  <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.8rem", color: "white", marginBottom: "0.75rem" }}>{s.title}</h2>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
                <div style={{ padding: "2.5rem", background: "#f8f8f6" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                    {s.subs.map(sub => (
                      <span key={sub} style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#444", background: "white", border: "1px solid rgba(0,0,0,0.08)", padding: "0.3rem 0.7rem" }}>{sub}</span>
                    ))}
                  </div>
                  <Link href={s.href} className="btn-primary"><span>Explore {s.title} →</span></Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section style={{ padding: "6rem 2rem", background: "#f8f8f6" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>Our Approach</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "3rem" }}>How we work</h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🤝", title: "Discovery First", desc: "We spend time understanding your business before touching any tools or code." },
              { icon: "📐", title: "Scoped Clearly", desc: "Every project is scoped in writing. No ambiguity, no scope creep, no surprises." },
              { icon: "🔁", title: "Iterative Delivery", desc: "You see the work as it progresses. Regular previews and checkpoints throughout." },
              { icon: "🔒", title: "Security Reviewed", desc: "Every software project gets a security review before launch. Always included." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div style={{ background: "white", padding: "2rem", border: "1px solid rgba(0,0,0,0.06)" }} className="card-hover">
                  <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "1rem" }}>{item.icon}</span>
                  <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1rem", color: "#0d3b52", marginBottom: "0.6rem" }}>{item.title}</h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: "#666", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#0d3b52", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.5rem", color: "white", marginBottom: "1rem" }}>Not sure where to start?</h2>
            <p style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>Book a free audit — we&apos;ll tell you exactly what you need.</p>
            <Link href="/contact" className="btn-primary btn-primary-cyan"><span>Get a Free Audit</span></Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

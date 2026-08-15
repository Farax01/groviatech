import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "About GroviaTech Solutions | Tech Agency Built on Trust & Expertise",
  description: "Learn about GroviaTech Solutions — our story, mission, team, and values. A tech solutions agency built by engineers who understand both software and security.",
};

const team = [
  { name: "Fouad Aransi", role: "CEO, Founder & Head of IT", bio: "Computer Science graduate with ISC2 cybersecurity certification and offensive security experience. Founded GroviaTech Solutions to give SMEs access to the technical depth usually reserved for large enterprises.", certs: ["ISC2 CC", "CCNA In Progress"], initials: "FA", color: "#0d3b52" },
  { name: "Gabriel Odusanya", role: "Head of Security & Lead Cybersecurity Expert", bio: "Experienced cybersecurity professional specialising in application security, penetration testing, and vulnerability assessments. Certified and battle-tested across multiple industries.", certs: ["Google Cybersecurity", "ISC2 CC"], initials: "GO", color: "#0f2d3f" },
  { name: "Feranmi Akinsanya", role: "Head of Software & Lead Software Engineer", bio: "Full-stack engineer with deep expertise in modern web and mobile development. Leads the software development team with a focus on clean architecture, performance, and maintainability.", certs: ["Google Cybersecurity"], initials: "FA2", color: "#4a7c8c" },
];

const timeline = [
  { year: "2023", title: "Founded", desc: "GroviaTech Solutions was founded in Lagos with a simple premise: SMEs deserve enterprise-grade technical support." },
  { year: "2024", title: "First 5 Projects", desc: "Delivered our first five websites across Web3, real estate, and local service industries — all with security reviews included." },
  { year: "2025", title: "Cybersecurity Practice", desc: "Launched our dedicated cybersecurity practice, adding penetration testing, AppSec, and security audits as core services." },
  { year: "2026", title: "Growing Globally", desc: "Now serving clients in Nigeria, US, UK and UAE with a growing team and expanding portfolio across software and security." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: "6rem 2rem 5rem", background: "#081f2d", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(6,182,212,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "1rem" }}>About Us</span>
            <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.5rem,5vw,4rem)", color: "white", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: 700 }}>
              Built by engineers who understand both <span style={{ color: "#06b6d4" }}>software and security.</span>
            </h1>
            <div style={{ width: 52, height: 3, background: "linear-gradient(90deg,#06b6d4,#4a7c8c)", borderRadius: 2, marginBottom: "1.5rem" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.1rem", color: "rgba(255,255,255,0.65)", maxWidth: 600, lineHeight: 1.75, marginBottom: "2rem" }}>
              GroviaTech Solutions was founded on a gap in the market — most agencies build software without thinking about security, and most security firms don&apos;t build software. We do both.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/about/why-us" className="btn-primary btn-primary-cyan"><span>Why Choose Us</span></Link>
              <Link href="/contact" className="btn-outline btn-outline-white">Work With Us</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: "6rem 2rem", background: "#f8f8f6" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "2rem" }}>
            {[
              { label: "Our Mission", icon: "🎯", text: "We help founders, startups, and enterprises solve real problems through software and security — with technical depth, honest communication, and measurable results." },
              { label: "Our Vision", icon: "🌍", text: "To be the most trusted technology partner for SMEs globally — building the systems, security, and digital presence that help businesses grow beyond borders." },
              { label: "Why We Were Founded", icon: "💡", text: "Too many businesses were being underserved — paying inflated prices for insecure, underperforming software. GroviaTech Solutions was founded to close that gap, starting in Lagos." },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 100}>
                <div style={{ background: "white", padding: "2.5rem", border: "1px solid rgba(0,0,0,0.06)", height: "100%" }} className="card-hover">
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>{item.icon}</span>
                  <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.2rem", color: "#0d3b52", marginBottom: "1rem" }}>{item.label}</h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "#666", lineHeight: 1.75 }}>{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "6rem 2rem", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>Our Team</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "0.75rem" }}>The people behind the work</h2>
            <div className="section-divider" style={{ marginBottom: "1rem" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "#666", maxWidth: 560, marginBottom: "3.5rem" }}>
              Our team holds certifications from Google and ISC2, and brings practical hands-on experience across software and security domains.
            </p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "2rem" }}>
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 100}>
                <div style={{ background: "#f8f8f6", border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }} className="card-hover">
                  <div style={{ height: 120, background: `linear-gradient(135deg, ${member.color}, #06b6d4)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.5rem", color: "rgba(255,255,255,0.25)" }}>{member.initials.replace("2","")}</span>
                  </div>
                  <div style={{ padding: "2rem" }}>
                    <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.1rem", color: "#0d3b52", marginBottom: "0.25rem" }}>{member.name}</h3>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#06b6d4", letterSpacing: "0.5px", marginBottom: "1rem" }}>{member.role}</p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#666", lineHeight: 1.7, marginBottom: "1.25rem" }}>{member.bio}</p>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {member.certs.map(c => <span key={c} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)", padding: "0.2rem 0.5rem", letterSpacing: "0.5px" }}>{c}</span>)}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "6rem 2rem", background: "#081f2d" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>Our Journey</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "white", marginBottom: "3rem" }}>How we got here</h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "0" }}>
            {timeline.map((t, i) => (
              <ScrollReveal key={t.year} delay={i * 100}>
                <div style={{ padding: "2rem", borderLeft: i === 0 ? "none" : "none", borderTop: "2px solid rgba(6,182,212,0.3)", position: "relative", paddingTop: "2.5rem" }}>
                  <div style={{ position: "absolute", top: -8, left: 0, width: 14, height: 14, borderRadius: "50%", background: "#06b6d4", border: "3px solid #081f2d" }} />
                  <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2rem", color: "#06b6d4", display: "block", marginBottom: "0.5rem" }}>{t.year}</span>
                  <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "1rem", color: "white", marginBottom: "0.75rem" }}>{t.title}</h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{t.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 2rem", background: "#f8f8f6", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.5rem", color: "#0d3b52", marginBottom: "1rem" }}>Let&apos;s work together</h2>
            <p style={{ fontFamily: "var(--font-inter)", color: "#666", marginBottom: "2rem" }}>Whether you need software built or systems secured — we&apos;re ready.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary"><span>Start a Project</span></Link>
              <Link href="/about/why-us" className="btn-outline">Why Choose Us</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

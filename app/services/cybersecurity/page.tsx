import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Cybersecurity Services | AppSec, APISec, Pentesting | GroviaTech Solutions",
  description: "GroviaTech Solutions offers penetration testing, application security, API security, and mobile security for SMEs globally. ISC2-certified team based in Lagos.",
};

const subServices = [
  { icon: "🔓", title: "Penetration Testing", desc: "We simulate real-world attacks on your systems to find vulnerabilities before malicious actors do. Full report with severity rankings and remediation steps delivered at the end.", tags: ["Web Pentest", "Network Pentest", "Social Engineering", "Report Included"], from: "From $1,500" },
  { icon: "📱", title: "Mobile Security (MobileSec)", desc: "iOS and Android app security testing. We review your mobile application for insecure data storage, weak authentication, API exposure, and common mobile vulnerabilities.", tags: ["iOS Security", "Android Security", "OWASP Mobile", "API Exposure"], from: "From $1,200" },
  { icon: "🌐", title: "Application Security (AppSec)", desc: "Comprehensive security review of your web application. From authentication flows to business logic flaws — we go beyond automated scanners.", tags: ["OWASP Top 10", "Auth Testing", "Business Logic", "Input Validation"], from: "From $1,000" },
  { icon: "🔌", title: "API Security (APISec)", desc: "APIs are the most targeted attack surface in modern software. We test your API endpoints for broken auth, data exposure, injection flaws, and rate limiting gaps.", tags: ["REST APIs", "GraphQL", "Auth Testing", "OWASP API Top 10"], from: "From $800" },
  { icon: "🦠", title: "Malware Analysis & Removal", desc: "If you suspect or have confirmed a breach, we investigate, remove malicious code, restore your systems, and harden everything to prevent recurrence.", tags: ["Incident Response", "Malware Removal", "Forensics", "Hardening"], from: "Custom Quote" },
  { icon: "🧱", title: "Security Hardening", desc: "Systematic lockdown of your attack surface — server configuration, admin panel protection, rate limiting, file permissions, dependency audits, and WAF setup.", tags: ["Server Hardening", "WAF Setup", "Dependency Audit", "SSL/TLS"], from: "From $500" },
  { icon: "📋", title: "Security Audit & Compliance Review", desc: "A structured security assessment mapped to industry frameworks. We identify gaps in your security posture and give you a clear roadmap to close them.", tags: ["OWASP", "ISO 27001 Gap", "Risk Assessment", "Roadmap"], from: "From $1,000" },
  { icon: "📡", title: "Ongoing Security Monitoring", desc: "Monthly security scans, vulnerability alerts, uptime monitoring, and priority incident response. Know the moment something changes in your threat landscape.", tags: ["Monthly Scans", "Uptime Alerts", "Incident Response", "Reporting"], from: "From $500/mo" },
];

const stats = [
  { value: "95%", label: "of breaches caused by known, fixable vulnerabilities" },
  { value: "43%", label: "of cyberattacks target small businesses" },
  { value: "60%", label: "of SMBs close within 6 months of a major breach" },
  { value: "$200K", label: "average cost of a small business breach" },
];

export default function CybersecurityPage() {
  return (
    <>
      <section style={{ padding: "6rem 2rem 5rem", background: "#081f2d", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(6,182,212,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.06) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 600, height: 600, background: "radial-gradient(circle, rgba(6,182,212,0.1), transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <Link href="/services" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", letterSpacing: "1px", marginBottom: "2rem", display: "inline-block" }}>← ALL SERVICES</Link>
            <span className="tag" style={{ marginBottom: "1rem" }}>Cybersecurity</span>
            <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.5rem,5vw,4rem)", color: "white", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: 700 }}>
              Your vulnerabilities exist. <span style={{ color: "#06b6d4" }}>We find them first.</span>
            </h1>
            <div style={{ width: 52, height: 3, background: "linear-gradient(90deg,#06b6d4,#4a7c8c)", borderRadius: 2, marginBottom: "1.5rem" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", maxWidth: 580, lineHeight: 1.75, marginBottom: "2rem" }}>
              ISC2-certified and Google-trained cybersecurity professionals. We test your software the way attackers would — and hand you the fix.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["ISC2 CC Certified", "Google Cybersecurity Certified", "OWASP Methodology", "Practical Experience"].map(c => (
                <span key={c} style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)", padding: "0.3rem 0.75rem", letterSpacing: "0.5px" }}>{c}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why it matters */}
      <section style={{ padding: "5rem 2rem", background: "#0d3b52" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1px", background: "rgba(255,255,255,0.08)" }}>
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 80}>
                <div style={{ padding: "2.5rem", background: "#0d3b52", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.5rem", color: "#06b6d4", marginBottom: "0.5rem" }}>{s.value}</div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "6rem 2rem", background: "#f8f8f6" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>What We Offer</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "3rem" }}>Full-spectrum security services</h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem" }}>
            {subServices.map((s, i) => (
              <ScrollReveal key={s.title} delay={(i % 3) * 80}>
                <div style={{ background: "white", padding: "2rem", border: "1px solid rgba(0,0,0,0.06)", height: "100%", display: "flex", flexDirection: "column" }} className="card-hover glow-hover">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "1.8rem" }}>{s.icon}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)", padding: "0.2rem 0.5rem", whiteSpace: "nowrap" }}>{s.from}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1rem", color: "#0d3b52", marginBottom: "0.75rem" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: "#666", lineHeight: 1.7, marginBottom: "1.25rem", flex: 1 }}>{s.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {s.tags.map(t => <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#888", border: "1px solid rgba(0,0,0,0.1)", padding: "0.2rem 0.45rem" }}>{t}</span>)}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section style={{ padding: "6rem 2rem", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>Deliverables</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "3rem" }}>What you receive</h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.5rem" }}>
            {[
              { num: "01", title: "Full Vulnerability Report", desc: "Every issue found, categorised by severity (Critical / High / Medium / Low), with screenshots and technical evidence." },
              { num: "02", title: "Business Impact Summary", desc: "Plain-English explanation of what each vulnerability means for your business and your customers." },
              { num: "03", title: "Prioritised Fix Roadmap", desc: "Issues ranked by impact so you fix what matters most first — not just what's easiest." },
              { num: "04", title: "Remediation Support", desc: "We can fix what we find, or hand off to your team with step-by-step instructions. Your choice." },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={i * 80}>
                <div style={{ padding: "2.5rem", background: "#f8f8f6", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "3rem", color: "rgba(6,182,212,0.2)", display: "block", marginBottom: "1rem" }}>{item.num}</span>
                  <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1rem", color: "#0d3b52", marginBottom: "0.75rem" }}>{item.title}</h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#666", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#081f2d", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.5rem", color: "white", marginBottom: "1rem" }}>Don&apos;t wait for a breach.</h2>
            <p style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>Book a security audit today. We find the holes before anyone else does.</p>
            <Link href="/contact" className="btn-primary btn-primary-cyan"><span>Book a Security Audit</span></Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

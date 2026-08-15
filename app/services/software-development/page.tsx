import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Software Development Services | Web, Mobile, AI & DevOps | GroviaTech Solutions",
  description: "GroviaTech Solutions offers full-stack software development — websites, mobile apps, ML/AI solutions, SEO, DevOps, QA and more. Built fast, built to last.",
};

const subServices = [
  { icon: "🌐", title: "Website Development", desc: "Fast, conversion-optimised websites for businesses of any size. From simple brochure sites to complex web applications. Built with Next.js, React, and modern frameworks.", tags: ["Next.js", "React", "WordPress", "E-Commerce"], from: "From $800" },
  { icon: "📱", title: "Mobile App Development", desc: "Cross-platform and native mobile apps for iOS and Android. We build apps that are fast, secure, and genuinely useful to your users.", tags: ["React Native", "Flutter", "iOS", "Android"], from: "Custom Quote" },
  { icon: "🎮", title: "Game Development", desc: "Web-based and mobile game development. From simple browser games to interactive experiences for marketing, education, or entertainment.", tags: ["Unity", "Web Games", "HTML5", "Canvas"], from: "Custom Quote" },
  { icon: "🔍", title: "SEO Services", desc: "Technical SEO, on-page optimisation, and content strategy that drives organic traffic and improves search rankings — built into every site we deliver.", tags: ["Technical SEO", "On-Page", "Core Web Vitals", "Schema"], from: "Custom Quote" },
  { icon: "🔐", title: "Security & Vulnerability Testing", desc: "Software-layer security testing, code reviews for vulnerabilities, OWASP compliance checks, and security hardening during development.", tags: ["OWASP", "Code Review", "Secure SDLC", "Auth Testing"], from: "From $500" },
  { icon: "🤖", title: "Machine Learning & AI Solutions", desc: "Custom ML models, AI integrations, LLM-powered tools, and data pipelines. We make AI practical and affordable for growing businesses.", tags: ["Python", "TensorFlow", "LLM APIs", "Data Pipeline"], from: "Custom Quote" },
  { icon: "⚙️", title: "DevOps & Infrastructure", desc: "CI/CD pipelines, cloud infrastructure setup, containerisation, monitoring, and deployment automation. We make sure your software runs reliably at scale.", tags: ["Docker", "CI/CD", "AWS/GCP", "Kubernetes"], from: "Custom Quote" },
  { icon: "✅", title: "Quality Assurance", desc: "Manual and automated testing for web and mobile applications. We catch bugs before your users do — with structured QA plans and regression testing.", tags: ["Automated Testing", "Manual QA", "Jest", "Cypress"], from: "Custom Quote" },
];

const process = [
  { step: "01", title: "Discovery & Scoping", desc: "One call to understand your goals, constraints, and success metrics. We propose a scope — no ambiguity." },
  { step: "02", title: "Architecture & Planning", desc: "We map the technical architecture, pick the right stack, and plan the build timeline before writing any code." },
  { step: "03", title: "Development Sprints", desc: "Iterative development with regular previews. You see progress weekly — no disappearing acts." },
  { step: "04", title: "Security Review", desc: "Before launch, our security team reviews the build for vulnerabilities. Included on every project." },
  { step: "05", title: "Launch & Handoff", desc: "Deployed, monitored, and handed over with documentation. Optional ongoing maintenance available." },
];

export default function SoftwareDevPage() {
  return (
    <>
      <section style={{ padding: "6rem 2rem 5rem", background: "#0d3b52", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(6,182,212,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <Link href="/services" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", letterSpacing: "1px", marginBottom: "2rem", display: "inline-block" }}>← ALL SERVICES</Link>
            <span className="tag" style={{ marginBottom: "1rem" }}>Software Development</span>
            <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.5rem,5vw,4rem)", color: "white", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: 700 }}>
              Software that works, <span style={{ color: "#06b6d4" }}>secured from the start.</span>
            </h1>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", maxWidth: 580, lineHeight: 1.75 }}>
              From websites to AI solutions — we build every layer of your digital presence with performance, security, and business outcomes in mind.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Sub-services */}
      <section style={{ padding: "6rem 2rem", background: "#f8f8f6" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>What We Build</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "3rem" }}>8 capabilities. One team.</h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "1.5rem" }}>
            {subServices.map((s, i) => (
              <ScrollReveal key={s.title} delay={(i % 3) * 80}>
                <div style={{ background: "white", padding: "2rem", border: "1px solid rgba(0,0,0,0.06)", height: "100%", display: "flex", flexDirection: "column" }} className="card-hover glow-hover">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "2rem" }}>{s.icon}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)", padding: "0.2rem 0.5rem", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{s.from}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1rem", color: "#0d3b52", marginBottom: "0.75rem" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: "#666", lineHeight: 1.7, marginBottom: "1.25rem", flex: 1 }}>{s.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {s.tags.map(t => <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#888", border: "1px solid rgba(0,0,0,0.1)", padding: "0.2rem 0.45rem", letterSpacing: "0.3px" }}>{t}</span>)}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "6rem 2rem", background: "#081f2d" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>Our Process</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "white", marginBottom: "3rem" }}>How we deliver</h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "0" }}>
            {process.map((p, i) => (
              <ScrollReveal key={p.step} delay={i * 80}>
                <div style={{ padding: "2rem", borderTop: "2px solid rgba(6,182,212,0.25)", paddingTop: "2.5rem", position: "relative" }}>
                  <div style={{ position: "absolute", top: -8, left: 0, width: 14, height: 14, borderRadius: "50%", background: "#06b6d4", border: "3px solid #081f2d" }} />
                  <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.5rem", color: "rgba(6,182,212,0.2)", display: "block", marginBottom: "0.75rem" }}>{p.step}</span>
                  <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, color: "white", fontSize: "0.95rem", marginBottom: "0.6rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 2rem", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>FAQ</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "3rem" }}>Common questions</h2>
          </ScrollReveal>
          {[
            { q: "How long does a website take?", a: "Simple sites: 7–10 days. Medium complexity: 2–3 weeks. Web applications and custom builds: scoped per project. Timeline starts after content and feedback are provided." },
            { q: "Do you do ongoing maintenance?", a: "Yes. All our packages include a maintenance option — covering updates, security patches, uptime monitoring, and content changes. See pricing on our contact page." },
            { q: "Can you work with my existing codebase?", a: "Yes. We regularly take over existing projects, do code audits, and improve or extend what's already built." },
            { q: "Do I need to provide content?", a: "Ideally yes — you know your business best. But we can help with structure, copy direction, and guidance. Full copywriting is available as an add-on." },
          ].map((f, i) => (
            <ScrollReveal key={f.q} delay={i * 60}>
              <div style={{ padding: "1.75rem", background: "#f8f8f6", border: "1px solid rgba(0,0,0,0.06)", marginBottom: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, color: "#0d3b52", fontSize: "0.95rem", marginBottom: "0.6rem" }}>{f.q}</h3>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#666", lineHeight: 1.7 }}>{f.a}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#0d3b52", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.5rem", color: "white", marginBottom: "1rem" }}>Ready to build?</h2>
            <p style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>Tell us what you need. We&apos;ll scope it and get back within 24 hours.</p>
            <Link href="/contact" className="btn-primary btn-primary-cyan"><span>Start Your Project</span></Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

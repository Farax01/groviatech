import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Portfolio | Web & Cybersecurity Projects | GroviaTech Solutions",
  description: "GroviaTech Solutions portfolio — real client projects and cybersecurity case studies. See our work across software development and security.",
};

const projects = [
  { title: "Elan by Crelivio", type: "Web Platform", url: "https://elan.crelivio.com", initials: "EL", color: "#0d3b52", desc: "A polished web platform built for Crelivio's flagship product line. Focused on clean UX, conversion-optimised layout, and performance across all devices.", tags: ["Next.js", "React", "Performance", "CRO"], outcome: "Delivered a fast, professional platform that elevated the Crelivio brand online." },
  { title: "Margi Marketing", type: "Marketing Agency", url: "https://margimarketing.com", initials: "MM", color: "#0f2d3f", desc: "A full agency website for a marketing firm. Built to demonstrate the agency's own design credibility while converting leads effectively.", tags: ["Next.js", "React", "Lead Gen", "SEO"], outcome: "Clean, trust-building site that positions the agency as a premium choice in their market." },
  { title: "TEDxOsogbo", type: "Event Platform", url: "https://tedxosogbo.com.ng", initials: "TX", color: "#4a7c8c", desc: "Major contributor to the official TEDxOsogbo event platform. Built to handle event information, speaker showcases, and community engagement at scale.", tags: ["Web Development", "Event Platform", "Community", "Performance"], outcome: "Leaders described the result as genuinely impressive. A high-visibility platform delivered on time." },
  { title: "PMV Meme", type: "Web3 / Meme Coin", url: "https://pmvmeme.com", initials: "PM", color: "#06b6d4", desc: "Full-featured Solana meme coin site with live DexScreener price stats, canvas-based meme generator, browser mini-game, wallet integration, and tokenomics display.", tags: ["Solana", "Web3", "DexScreener API", "Canvas"], outcome: "Complete Web3 experience with multiple engagement hooks — community adoption within days of launch." },
  { title: "TC Janitorial", type: "Local Business", url: "https://tc-janitorial.com", initials: "TC", color: "#0d3b52", desc: "Professional website for a commercial cleaning service. Built for trust, clarity, and easy contact — positioned to win local search.", tags: ["WordPress", "Local SEO", "LiteSpeed", "CRO"], outcome: "Positioned TC Janitorial as the premium local cleaning provider with a mobile-first, fast-loading site." },
];

const caseStudies = [
  { author: "Gabriel Odusanya", role: "Head of Security", title: "Web Application Penetration Test — E-Commerce Platform", date: "Coming Soon", desc: "A comprehensive penetration test of a Nigerian e-commerce platform. Identified critical authentication bypass, IDOR vulnerabilities, and exposed admin endpoints. Full remediation roadmap delivered.", tags: ["Pentesting", "OWASP Top 10", "IDOR", "Auth Testing"], url: "#", placeholder: true },
  { author: "Gabriel Odusanya", role: "Head of Security", title: "API Security Audit — FinTech Startup", date: "Coming Soon", desc: "APISec audit of a fintech startup's payment API. Discovered broken object level authorisation (BOLA), mass assignment flaws, and insufficient rate limiting across critical endpoints.", tags: ["APISec", "BOLA", "FinTech", "Rate Limiting"], url: "#", placeholder: true },
  { author: "Abdulmalik Adebayo", role: "Cybersecurity Analyst", title: "Mobile Application Security Assessment — Android App", date: "Coming Soon", desc: "Security assessment of an Android application for a logistics company. Found insecure data storage, hardcoded credentials, and man-in-the-middle attack vectors.", tags: ["MobileSec", "Android", "OWASP Mobile", "Data Storage"], url: "#", placeholder: true },
  { author: "Abdulmalik Adebayo", role: "Cybersecurity Analyst", title: "Infrastructure Vulnerability Assessment — SME Network", date: "Coming Soon", desc: "Network and infrastructure vulnerability assessment for a small business. Identified unpatched services, weak password policies, and exposed RDP — all remediated within two weeks.", tags: ["Infrastructure", "Network Security", "Vulnerability Scan", "Remediation"], url: "#", placeholder: true },
];

export default function PortfolioPage() {
  return (
    <>
      <section style={{ padding: "6rem 2rem 5rem", background: "#081f2d", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(6,182,212,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "1rem" }}>Our Work</span>
            <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.5rem,5vw,4rem)", color: "white", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: 700 }}>
              Projects built to <span style={{ color: "#06b6d4" }}>perform and protect.</span>
            </h1>
            <div style={{ width: 52, height: 3, background: "linear-gradient(90deg,#06b6d4,#4a7c8c)", borderRadius: 2, marginBottom: "1.5rem" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", maxWidth: 560, lineHeight: 1.75 }}>
              Real client projects and documented cybersecurity case studies — with credit given to the engineers who did the work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects */}
      <section style={{ padding: "6rem 2rem", background: "#f8f8f6" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>Client Projects</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "3rem" }}>Live projects</h2>
          </ScrollReveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {projects.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 80}>
                <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden", display: "grid", gridTemplateColumns: "280px 1fr" }} className="card-hover">
                  <div style={{ background: `linear-gradient(135deg, ${p.color}, #06b6d4)`, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, position: "relative" }}>
                    <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "3.5rem", color: "rgba(255,255,255,0.15)" }}>{p.initials}</span>
                    <span style={{ position: "absolute", top: 12, left: 12, fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.2)", padding: "0.2rem 0.5rem", letterSpacing: "1px", textTransform: "uppercase" }}>{p.type}</span>
                  </div>
                  <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                        <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.3rem", color: "#0d3b52" }}>{p.title}</h3>
                        <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)", padding: "0.3rem 0.75rem", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" }}>VISIT SITE →</a>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                        {p.tags.map(t => <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#888", border: "1px solid rgba(0,0,0,0.1)", padding: "0.2rem 0.5rem" }}>{t}</span>)}
                      </div>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "#555", lineHeight: 1.75, marginBottom: "1.25rem" }}>{p.desc}</p>
                    </div>
                    <div style={{ borderLeft: "3px solid #06b6d4", paddingLeft: "1rem" }}>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#06b6d4", letterSpacing: "1px", marginBottom: "0.3rem" }}>OUTCOME</p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: "#666" }}>{p.outcome}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:700px){.port-card{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Case Studies */}
      <section style={{ padding: "6rem 2rem", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>Cybersecurity Case Studies</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "0.75rem" }}>Security work — credited to the engineers</h2>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", color: "#666", maxWidth: 580, marginBottom: "3rem", lineHeight: 1.7 }}>These case studies document security assessments conducted by our team. Articles are being published — links will be updated when available.</p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "1.5rem" }}>
            {caseStudies.map((cs, i) => (
              <ScrollReveal key={cs.title} delay={i * 80}>
                <div style={{ background: "#f8f8f6", border: "1px solid rgba(0,0,0,0.06)", padding: "2rem", height: "100%", display: "flex", flexDirection: "column", position: "relative" }} className="card-hover">
                  {cs.placeholder && <span style={{ position: "absolute", top: 12, right: 12, fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#999", border: "1px solid rgba(0,0,0,0.1)", padding: "0.2rem 0.5rem", letterSpacing: "0.5px" }}>ARTICLE PENDING</span>}
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1.25rem" }}>
                    <div style={{ width: 40, height: 40, background: "#0d3b52", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-grotesk)", fontWeight: 700, color: "white", fontSize: "0.85rem", flexShrink: 0 }}>{cs.author.split(" ").map(n => n[0]).join("")}</div>
                    <div>
                      <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.85rem", color: "#0d3b52" }}>{cs.author}</p>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#06b6d4", letterSpacing: "0.5px" }}>{cs.role}</p>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1rem", color: "#0d3b52", marginBottom: "0.75rem", lineHeight: 1.4 }}>{cs.title}</h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: "#666", lineHeight: 1.7, marginBottom: "1.25rem", flex: 1 }}>{cs.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                    {cs.tags.map(t => <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)", padding: "0.2rem 0.45rem" }}>{t}</span>)}
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#aaa", letterSpacing: "0.5px" }}>Article link coming soon</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#0d3b52", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.5rem", color: "white", marginBottom: "1rem" }}>Want to be on this list?</h2>
            <p style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>Let&apos;s build something worth showing off.</p>
            <Link href="/contact" className="btn-primary btn-primary-cyan"><span>Start a Project</span></Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

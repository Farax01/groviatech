import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Counter from "@/components/Counter";

export const metadata: Metadata = {
  title: "GroviaTech Solutions | Tech Solutions Agency | Software & Cybersecurity",
  description: "GroviaTech Solutions builds secure software and defends businesses against cyber threats. Software development and cybersecurity for SMEs globally — based in Lagos.",
};

const stats = [
  { end: 10, suffix: "+", label: "Projects Delivered" },
  { end: 5, suffix: "", label: "Industries Served" },
  { end: 3, suffix: "", label: "Countries Active" },
  { end: 100, suffix: "%", label: "Client Satisfaction" },
];

const services = [
  { icon: "💻", title: "Software Development", desc: "From websites to mobile apps, AI solutions and DevOps — we build the software that powers your business.", sub: ["Website Development", "Mobile Apps", "ML/AI Solutions", "DevOps & QA"], href: "/services/software-development", color: "#0d3b52" },
  { icon: "🛡️", title: "Cybersecurity", desc: "We find your vulnerabilities before attackers do. AppSec, APISec, penetration testing and more.", sub: ["Penetration Testing", "AppSec & APISec", "Mobile Security", "Vulnerability Audits"], href: "/services/cybersecurity", color: "#06b6d4" },
];

const projects = [
  { title: "Elan by Crelivio", type: "Web Platform", url: "https://elan.crelivio.com", initials: "EL", color: "#0d3b52" },
  { title: "Margi Marketing", type: "Marketing Agency", url: "https://margimarketing.com", initials: "MM", color: "#0f2d3f" },
  { title: "TEDxOsogbo", type: "Event Platform", url: "https://tedxosogbo.com.ng", initials: "TX", color: "#4a7c8c" },
  { title: "PMV Meme", type: "Web3 / Meme Coin", url: "https://pmvmeme.com", initials: "PM", color: "#06b6d4" },
];

const whyUs = [
  { icon: "🔒", title: "Built Secure From Day One", desc: "Every piece of software we ship comes with security baked in — not bolted on afterwards. Our cybersecurity team reviews every build." },
  { icon: "🧠", title: "Business-First Thinking", desc: "We ask what you're trying to achieve, then build the right solution. Technology is a tool — business outcomes are the goal." },
  { icon: "⚡", title: "Fast Without Cutting Corners", desc: "We deliver at speed because we have systems, not because we skip steps. Quality and timelines aren't a trade-off with us." },
  { icon: "🌍", title: "Global Standards, Local Rates", desc: "Lagos-based, internationally competitive. You get the technical depth of a tier-1 agency at pricing that works for growing SMEs." },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: "#081f2d", position: "relative", overflow: "hidden", padding: "8rem 2rem 5rem" }}>
        {/* Grid bg */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(6,182,212,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.05) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Glow */}
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "0%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,59,82,0.4), transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 780 }}>
            <span className="tag" style={{ color: "#06b6d4", marginBottom: "1.5rem" }}>Tech Solutions Agency · Lagos, Nigeria</span>
            <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.6rem,6vw,4.8rem)", color: "white", lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-1px" }}>
              Build it right.<br />
              <span style={{ color: "#06b6d4" }}>Secure it tight.</span><br />
              Grow via Technical Solutions.
            </h1>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.1rem", color: "rgba(255,255,255,0.65)", maxWidth: 580, lineHeight: 1.75, marginBottom: "2.5rem" }}>
              GroviaTech Solutions delivers software development and cybersecurity for SMEs globally — the only agency where what we build, we also secure.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary btn-primary-cyan"><span>Get a Free Audit</span></Link>
              <Link href="/services" className="btn-outline btn-outline-white">Our Services</Link>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "3rem", marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
              {stats.map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.2rem", color: "#06b6d4" }}>
                    <Counter end={s.end} suffix={s.suffix} />
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: "#0d3b52", padding: "0.85rem 0", overflow: "hidden" }}>
        <div className="marquee-track">
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{ display: "flex", gap: "3rem", paddingRight: "3rem", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", letterSpacing: "2px", whiteSpace: "nowrap" }}>
              <span>SOFTWARE DEVELOPMENT</span><span style={{ color: "#06b6d4" }}>✦</span>
              <span>CYBERSECURITY</span><span style={{ color: "#06b6d4" }}>✦</span>
              <span>PENETRATION TESTING</span><span style={{ color: "#06b6d4" }}>✦</span>
              <span>MOBILE APPS</span><span style={{ color: "#06b6d4" }}>✦</span>
              <span>AI SOLUTIONS</span><span style={{ color: "#06b6d4" }}>✦</span>
              <span>DEVOPS</span><span style={{ color: "#06b6d4" }}>✦</span>
              <span>WEB DEVELOPMENT</span><span style={{ color: "#06b6d4" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section style={{ padding: "7rem 2rem", background: "#f8f8f6" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>What We Do</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "1rem" }}>Two stacks. One mission.</h2>
            <div className="section-divider" style={{ marginBottom: "1rem" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.05rem", color: "#666", maxWidth: 600, marginBottom: "3.5rem" }}>Build it. Secure it. Scale it. We cover the full technical lifecycle of your business — from first line of code to hardened production.</p>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "2rem" }}>
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 120}>
                <Link href={s.href} style={{ display: "block", textDecoration: "none", background: "white", border: "1px solid rgba(0,0,0,0.06)", padding: "3rem", transition: "all 0.3s", position: "relative", overflow: "hidden" }}
                  className="card-hover glow-hover">
                  <div style={{ width: 56, height: 56, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", marginBottom: "2rem" }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.4rem", color: "#0d3b52", marginBottom: "0.75rem" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "#666", lineHeight: 1.7, marginBottom: "1.5rem" }}>{s.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                    {s.sub.map(t => <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)", padding: "0.3rem 0.6rem", letterSpacing: "0.5px" }}>{t}</span>)}
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#06b6d4", letterSpacing: "1px" }}>EXPLORE → </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ padding: "7rem 2rem", background: "#081f2d" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <ScrollReveal>
              <span className="tag" style={{ marginBottom: "0.75rem" }}>Why GroviaTech</span>
              <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "white", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                The only agency where what we build, <span style={{ color: "#06b6d4" }}>we also secure.</span>
              </h2>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "2rem" }}>
                Most agencies hand you a website and disappear. We hand you a website, run a security audit on it, and stay to make sure it performs. That's the GroviaTech difference.
              </p>
              <Link href="/about/why-us" className="btn-primary btn-primary-cyan"><span>Why Choose Us</span></Link>
            </ScrollReveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              {whyUs.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 80}>
                  <div style={{ padding: "1.75rem", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", transition: "border-color 0.3s" }} className="glow-hover">
                    <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "1rem" }}>{item.icon}</span>
                    <h4 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, color: "white", fontSize: "0.95rem", marginBottom: "0.6rem" }}>{item.title}</h4>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){section > div > div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── PORTFOLIO PREVIEW ── */}
      <section style={{ padding: "7rem 2rem", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span className="tag" style={{ marginBottom: "0.75rem" }}>Our Work</span>
                <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "0.5rem" }}>Projects that convert</h2>
                <div className="section-divider" />
              </div>
              <Link href="/portfolio" className="btn-outline" style={{ fontSize: "0.82rem", padding: "0.6rem 1.4rem" }}>View All Projects</Link>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem" }}>
            {projects.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 80}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", background: "#f8f8f6", border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }} className="card-hover">
                  <div style={{ height: 160, background: `linear-gradient(135deg, ${p.color}, #06b6d4)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.5rem", color: "rgba(255,255,255,0.2)" }}>{p.initials}</span>
                    <span style={{ position: "absolute", top: 12, left: 12, fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.2)", padding: "0.2rem 0.5rem", letterSpacing: "1px", textTransform: "uppercase" }}>{p.type}</span>
                  </div>
                  <div style={{ padding: "1.25rem 1.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "1rem", color: "#0d3b52", marginBottom: "0.4rem" }}>{p.title}</h3>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#06b6d4", letterSpacing: "0.5px" }}>Visit site →</span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL PREVIEW ── */}
      <section style={{ padding: "7rem 2rem", background: "#f8f8f6" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>Client Stories</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "0.5rem" }}>Don&apos;t take our word for it</h2>
            <div className="section-divider" style={{ marginBottom: "3.5rem" }} />
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
            {[
              { quote: "Brooo. Your work on the website is looking niiiice! thank you for helping. I want to send you some SOL for this task.", client: "PMV Client", project: "PMV Meme — Web3 Project" },
              { quote: "Fouad i did check very good job!!!! Start Looks good.", client: "Anonymous Client", project: "Website Development" },
              { quote: "Just heard from the leaders and they're genuinely impressed with what we pulled off. That's a big win guys! Honestly, thank you both.", client: "Iufe", project: "TEDxOsogbo — Event Platform" },
            ].map((t, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div style={{ background: "white", padding: "2rem", border: "1px solid rgba(0,0,0,0.06)" }} className="card-hover">
                  <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#06b6d4", fontSize: "0.85rem" }}>★</span>)}
                  </div>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "#444", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
                  <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "1rem" }}>
                    <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.85rem", color: "#0d3b52" }}>{t.client}</p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#06b6d4", letterSpacing: "0.5px" }}>{t.project}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div style={{ textAlign: "center" }}>
              <Link href="/success-stories" className="btn-outline" style={{ fontSize: "0.85rem" }}>Read All Success Stories</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "7rem 2rem", background: "#0d3b52", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(6,182,212,0.12), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "1rem" }}>Ready to Start?</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "white", marginBottom: "1rem", lineHeight: 1.2 }}>
              Stop losing customers to a website that doesn&apos;t work.
            </h2>
            <p style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", marginBottom: "2.5rem", lineHeight: 1.7 }}>
              Get a free clarity audit — we&apos;ll analyse your tech stack and tell you exactly what to fix first.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary btn-primary-cyan"><span>Book a Free Audit</span></Link>
              <Link href="/portfolio" className="btn-outline btn-outline-white">See Our Work</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

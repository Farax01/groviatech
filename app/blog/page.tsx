import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Bug, CheckCircle, Code, Globe, Lock, Search, Settings, Shield, Smartphone } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Blog & Insights | Tech, Security & Growth | GroviaTech Solutions",
  description: "GroviaTech Solutions blog — insights on software development, cybersecurity, Web3, and growth strategy for founders and SMEs.",
};

const xPosts = [
  { url: "https://x.com/groviatech/status/2017290987417063776", preview: "Case Study: How we turned a confusing homepage into a conversion machine. If your site has traffic but no sales, the problem is almost never the traffic. Thread 🧵", date: "Aug 2026", likes: 124, replies: 43 },
];

const topics = [
  { icon: Globe, title: "Software Development", desc: "Modern stacks, architecture decisions, and lessons from real client builds." },
  { icon: Shield, title: "Cybersecurity", desc: "Vulnerability walkthroughs, hardening guides, and security for SMEs." },
  { icon: Search, title: "Growth & CRO", desc: "How to turn traffic into customers — conversion strategy for founders." },
  { icon: Lock, title: "Web3 & Blockchain", desc: "Building and securing decentralised applications and token projects." },
];

export default function BlogPage() {
  return (
    <>
      <section style={{ padding: "6rem 2rem 5rem", background: "#f8f8f6", position: "relative", overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "1rem" }}>Blog & Insights</span>
            <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.5rem,5vw,4rem)", color: "#0d3b52", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: 600 }}>
              Learn while you build.
            </h1>
            <div className="section-divider" style={{ marginBottom: "1.5rem" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.05rem", color: "#666", maxWidth: 520, lineHeight: 1.75 }}>
              Frameworks, case studies, and honest insights from our team. No gatekeeping — we share what actually works.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Topics */}
      <section style={{ padding: "5rem 2rem", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>Topics</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "3rem" }}>What we write about</h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.5rem", alignItems: "stretch" }}>
            {topics.map((t, i) => {
              const Icon = t.icon;
              return (
                <ScrollReveal key={t.title} delay={i * 80}>
                  <div style={{ padding: "2rem", background: "#f8f8f6", border: "1px solid rgba(0,0,0,0.06)", height: "100%", display: "flex", flexDirection: "column" }} className="card-hover">
                    <span style={{ display: "block", marginBottom: "1rem" }}><Icon size={28} color="#06b6d4" /></span>
                    <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1rem", color: "#0d3b52", marginBottom: "0.6rem" }}>{t.title}</h3>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: "#666", lineHeight: 1.7 }}>{t.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* X Case Studies */}
      <section style={{ padding: "5rem 2rem", background: "#f8f8f6" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>X Case Studies</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3b52", marginBottom: "3rem" }}>Documented on X</h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "1.5rem", maxWidth: 800 }}>
            {xPosts.map((post, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "1.5rem", transition: "all 0.3s" }} className="card-hover glow-hover">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#0d3b52", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-grotesk)", fontWeight: 700, color: "white", fontSize: "0.85rem" }}>GT</div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.85rem", color: "#1a1a1a" }}>GroviaTech Solutions</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#06b6d4"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                        </div>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#888" }}>@groviatech</span>
                      </div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#666"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </div>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "#222", lineHeight: 1.7, marginBottom: "1rem" }}>{post.preview}</p>
                  <div style={{ display: "flex", gap: "1rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#888" }}>♥ {post.likes}</span>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#888" }}>💬 {post.replies}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#aaa", marginLeft: "auto" }}>{post.date}</span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={100}>
              <div style={{ background: "white", border: "2px dashed rgba(0,0,0,0.1)", borderRadius: 12, padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 200 }}>
                <span style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>✍️</span>
                <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, color: "#0d3b52", fontSize: "0.9rem", marginBottom: "0.5rem" }}>More threads coming</p>
                <a href="https://x.com/groviatech" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#06b6d4", textDecoration: "none" }}>Follow @groviatech →</a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#081f2d" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "0.75rem" }}>Articles Coming</span>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "white", marginBottom: "1rem" }}>Deep-dive articles in progress</h2>
            <p style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "2rem" }}>We&apos;re converting our best LinkedIn posts, X threads, and cybersecurity case studies into full articles. Follow us to know when they drop.</p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="https://x.com/groviatech" target="_blank" rel="noopener noreferrer" className="btn-primary btn-primary-cyan"><span>Follow on X</span></a>
              <a href="https://www.linkedin.com/company/groviatech-solutions/" target="_blank" rel="noopener noreferrer" className="btn-outline btn-outline-white">LinkedIn</a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["Building secure Next.js apps from scratch", "OWASP Top 10 explained for founders", "How to scope a web project without regrets", "Why your website isn't converting (and how to fix it)"].map((title, i) => (
                <div key={title} style={{ padding: "1.25rem 1.5rem", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>{title}</p>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)", padding: "0.2rem 0.5rem", whiteSpace: "nowrap" }}>COMING SOON</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
        <style>{`@media(max-width:768px){section > div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
      </section>
    </>
  );
}

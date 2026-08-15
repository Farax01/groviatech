import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Client Success Stories | GroviaTech Solutions",
  description: "Real feedback from real clients. See what founders, project leads, and businesses say about working with GroviaTech Solutions.",
};

const testimonials = [
  { quote: "Brooo. Your work on the website is looking niiiice! thank you for helping. I want to send you some SOL for this task.", client: "PMV Client", context: "Web3 / Meme Coin Project", project: "PMV Meme (pmvmeme.com)", detail: "Reached out after seeing the completed PMV meme coin site — impressed enough to offer a crypto tip on the spot.", stars: 5, type: "whatsapp" },
  { quote: "Fouad i did check very good job!!!! Start Looks good.", client: "Client", context: "Website Development", project: "Website Delivery", detail: "Sent immediately after reviewing their completed website delivery. Short, direct, and satisfied.", stars: 5, type: "whatsapp" },
  { quote: "Just heard from the leaders and they're genuinely impressed with what we pulled off. That's a big win guys! Honestly, thank you both. I know how packed your schedules are, and the fact that you still showed up means a lot.", client: "Iufe", context: "TEDxOsogbo Event Team", project: "TEDxOsogbo (tedxosogbo.com.ng)", detail: "Message from the TEDxOsogbo project lead after the team reviewed the finished platform. The 'leaders' refer to the TEDx chapter leadership.", stars: 5, type: "whatsapp" },
  { quote: "Good job. Working.", client: "Anonymous Client", context: "Website QA & Delivery", project: "Website Project", detail: "Concise post-delivery confirmation — the site was checked and approved to go live.", stars: 5, type: "whatsapp" },
  { quote: "Our website has all the links you need — pmvmeme.com", client: "@PumpMindVirus", context: "Public X (Twitter) Post", project: "PMV Meme (pmvmeme.com)", detail: "The PMV project team publicly promoted the GroviaTech-built website to their crypto community on X.", stars: 5, type: "twitter" },
];

export default function SuccessStoriesPage() {
  return (
    <>
      <section style={{ padding: "6rem 2rem 5rem", background: "#0d3b52", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 500, height: 500, background: "radial-gradient(circle, rgba(6,182,212,0.1), transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "1rem" }}>Success Stories</span>
            <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.5rem,5vw,4rem)", color: "white", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: 700 }}>
              Real clients. <span style={{ color: "#06b6d4" }}>Real feedback.</span>
            </h1>
            <div style={{ width: 52, height: 3, background: "linear-gradient(90deg,#06b6d4,#4a7c8c)", borderRadius: 2, marginBottom: "1.5rem" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", maxWidth: 540, lineHeight: 1.75 }}>
              These are unedited messages and posts from clients after we delivered their projects. No polished PR quotes — just what people actually said.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: "6rem 2rem", background: "#f8f8f6" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }} className="card-hover">
                <div style={{ display: "grid", gridTemplateColumns: "4px 1fr", height: "100%" }}>
                  <div style={{ background: i % 2 === 0 ? "#06b6d4" : "#0d3b52" }} />
                  <div style={{ padding: "2.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
                      <div>
                        <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.75rem" }}>
                          {[...Array(t.stars)].map((_, j) => <span key={j} style={{ color: "#06b6d4", fontSize: "1rem" }}>★</span>)}
                        </div>
                        <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, color: "#0d3b52", fontSize: "0.95rem", marginBottom: "0.2rem" }}>{t.client}</p>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#06b6d4", letterSpacing: "0.5px" }}>{t.context}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#aaa", border: "1px solid rgba(0,0,0,0.08)", padding: "0.25rem 0.6rem", letterSpacing: "0.5px", textTransform: "uppercase" }}>{t.type === "twitter" ? "X / Twitter" : "WhatsApp"}</span>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#aaa", marginTop: "0.5rem" }}>{t.project}</p>
                      </div>
                    </div>
                    <blockquote style={{ fontFamily: "var(--font-inter)", fontSize: "1.1rem", color: "#222", lineHeight: 1.75, fontStyle: "italic", marginBottom: "1.25rem", borderLeft: "none", padding: 0 }}>
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#888", lineHeight: 1.6, borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "1rem" }}>{t.detail}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#081f2d" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {[{ val: "5/5", label: "Average client rating" }, { val: "10+", label: "Completed projects" }, { val: "100%", label: "Would recommend" }, { val: "24h", label: "Response time" }].map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 80}>
              <div style={{ padding: "2.5rem", background: "#081f2d", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.5rem", color: "#06b6d4", marginBottom: "0.4rem" }}>{s.val}</div>
                <div style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section style={{ padding: "5rem 2rem", background: "#f8f8f6", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.5rem", color: "#0d3b52", marginBottom: "1rem" }}>Ready to be our next success story?</h2>
            <p style={{ fontFamily: "var(--font-inter)", color: "#666", marginBottom: "2rem" }}>Get started with a free audit. No commitment, no pressure.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary"><span>Start a Project</span></Link>
              <Link href="/portfolio" className="btn-outline">See Our Work</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

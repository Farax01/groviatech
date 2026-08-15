import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Website Audits & CRO | Fix Your Conversion Rate | GroviaTech",
  description: "GroviaTech audits your website for conversion leaks, UX friction, and messaging gaps. Get a prioritised fix roadmap and start converting more visitors into customers.",
};

export default function AuditsCROPage() {
  return (
    <>
      <section className="py-24 bg-off-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#0d3b52 1px,transparent 1px),linear-gradient(90deg,#0d3b52 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <Link href="/services" className="font-mono text-xs text-mid-gray hover:text-navy transition-colors inline-flex items-center gap-2 mb-8">← Back to Services</Link>
            <p className="tag mb-4">Audits & CRO</p>
            <h1 className="font-grotesk font-bold text-5xl md:text-6xl text-charcoal mb-6 leading-tight max-w-3xl">
              You have traffic. You&apos;re not getting <span className="gradient-text">customers. We fix that.</span>
            </h1>
            <div className="section-divider mb-8" />
            <p className="font-inter text-xl text-mid-gray max-w-2xl leading-relaxed">
              We find the exact places your website loses visitors and tell you what to fix first —
              with a prioritised roadmap ranked by impact, not difficulty.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="tag mb-3">What We Audit</p>
            <h2 className="font-grotesk font-bold text-4xl text-charcoal mb-4">A full breakdown of what&apos;s broken.</h2>
            <div className="section-divider mb-12" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "💬", title: "Messaging Clarity", desc: "Is your headline clear? Does a first-time visitor immediately understand what you do and why they should care? We test and rewrite until the answer is yes." },
              { icon: "🎯", title: "Conversion Funnel", desc: "We map every path a visitor can take on your site and identify where they drop off, get confused, or give up. Every friction point documented." },
              { icon: "📱", title: "UX & Navigation", desc: "Is your site easy to use? We review layout, CTA placement, form design, and mobile usability — the things that make or break conversions." },
              { icon: "⚡", title: "Speed & Performance", desc: "Every second of load time costs you conversions. We audit Core Web Vitals, asset sizes, and server response — and tell you exactly what to fix." },
              { icon: "🔍", title: "SEO Gaps", desc: "Are you getting found for the right searches? We audit your on-page SEO, meta structure, and keyword targeting to identify missed opportunities." },
              { icon: "📊", title: "Analytics & Tracking", desc: "Are you even measuring the right things? We review your analytics setup and ensure you have the data to make good decisions going forward." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="flex gap-5 p-6 bg-off-white border border-black/[0.06] card-hover">
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-grotesk font-bold text-lg text-charcoal mb-2">{item.title}</h3>
                    <p className="font-inter text-sm text-mid-gray leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="font-mono text-xs text-cyan-pop tracking-widest mb-3 uppercase">What You Receive</p>
            <h2 className="font-grotesk font-bold text-4xl text-white mb-12">Your audit deliverable.</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: "01", title: "Full Audit Document", desc: "Every issue found, categorised by area (UX, copy, speed, SEO, conversion), with screenshots and specific examples." },
              { number: "02", title: "Priority Fix Roadmap", desc: "Issues ranked by conversion impact — so you fix the most valuable things first, not just the easiest." },
              { number: "03", title: "Implementation Option", desc: "We can implement the fixes ourselves or hand off the roadmap to your team. Either way, you leave with a clear plan." },
            ].map((item, i) => (
              <ScrollReveal key={item.number} delay={i * 100}>
                <div className="p-8 border border-white/10 hover:border-cyan-pop/50 transition-colors duration-300">
                  <span className="font-grotesk font-bold text-5xl text-white/10 block mb-4">{item.number}</span>
                  <h3 className="font-grotesk font-semibold text-white mb-3">{item.title}</h3>
                  <p className="font-inter text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-off-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-grotesk font-bold text-4xl text-charcoal mb-4">Start with a free clarity audit.</h2>
            <p className="font-inter text-mid-gray mb-8">We&apos;ll give you 3 things to fix on your site — for free — before you spend a penny.</p>
            <Link href="/contact" className="btn-primary text-base"><span>Get Your Free Audit</span></Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

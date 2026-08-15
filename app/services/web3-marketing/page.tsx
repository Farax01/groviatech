import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Web3 Marketing Agency | Token Launch & Community Growth | GroviaTech",
  description: "Web3 social media marketing, token launch campaigns, and DAO community growth. GroviaTech is a Web3 marketing agency that understands both crypto culture and conversion.",
};

const offerings = [
  { icon: "🐦", title: "Twitter/X Growth Strategy", desc: "Organic community building, content calendars, thread strategy, and engagement systems for Web3 projects that want real traction — not bots." },
  { icon: "🚀", title: "Token Launch Campaigns", desc: "From teaser to launch — we plan and execute the full social media strategy for token launches, IDOs, and NFT drops." },
  { icon: "🏛️", title: "DAO Community Management", desc: "Governance communication, community education, Discord/Telegram strategy, and member engagement frameworks for DAOs." },
  { icon: "📝", title: "Content Strategy", desc: "Educational threads, project updates, market commentary, and narrative building that positions your project as credible and worth watching." },
  { icon: "📊", title: "Campaign Tracking & Analytics", desc: "We track what matters — community growth, engagement rate, conversion from social to on-chain action — and report it clearly." },
  { icon: "🤝", title: "Influencer & KOL Outreach", desc: "Identifying and coordinating with the right crypto KOLs for your project — not mass outreach, but targeted partnerships that convert." },
];

export default function Web3MarketingPage() {
  return (
    <>
      <section className="py-24 bg-off-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#0d3b52 1px,transparent 1px),linear-gradient(90deg,#0d3b52 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <Link href="/services" className="font-mono text-xs text-mid-gray hover:text-navy transition-colors inline-flex items-center gap-2 mb-8">← Back to Services</Link>
            <p className="tag mb-4">Web3 Marketing</p>
            <h1 className="font-grotesk font-bold text-5xl md:text-6xl text-charcoal mb-6 leading-tight max-w-3xl">
              Community growth for projects that are <span className="gradient-text">actually building.</span>
            </h1>
            <div className="section-divider mb-8" />
            <p className="font-inter text-xl text-mid-gray max-w-2xl leading-relaxed">
              We understand crypto culture, tokenomics, and what a real community looks like vs. a farmed one.
              No bots, no fake engagement — just strategy that builds real audiences who convert.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="tag mb-3">Services</p>
            <h2 className="font-grotesk font-bold text-4xl text-charcoal mb-4">What we deliver.</h2>
            <div className="section-divider mb-12" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((o, i) => (
              <ScrollReveal key={o.title} delay={i * 80}>
                <div className="p-6 bg-off-white border border-black/[0.06] card-hover h-full">
                  <span className="text-3xl mb-4 block">{o.icon}</span>
                  <h3 className="font-grotesk font-bold text-lg text-charcoal mb-3">{o.title}</h3>
                  <p className="font-inter text-sm text-mid-gray leading-relaxed">{o.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="font-mono text-xs text-cyan-pop tracking-widest mb-3 uppercase">Our Difference</p>
            <h2 className="font-grotesk font-bold text-4xl text-white mb-6 leading-tight max-w-2xl">
              We speak crypto. We also speak conversion.
            </h2>
            <p className="font-inter text-white/70 leading-relaxed max-w-2xl mb-12">
              Most Web3 marketing agencies are either crypto-native (but don&apos;t understand funnels) or digital marketers (who don&apos;t understand Web3). We sit at the intersection — which is exactly where your project needs to be.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Real Portfolio", desc: "We&apos;ve built for Web3 projects — from Solana meme coins to DeFi interfaces. We understand your audience because we&apos;ve built for them." },
              { title: "No Vanity Metrics", desc: "Follower counts mean nothing. We focus on engagement rate, on-chain conversion, and community quality — metrics that actually matter." },
              { title: "Strategic, Not Tactical", desc: "We don&apos;t just post content. We build the narrative, position your project, and create the conditions for organic growth." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="p-6 border border-white/10 hover:border-cyan-pop/50 transition-colors duration-300">
                  <h3 className="font-grotesk font-semibold text-white mb-3">{item.title}</h3>
                  <p className="font-inter text-sm text-white/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc.replace(/&apos;/g, "'") }} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-off-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-grotesk font-bold text-4xl text-charcoal mb-4">Ready to grow your Web3 project?</h2>
            <p className="font-inter text-mid-gray mb-8">Pricing is custom based on scope and deliverables. Let&apos;s talk.</p>
            <Link href="/contact" className="btn-primary text-base"><span>Get a Custom Quote</span></Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

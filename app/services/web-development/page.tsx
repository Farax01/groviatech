import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Web Development Services | Conversion-Focused Websites from $800",
  description: "GroviaTech builds fast, mobile-first, conversion-focused websites for small and medium businesses. Web development agency serving Lagos, US, UK and UAE. From $800.",
};

const packages = [
  { name: "Starter", tag: "Small Business", price: "$800", period: "one-time", retainer: "$250/mo", features: ["Up to 5 pages", "Mobile responsive", "Basic on-page SEO", "Contact & lead form", "Google Analytics setup", "Fast delivery (7–10 days)", "1 month free support"], highlight: false },
  { name: "Growth", tag: "Medium Business", price: "$1,500", period: "one-time", retainer: "$500/mo", features: ["Up to 10 pages", "CRO best practices built-in", "Advanced SEO structure", "Performance optimisation", "Web3-ready if needed", "Blog/content setup", "Priority delivery (5–7 days)", "3 months free support"], highlight: true },
];

const process = [
  { step: "01", title: "Discovery Call", desc: "We understand your business goals, target audience, and competitors in one focused 30-minute call." },
  { step: "02", title: "Clarity Audit", desc: "If you have an existing site, we audit it first. If not, we map out the architecture and copy direction." },
  { step: "03", title: "Design & Build", desc: "We build fast. You see a live preview within 3–5 days. Real feedback, real iterations." },
  { step: "04", title: "Launch & Handoff", desc: "We launch, set up analytics, and hand you everything you need to manage your site." },
];

const faqs = [
  { q: "How long does it take?", a: "Starter sites are typically delivered in 7–10 days. Growth sites in 5–7 days with priority handling. Timeline starts after you provide content and feedback." },
  { q: "Do I need to provide content?", a: "Ideally yes — you know your business best. But we can help with copy direction, structure, and guidance. Full copywriting is available as an add-on." },
  { q: "What platform do you build on?", a: "We primarily build with Next.js and React for performance and SEO. WordPress is available for clients who want to manage content themselves." },
  { q: "Is the site mobile responsive?", a: "Always. Every site we build is mobile-first by default. We test across devices before delivery." },
  { q: "What does the retainer include?", a: "Monthly maintenance covers content updates, performance monitoring, uptime checks, security patches, and priority support for changes." },
  { q: "Do you do e-commerce?", a: "Yes — e-commerce builds are scoped as Growth tier and above, with pricing depending on catalogue size and integrations needed." },
];

export default function WebDevPage() {
  return (
    <>
      <section className="py-24 bg-off-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#0d3b52 1px,transparent 1px),linear-gradient(90deg,#0d3b52 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <Link href="/services" className="font-mono text-xs text-mid-gray hover:text-navy transition-colors inline-flex items-center gap-2 mb-8">← Back to Services</Link>
            <p className="tag mb-4">Web Development</p>
            <h1 className="font-grotesk font-bold text-5xl md:text-6xl text-charcoal mb-6 leading-tight max-w-3xl">
              Your website should be your best <span className="gradient-text">salesperson.</span>
            </h1>
            <div className="section-divider mb-8" />
            <p className="font-inter text-xl text-mid-gray max-w-2xl leading-relaxed">
              We don&apos;t just build pretty websites. We build fast, clear, conversion-optimised sites that tell
              your story, build trust, and turn visitors into paying customers.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="tag mb-3">What You Get</p>
            <h2 className="font-grotesk font-bold text-4xl text-charcoal mb-4">Built for business, not just beauty.</h2>
            <div className="section-divider mb-12" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: "Performance-Optimised", desc: "Fast load times, compressed assets, and clean code. Google rewards speed — and so do customers." },
              { icon: "📱", title: "Mobile-First Always", desc: "Over 60% of web traffic is mobile. Your site works perfectly on every screen size, guaranteed." },
              { icon: "🔍", title: "SEO-Ready Structure", desc: "Proper headings, meta tags, sitemap, and schema. Built to rank from the moment it launches." },
              { icon: "🎯", title: "Conversion-Focused Layout", desc: "Every section is designed to guide visitors toward one action. No confusion, no friction." },
              { icon: "🛡️", title: "Secure by Default", desc: "SSL, secure forms, and basic hardening included on every project. Security isn't optional." },
              { icon: "📊", title: "Analytics from Day One", desc: "Google Analytics and basic event tracking set up at launch. Know who's visiting and what they do." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="p-6 bg-off-white border border-black/[0.06] card-hover h-full">
                  <span className="text-3xl mb-4 block">{item.icon}</span>
                  <h3 className="font-grotesk font-bold text-lg text-charcoal mb-2">{item.title}</h3>
                  <p className="font-inter text-sm text-mid-gray leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="tag mb-3">Pricing</p>
            <h2 className="font-grotesk font-bold text-4xl text-charcoal mb-4">Clear, honest pricing.</h2>
            <div className="section-divider mb-12" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {packages.map((pkg, i) => (
              <ScrollReveal key={pkg.name} delay={i * 100}>
                <div className={`p-8 border h-full flex flex-col ${pkg.highlight ? "bg-navy border-navy text-white" : "bg-white border-black/[0.06]"}`}>
                  <span className={`font-mono text-[10px] tracking-widest uppercase px-2 py-1 border mb-4 inline-block w-fit ${pkg.highlight ? "border-cyan-pop text-cyan-pop" : "border-steel/30 text-steel"}`}>{pkg.tag}</span>
                  <h3 className={`font-grotesk font-bold text-2xl mb-2 ${pkg.highlight ? "text-white" : "text-charcoal"}`}>{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`font-grotesk font-bold text-3xl ${pkg.highlight ? "text-cyan-pop" : "text-navy"}`}>{pkg.price}</span>
                    <span className={`text-sm ${pkg.highlight ? "text-white/60" : "text-mid-gray"}`}>{pkg.period}</span>
                  </div>
                  <p className={`font-mono text-xs mb-6 ${pkg.highlight ? "text-white/50" : "text-mid-gray"}`}>+ {pkg.retainer} maintenance retainer</p>
                  <ul className="space-y-3 flex-grow mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="text-cyan-pop mt-0.5 flex-shrink-0 text-sm">✓</span>
                        <span className={`font-inter text-sm ${pkg.highlight ? "text-white/80" : "text-mid-gray"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`text-center text-sm font-semibold py-3 px-6 transition-all duration-300 block ${pkg.highlight ? "bg-cyan-pop text-white hover:bg-white hover:text-navy" : "bg-navy text-white hover:bg-cyan-pop"}`}>
                    Get Started
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="font-mono text-xs text-cyan-pop tracking-widest mb-3 uppercase">How We Work</p>
            <h2 className="font-grotesk font-bold text-4xl text-white mb-4">From brief to live — fast.</h2>
            <div className="section-divider mb-12" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <ScrollReveal key={p.step} delay={i * 100}>
                <div className="p-6 border border-white/10 hover:border-cyan-pop/50 transition-colors duration-300">
                  <span className="font-grotesk font-bold text-4xl text-white/10 block mb-4">{p.step}</span>
                  <h3 className="font-grotesk font-semibold text-white mb-3">{p.title}</h3>
                  <p className="font-inter text-sm text-white/60 leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="tag mb-3">FAQ</p>
            <h2 className="font-grotesk font-bold text-4xl text-charcoal mb-4">Common questions.</h2>
            <div className="section-divider mb-12" />
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 60}>
                <div className="p-6 bg-off-white border border-black/[0.06]">
                  <h3 className="font-grotesk font-semibold text-charcoal mb-2">{faq.q}</h3>
                  <p className="font-inter text-sm text-mid-gray leading-relaxed">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-off-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-grotesk font-bold text-4xl text-charcoal mb-4">Ready to get started?</h2>
            <p className="font-inter text-mid-gray mb-8">Fill out the form and we&apos;ll get back to you within 24 hours.</p>
            <Link href="/contact" className="btn-primary text-base"><span>Start Your Project</span></Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

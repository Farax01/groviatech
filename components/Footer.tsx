"use client";
import Link from "next/link";
import Logo from "./Logo";

const serviceLinks = [
  { label: "Software Development", href: "/services/software-development" },
  { label: "Cybersecurity", href: "/services/cybersecurity" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Success Stories", href: "/success-stories" },
];
const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Why Us", href: "/about/why-us" },
  { label: "Blog & Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "#081f2d", color: "white", padding: "5rem 0 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "3rem", paddingBottom: "4rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.2rem" }}>
              <Logo size={32} color="white" />
              <div>
                <div style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, color: "white", fontSize: "0.9rem" }}>GROVIATECH</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.5px" }}>SOLUTIONS</div>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 260, marginBottom: "1.5rem" }}>
              Grow via Technical Solutions. Secure software and cybersecurity for SMEs globally — built in Lagos, trusted worldwide.
            </p>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {[
                { href: "https://x.com/groviatech", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { href: "https://www.linkedin.com/company/groviatech-solutions/", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              ].map(({ href, d }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width: 34, height: 34, border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", transition: "all 0.2s", textDecoration: "none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#06b6d4"; (e.currentTarget as HTMLElement).style.borderColor = "#06b6d4"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
                </a>
              ))}
            </div>
          </div>
          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.75rem", color: "white", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1.2rem" }}>Services</h4>
            {serviceLinks.map(l => (
              <Link key={l.href} href={l.href} style={{ display: "block", fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "0.65rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#06b6d4")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>{l.label}</Link>
            ))}
          </div>
          {/* Company */}
          <div>
            <h4 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.75rem", color: "white", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1.2rem" }}>Company</h4>
            {companyLinks.map(l => (
              <Link key={l.href} href={l.href} style={{ display: "block", fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "0.65rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#06b6d4")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>{l.label}</Link>
            ))}
          </div>
          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.75rem", color: "white", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1.2rem" }}>Get In Touch</h4>
            <a href="mailto:groviatechh@gmail.com" style={{ display: "block", fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#06b6d4", textDecoration: "none", marginBottom: "1rem" }}>groviatechh@gmail.com</a>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: "0.5rem" }}>Lagos, Nigeria</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>Serving: US · UK · UAE · Global</p>
            <div style={{ marginTop: "1.5rem", padding: "1rem", border: "1px solid rgba(6,182,212,0.3)", background: "rgba(6,182,212,0.04)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#06b6d4", letterSpacing: "1px", marginBottom: "0.4rem" }}>FREE AUDIT</p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>Get a free tech audit — no commitment needed.</p>
              <Link href="/contact" style={{ display: "inline-block", marginTop: "0.75rem", fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#06b6d4", textDecoration: "none", fontWeight: 600 }}>Start here →</Link>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ padding: "1.5rem 0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "rgba(255,255,255,0.25)" }}>© {year} GroviaTech Solutions. All rights reserved.</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "rgba(255,255,255,0.25)" }}>Trustworthy · Transparent · Talented</p>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

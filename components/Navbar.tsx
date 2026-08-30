"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const s = {
  nav: (scrolled: boolean): React.CSSProperties => ({ position: "fixed", top: 0, width: "100%", zIndex: 100, background: scrolled ? "rgba(248,248,246,0.97)" : "rgba(248,248,246,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,0,0,0.06)", transition: "all 0.3s ease" }),
  inner: { maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "flex" as const, alignItems: "center" as const, justifyContent: "space-between" as const, height: 72 },
  logoWrap: { display: "flex" as const, alignItems: "center" as const, gap: "0.7rem", textDecoration: "none" as const },
  logoName: { fontFamily: "var(--font-grotesk)", fontWeight: 700, color: "#0d3b52", fontSize: "0.95rem", letterSpacing: "-0.2px" },
  logoTag: { fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#999", letterSpacing: "0.3px", display: "block" },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 24); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { setOpen(false); document.body.style.overflow = ""; }, [pathname]);
  const toggle = () => { setOpen(o => !o); document.body.style.overflow = !open ? "hidden" : ""; };

  return (
    <>
      <nav style={s.nav(scrolled)}>
        <div style={s.inner}>
          <Link href="/" style={s.logoWrap}>
            <Logo size={34} />
            <div><span style={s.logoName}>GROVIATECH</span><span style={s.logoTag}>Trustworthy · Transparent · Talented</span></div>
          </Link>
          {/* Desktop */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hide-mobile">
            {links.map(l => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link key={l.href} href={l.href} style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 500, color: active ? "#0d3b52" : "#555", textDecoration: "none", position: "relative", paddingBottom: 2 }}>
                  {l.label}
                  {active && <span style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 2, background: "#06b6d4" }} />}
                </Link>
              );
            })}
            <Link href="/contact" className="btn-primary" style={{ fontSize: "0.82rem", padding: "0.6rem 1.4rem" }}><span>Get Started</span></Link>
          </div>
          {/* Hamburger */}
          <button onClick={toggle} className="show-mobile" style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ width: 22, height: 2, background: "#1a1a1a", display: "block", transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ width: 22, height: 2, background: "#1a1a1a", display: "block", opacity: open ? 0 : 1, transition: "all 0.3s" }} />
            <span style={{ width: 22, height: 2, background: "#1a1a1a", display: "block", transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>
      {/* Mobile menu */}
      {open && (
        <div style={{ position: "fixed", inset: 0, top: 72, background: "#f8f8f6", zIndex: 99, padding: "3rem 2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
          {links.map(l => <Link key={l.href} href={l.href} style={{ fontFamily: "var(--font-grotesk)", fontSize: "2rem", fontWeight: 700, color: pathname === l.href ? "#06b6d4" : "#0d3b52", textDecoration: "none" }}>{l.label}</Link>)}
          <Link href="/contact" className="btn-primary" style={{ marginTop: "1rem", textAlign: "center" }}><span>Get Started</span></Link>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#aaa", marginTop: "auto" }}>Trustworthy · Transparent · Talented</p>
        </div>
      )}
      <style>{`.hide-mobile { display: flex; } .show-mobile { display: none; } @media(max-width:768px){.hide-mobile{display:none!important}.show-mobile{display:flex!important}}`}</style>
    </>
  );
}

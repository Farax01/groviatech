"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("gt_cookies")) setShow(true);
  }, []);
  const accept = () => { localStorage.setItem("gt_cookies", "accepted"); setShow(false); };
  const decline = () => { localStorage.setItem("gt_cookies", "declined"); setShow(false); };
  if (!show) return null;
  return (
    <div className="cookie-banner">
      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", flex: 1, maxWidth: 640 }}>
        We use cookies to improve your experience and analyse site usage.{" "}
        <Link href="/privacy" style={{ color: "#06b6d4", textDecoration: "underline" }}>Learn more</Link>.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
        <button onClick={decline} style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", background: "none", border: "1px solid rgba(255,255,255,0.2)", padding: "0.5rem 1.25rem", cursor: "pointer" }}>Decline</button>
        <button onClick={accept} style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", background: "#06b6d4", color: "white", border: "none", padding: "0.5rem 1.25rem", cursor: "pointer", fontWeight: 600 }}>Accept All</button>
      </div>
    </div>
  );
}

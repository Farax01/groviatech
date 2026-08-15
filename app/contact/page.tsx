"use client";
import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const pricingItems = [
  { id: "web-starter", label: "Website — Starter (up to 5 pages)", price: 800, category: "Software" },
  { id: "web-growth", label: "Website — Growth (up to 10 pages)", price: 1500, category: "Software" },
  { id: "mobile-app", label: "Mobile App Development", price: 2500, category: "Software" },
  { id: "seo", label: "SEO Setup & Optimisation", price: 400, category: "Software" },
  { id: "ai-ml", label: "ML / AI Integration", price: 2000, category: "Software" },
  { id: "devops", label: "DevOps & CI/CD Setup", price: 800, category: "Software" },
  { id: "qa", label: "Quality Assurance (QA)", price: 500, category: "Software" },
  { id: "pentest-web", label: "Web Penetration Testing", price: 1500, category: "Cybersecurity" },
  { id: "pentest-api", label: "API Security Testing (APISec)", price: 800, category: "Cybersecurity" },
  { id: "pentest-mobile", label: "Mobile Security Assessment", price: 1200, category: "Cybersecurity" },
  { id: "appsec", label: "Application Security Review (AppSec)", price: 1000, category: "Cybersecurity" },
  { id: "security-audit", label: "Security Audit & Report", price: 1000, category: "Cybersecurity" },
  { id: "hardening", label: "Security Hardening", price: 500, category: "Cybersecurity" },
];

const addOns = [
  { id: "maintenance-basic", label: "Maintenance & Support — Basic ($250/mo)", price: 250, monthly: true },
  { id: "maintenance-pro", label: "Maintenance & Support — Pro ($500/mo)", price: 500, monthly: true },
  { id: "security-monitoring", label: "Ongoing Security Monitoring ($500/mo)", price: 500, monthly: true },
  { id: "seo-ongoing", label: "Ongoing SEO Management ($300/mo)", price: 300, monthly: true },
  { id: "copywriting", label: "Copywriting Add-on ($300)", price: 300, monthly: false },
  { id: "logo-branding", label: "Logo & Brand Identity ($400)", price: 400, monthly: false },
];

export default function ContactPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", company: "", website: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const toggle = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const toggleAddOn = (id: string) => setSelectedAddOns(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const oneTime = pricingItems.filter(i => selected.includes(i.id)).reduce((a, i) => a + i.price, 0) +
    addOns.filter(a => selectedAddOns.includes(a.id) && !a.monthly).reduce((a, i) => a + i.price, 0);
  const monthly = addOns.filter(a => selectedAddOns.includes(a.id) && a.monthly).reduce((a, i) => a + i.price, 0);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    const selectedServices = pricingItems.filter(i => selected.includes(i.id)).map(i => i.label).join(", ") || "None selected";
    const selectedAO = addOns.filter(a => selectedAddOns.includes(a.id)).map(a => a.label).join(", ") || "None";
    const subject = encodeURIComponent(`New Enquiry from ${form.name || "Website Visitor"}${form.company ? ` — ${form.company}` : ""}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || "N/A"}\nWebsite: ${form.website || "N/A"}\n\nServices Interested In:\n${selectedServices}\n\nAdd-ons:\n${selectedAO}\n\nEstimated Total:\nOne-time: $${oneTime.toLocaleString()}${monthly > 0 ? `\nMonthly: $${monthly.toLocaleString()}/mo` : ""}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:groviatechh@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  }

  const software = pricingItems.filter(i => i.category === "Software");
  const cyber = pricingItems.filter(i => i.category === "Cybersecurity");

  return (
    <>
      <section style={{ padding: "6rem 2rem 4rem", background: "#081f2d", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(6,182,212,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <span className="tag" style={{ marginBottom: "1rem" }}>Contact Us</span>
            <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.5rem,5vw,4rem)", color: "white", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: 700 }}>
              Let&apos;s build something <span style={{ color: "#06b6d4" }}>worth launching.</span>
            </h1>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", maxWidth: 520, lineHeight: 1.75 }}>
              Select the services you need, add any extras, and send us a message. We respond within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: "4rem 2rem 6rem", background: "#f8f8f6" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "3rem", alignItems: "start" }}>
            {/* LEFT: Pricing builder + form */}
            <div>
              {/* Pricing builder */}
              <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", padding: "2.5rem", marginBottom: "2rem" }}>
                <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.3rem", color: "#0d3b52", marginBottom: "0.5rem" }}>Build your package</h2>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: "#888", marginBottom: "2rem" }}>Select everything you need. Pricing shown is one-time unless noted.</p>

                <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.85rem", color: "#0d3b52", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>💻 Software Development</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
                  {software.map(item => (
                    <label key={item.id} onClick={() => toggle(item.id)} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "1rem", border: `1px solid ${selected.includes(item.id) ? "#06b6d4" : "rgba(0,0,0,0.08)"}`, background: selected.includes(item.id) ? "rgba(6,182,212,0.04)" : "#f8f8f6", cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ width: 18, height: 18, border: `2px solid ${selected.includes(item.id) ? "#06b6d4" : "#ccc"}`, background: selected.includes(item.id) ? "#06b6d4" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        {selected.includes(item.id) && <span style={{ color: "white", fontSize: "0.7rem", fontWeight: 700 }}>✓</span>}
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#333", marginBottom: "0.2rem", lineHeight: 1.4 }}>{item.label}</p>
                        <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "0.85rem", color: "#06b6d4" }}>${item.price.toLocaleString()}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.85rem", color: "#0d3b52", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>🛡️ Cybersecurity</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
                  {cyber.map(item => (
                    <label key={item.id} onClick={() => toggle(item.id)} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "1rem", border: `1px solid ${selected.includes(item.id) ? "#06b6d4" : "rgba(0,0,0,0.08)"}`, background: selected.includes(item.id) ? "rgba(6,182,212,0.04)" : "#f8f8f6", cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ width: 18, height: 18, border: `2px solid ${selected.includes(item.id) ? "#06b6d4" : "#ccc"}`, background: selected.includes(item.id) ? "#06b6d4" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        {selected.includes(item.id) && <span style={{ color: "white", fontSize: "0.7rem", fontWeight: 700 }}>✓</span>}
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#333", marginBottom: "0.2rem", lineHeight: 1.4 }}>{item.label}</p>
                        <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "0.85rem", color: "#06b6d4" }}>${item.price.toLocaleString()}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.85rem", color: "#0d3b52", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>✨ Add-ons & Retainers</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {addOns.map(item => (
                    <label key={item.id} onClick={() => toggleAddOn(item.id)} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "1rem", border: `1px solid ${selectedAddOns.includes(item.id) ? "#06b6d4" : "rgba(0,0,0,0.08)"}`, background: selectedAddOns.includes(item.id) ? "rgba(6,182,212,0.04)" : "#f8f8f6", cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ width: 18, height: 18, border: `2px solid ${selectedAddOns.includes(item.id) ? "#06b6d4" : "#ccc"}`, background: selectedAddOns.includes(item.id) ? "#06b6d4" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        {selectedAddOns.includes(item.id) && <span style={{ color: "white", fontSize: "0.7rem", fontWeight: 700 }}>✓</span>}
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#333", lineHeight: 1.4 }}>{item.label}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact form */}
              <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", padding: "2.5rem" }}>
                <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.3rem", color: "#0d3b52", marginBottom: "1.75rem" }}>Your details</h2>
                {sent ? (
                  <div style={{ textAlign: "center", padding: "3rem" }}>
                    <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>✅</span>
                    <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, color: "#0d3b52", marginBottom: "0.5rem" }}>Email client should have opened</h3>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#666" }}>If not, email us directly at <a href="mailto:groviatechh@gmail.com" style={{ color: "#06b6d4" }}>groviatechh@gmail.com</a></p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                      {[{ name: "name", label: "Full Name *", type: "text", required: true }, { name: "email", label: "Email Address *", type: "email", required: true }, { name: "company", label: "Company / Project", type: "text", required: false }, { name: "website", label: "Website URL", type: "url", required: false }].map(f => (
                        <div key={f.name}>
                          <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#888", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>{f.label}</label>
                          <input name={f.name} type={f.type} required={f.required} value={(form as Record<string, string>)[f.name]} onChange={handleChange}
                            style={{ width: "100%", padding: "0.875rem", border: "1px solid rgba(0,0,0,0.12)", background: "#f8f8f6", fontFamily: "var(--font-inter)", fontSize: "0.875rem", outline: "none", transition: "border-color 0.2s" }}
                            onFocus={e => (e.target.style.borderColor = "#06b6d4")}
                            onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.12)")} />
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#888", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>Tell us more about your project</label>
                      <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                        placeholder="Any additional context, timeline, or questions..."
                        style={{ width: "100%", padding: "0.875rem", border: "1px solid rgba(0,0,0,0.12)", background: "#f8f8f6", fontFamily: "var(--font-inter)", fontSize: "0.875rem", outline: "none", resize: "vertical", transition: "border-color 0.2s" }}
                        onFocus={e => (e.target.style.borderColor = "#06b6d4")}
                        onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.12)")} />
                    </div>
                    <button type="submit" disabled={sending} style={{ width: "100%", background: sending ? "#888" : "#0d3b52", color: "white", padding: "1rem", fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: sending ? "not-allowed" : "pointer", transition: "background 0.3s" }}>
                      {sending ? "Opening email client..." : "Send Enquiry →"}
                    </button>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#aaa", textAlign: "center", marginTop: "0.75rem" }}>We respond within 24 hours · No spam</p>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT: Estimate + contact info */}
            <div style={{ position: "sticky", top: 100 }}>
              {/* Live estimate */}
              <div style={{ background: "#0d3b52", padding: "2rem", marginBottom: "1.5rem", color: "white" }}>
                <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1rem", color: "white", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}>Your Estimate</h3>
                {selected.length === 0 && selectedAddOns.length === 0 ? (
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)" }}>Select services on the left to see your estimate.</p>
                ) : (
                  <>
                    {pricingItems.filter(i => selected.includes(i.id)).map(i => (
                      <div key={i.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", maxWidth: 200, lineHeight: 1.3 }}>{i.label}</span>
                        <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.82rem", color: "white", flexShrink: 0 }}>${i.price.toLocaleString()}</span>
                      </div>
                    ))}
                    {addOns.filter(a => selectedAddOns.includes(a.id) && !a.monthly).map(a => (
                      <div key={a.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", maxWidth: 200, lineHeight: 1.3 }}>{a.label}</span>
                        <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.82rem", color: "white" }}>${a.price.toLocaleString()}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", marginTop: "1rem", paddingTop: "1rem" }}>
                      {oneTime > 0 && (
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "1px" }}>ONE-TIME TOTAL</span>
                          <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.3rem", color: "#06b6d4" }}>${oneTime.toLocaleString()}</span>
                        </div>
                      )}
                      {monthly > 0 && (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "1px" }}>MONTHLY RETAINER</span>
                          <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.1rem", color: "#06b6d4" }}>${monthly.toLocaleString()}/mo</span>
                        </div>
                      )}
                    </div>
                    {addOns.filter(a => selectedAddOns.includes(a.id) && a.monthly).map(a => (
                      <div key={a.id} style={{ display: "flex", justifyContent: "space-between", marginTop: "0.6rem" }}>
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", maxWidth: 180, lineHeight: 1.3 }}>{a.label}</span>
                        <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>${a.price}/mo</span>
                      </div>
                    ))}
                  </>
                )}
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", marginTop: "1.25rem", lineHeight: 1.6 }}>* Estimates are indicative. Final pricing confirmed after scoping call.</p>
              </div>

              {/* Contact info */}
              <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", padding: "1.75rem", marginBottom: "1.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1rem", color: "#0d3b52", marginBottom: "1.25rem" }}>Contact Details</h3>
                {[
                  { icon: "📧", label: "EMAIL", value: "groviatechh@gmail.com", href: "mailto:groviatechh@gmail.com" },
                  { icon: "💬", label: "WHATSAPP", value: "Update with your number", href: "#" },
                  { icon: "📍", label: "LOCATION", value: "Lagos, Nigeria · Global", href: null },
                ].map(c => (
                  <div key={c.label} style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{c.icon}</span>
                    <div>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#aaa", letterSpacing: "1px", marginBottom: "0.2rem" }}>{c.label}</p>
                      {c.href && c.href !== "#" ? (
                        <a href={c.href} style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#06b6d4", textDecoration: "none" }}>{c.value}</a>
                      ) : (
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#555" }}>{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#f8f8f6", border: "1px solid rgba(0,0,0,0.06)", padding: "1.5rem" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#06b6d4", letterSpacing: "1px", marginBottom: "0.5rem" }}>WE SERVE</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["🇳🇬 Nigeria", "🇺🇸 United States", "🇬🇧 United Kingdom", "🇦🇪 UAE", "🌍 Global"].map(c => (
                    <span key={c} style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#555" }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:1024px){section > div > div[style*="grid-template-columns: 1fr 380px"]{grid-template-columns:1fr!important} section > div > div > div[style*="position: sticky"]{position:static!important}}`}</style>
        </div>
      </section>
    </>
  );
}

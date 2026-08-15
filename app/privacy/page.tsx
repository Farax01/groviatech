import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
export const metadata: Metadata = { title: "Privacy Policy | GroviaTech Solutions", description: "GroviaTech Solutions privacy policy — how we collect, use, and protect your data." };
export default function PrivacyPage() {
  return (
    <section style={{ padding: "6rem 2rem", background: "#f8f8f6", minHeight: "80vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <ScrollReveal>
          <span className="tag" style={{ marginBottom: "1rem" }}>Legal</span>
          <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "2.5rem", color: "#0d3b52", marginBottom: "2rem" }}>Privacy Policy</h1>
          <div style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "#555", lineHeight: 1.9 }}>
            <p style={{ marginBottom: "1.5rem" }}><strong>Last updated:</strong> August 2026</p>
            {[
              { h: "1. Information We Collect", p: "We collect information you provide directly, such as your name, email address, company name, and website URL when you use our contact form. We may also collect usage data through analytics tools to understand how visitors interact with our site." },
              { h: "2. How We Use Your Information", p: "We use your information to respond to your enquiries, provide our services, and improve our website. We do not sell your personal data to third parties." },
              { h: "3. Cookies", p: "We use essential cookies to operate our website and optional analytics cookies to understand site usage. You can accept or decline non-essential cookies using the banner on our site." },
              { h: "4. Data Retention", p: "We retain your contact information only as long as necessary to provide our services and meet legal obligations." },
              { h: "5. Your Rights", p: "You have the right to access, correct, or delete your personal data. Contact us at groviatechh@gmail.com to make a request." },
              { h: "6. Contact", p: "For privacy-related questions, contact us at groviatechh@gmail.com." },
            ].map(s => (
              <div key={s.h} style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.1rem", color: "#0d3b52", marginBottom: "0.75rem" }}>{s.h}</h2>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState, ReactNode } from "react";
 import Header from "@/components/Header";

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: any }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(node); } },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ─── Bonus Card ─── */
function BonusCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group h-full bg-[#111] rounded-3xl p-8 border border-white/[0.06] hover:border-[#C6F135]/30 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6F135]/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#C6F135]/[0.06] transition-colors" />
        <div className="relative z-10">
          <div className="w-14 h-14 bg-[#C6F135]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C6F135]/20 transition-colors">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-[#8a8a8a] text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Stat Card ─── */
function StatCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="text-center p-8 rounded-3xl bg-[#111] border border-white/[0.06]">
        <p className="text-5xl sm:text-6xl font-black text-[#C6F135] mb-2">{value}</p>
        <p className="text-sm text-[#8a8a8a]">{label}</p>
      </div>
    </Reveal>
  );
}

/* ─── Step Card ─── */
function StepCard({
  number,
  title,
  description,
  delay = 0,
}: {
  number: string;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="relative pl-8 md:pl-0">
        <div className="hidden md:flex items-center gap-4 mb-4">
          <span className="text-5xl font-black text-[#C6F135]/20">{number}</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <span className="md:hidden absolute left-0 top-0 text-4xl font-black text-[#C6F135]/30">{number}</span>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-[#8a8a8a] text-sm leading-relaxed">{description}</p>
      </div>
    </Reveal>
  );
}

/* ─── Partner Logo Placeholder ─── */
function PartnerLogo({ delay = 0 }: { delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="h-16 rounded-2xl bg-[#111] border border-white/[0.06] flex items-center justify-center hover:border-[#C6F135]/20 transition-all group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C6F135]/20 to-[#6366F1]/20 group-hover:from-[#C6F135]/40 group-hover:to-[#6366F1]/40 transition-all" />
      </div>
    </Reveal>
  );
}

export default function CollabPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
          <Header />

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-[#4F46E5]/20 via-[#0a0a0a] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <img
  src="/increase.png"
  alt="Sirvya Logo"
  className="absolute left-2/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-270 w-auto"
       />  
            <Reveal>
              <div>
                <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-6">
                  DevUnivers × Partners
                </p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-8">
                  Build Something
                  <br />
                  <span className="text-[#C6F135]">Extraordinary</span>
                  <br />
                  Together.
                </h1>
                <p className="text-white/50 text-lg max-w-xl leading-relaxed mb-10">
                  DevUnivers partners with ambitious brands, creators, and studios to craft digital experiences that move people. Let&apos;s combine forces.
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  
                  <Link href="#benefits" className="text-white/50 hover:text-white transition-colors text-sm underline underline-offset-4">
                    See the benefits
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-[#111] rounded-3xl p-6 border border-white/[0.06]">
                      <div className="w-10 h-10 rounded-xl bg-[#C6F135]/10 flex items-center justify-center mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <p className="text-2xl font-black text-[#C6F135]">150+</p>
                      <p className="text-xs text-[#8a8a8a] mt-1">Projects Delivered</p>
                    </div>
                    <div className="bg-[#111] rounded-3xl p-6 border border-white/[0.06]">
                      <div className="w-10 h-10 rounded-xl bg-[#C6F135]/10 flex items-center justify-center mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <p className="text-2xl font-black text-[#C6F135]">40+</p>
                      <p className="text-xs text-[#8a8a8a] mt-1">Active Partners</p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="bg-[#111] rounded-3xl p-6 border border-white/[0.06]">
                      <div className="w-10 h-10 rounded-xl bg-[#C6F135]/10 flex items-center justify-center mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </div>
                      <p className="text-2xl font-black text-[#C6F135]">4.9</p>
                      <p className="text-xs text-[#8a8a8a] mt-1">Partner Rating</p>
                    </div>
                    <div className="bg-[#111] rounded-3xl p-6 border border-white/[0.06]">
                      <div className="w-10 h-10 rounded-xl bg-[#C6F135]/10 flex items-center justify-center mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                      <p className="text-2xl font-black text-[#C6F135]">48h</p>
                      <p className="text-xs text-[#8a8a8a] mt-1">Avg. Response</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUSTED BY
      ═══════════════════════════════════════════ */}
      <section className="py-16 bg-[#0a0a0a] border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-center text-xs text-[#8a8a8a] uppercase tracking-widest mb-8 font-mono">
              Trusted by innovative teams
            </p>
          </Reveal>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[0, 80, 160, 240, 320, 400].map((d, i) => (
              <PartnerLogo key={i} delay={d} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY COLLABORATE WITH US — BONUSES
      ═══════════════════════════════════════════ */}
      <section id="benefits" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-16">
            <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-4">
              The DevUnivers Advantage
            </p>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Why Partner With Us?</h2>
            <p className="text-[#8a8a8a] max-w-lg">
              We do not just deliver projects — we invest in your success. Here is what you get when you collaborate with DevUnivers.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <BonusCard
              delay={0}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              }
              title="Revenue Share Model"
              description="Earn up to 30% lifetime revenue share on every project we build together. Your network is your net worth — we make sure it pays off."
            />
            <BonusCard
              delay={80}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              }
              title="Priority Development"
              description="Collaboration partners get fast-tracked in our pipeline. Skip the queue and get your projects shipped in record time with dedicated resources."
            />
            <BonusCard
              delay={160}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                </svg>
              }
              title="White-Label Rights"
              description="Rebrand our work as your own. We stay invisible so you shine. Perfect for agencies and studios looking to scale without hiring."
            />
            <BonusCard
              delay={240}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              }
              title="Dedicated Slack Channel"
              description="Direct line to our founders and lead developers. No ticketing systems, no middlemen. Real-time communication from day one."
            />
            <BonusCard
              delay={320}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              }
              title="Free Maintenance Year"
              description="Every collaboration project includes 12 months of free bug fixes, security patches, and minor updates. Zero hidden costs."
            />
            <BonusCard
              delay={400}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <polygon points="13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              }
              title="Co-Marketing Exposure"
              description="Get featured on our website, newsletter (50K+ subscribers), and social channels. We amplify your brand alongside ours."
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-16">
            <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-4">Simple Process</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">How We Collaborate</h2>
            <p className="text-[#8a8a8a] max-w-lg">From first contact to launch in four easy steps.</p>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="01"
              title="Discovery Call"
              description="We jump on a 30-min call to understand your goals, audience, and vision. No pitch decks — just real talk."
              delay={0}
            />
            <StepCard
              number="02"
              title="Scope & Proposal"
              description="Within 48 hours, you receive a detailed proposal with timeline, deliverables, and revenue-share terms."
              delay={100}
            />
            <StepCard
              number="03"
              title="Build Together"
              description="Weekly syncs, real-time Slack updates, and shared Figma files. You are part of the process, not just the client."
              delay={200}
            />
            <StepCard
              number="04"
              title="Launch & Scale"
              description="We ship, measure, and optimize. Post-launch support and co-marketing kick in immediately."
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Partner Love</h2>
            <p className="text-[#8a8a8a] max-w-lg">Do not just take our word for it.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "DevUnivers did not just build our app — they became an extension of our team. The revenue share model alone saved us $40K in year one.",
                author: "Sarah Chen",
                role: "CEO, FitPulse",
              },
              {
                quote: "The white-label option is a game changer. We deliver enterprise-grade products to our clients without hiring a single developer.",
                author: "Marcus Reid",
                role: "Founder, Studio Nine",
              },
              {
                quote: "48-hour response time is not a marketing line — it is real. I have never worked with a dev team this responsive and invested.",
                author: "Aisha Patel",
                role: "Product Lead, Verve Health",
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="bg-[#111] rounded-3xl p-8 border border-white/[0.06] h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#C6F135" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C6F135] to-[#6366F1]" />
                    <div>
                      <p className="text-sm font-semibold">{t.author}</p>
                      <p className="text-xs text-[#8a8a8a]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value="$2M+" label="Partner Revenue Generated" delay={0} />
            <StatCard value="150+" label="Collaborations Completed" delay={100} />
            <StatCard value="98%" label="Partner Retention Rate" delay={200} />
            <StatCard value="12" label="Countries Reached" delay={300} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg width="100%" height="100%">
            <pattern id="cta-grid-collab" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#cta-grid-collab)" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              Let&apos;s Build Together.
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Whether you are a startup, agency, or creator — we have a collaboration model that works for you. No upfront fees for qualifying partners.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="button"
                className="bg-[#C6F135] text-[#0a0a0a] px-10 py-4 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Book a Discovery Call
              </button>
              <button
                type="button"
                className="border border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Download Partnership Deck
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      
    </div>
  );
}
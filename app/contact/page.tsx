"use client";

import Link from "next/link";
import { useEffect, useRef, useState, ReactNode, FormEvent } from "react";

/* ─── Import your existing Header component here ─── */
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

/* ─── Team Member Card ─── */
function TeamCard({
  name,
  role,
  photo,
  delay = 0,
}: {
  name: string;
  role: string;
  photo?: string;
  delay?: number;
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = photo && !imgError;

  return (
    <Reveal delay={delay}>
      <div className="group text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#C6F135]/20 to-[#6366F1]/20 border border-white/10 flex items-center justify-center group-hover:border-[#C6F135]/30 transition-all overflow-hidden">
          {showImage ? (
            <img
              src={photo}
              alt={name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-black text-white/20 group-hover:text-[#C6F135]/40 transition-colors">
              {name.split(" ").map((n) => n[0]).join("")}
            </span>
          )}
        </div>
        <h4 className="font-bold text-sm">{name}</h4>
        <p className="text-xs text-[#8a8a8a] mt-1">{role}</p>
      </div>
    </Reveal>
  );
}

/* ─── Value Card ─── */
function ValueCard({ icon, title, description, delay = 0 }: { icon: ReactNode; title: string; description: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="group p-6 rounded-2xl bg-[#111] border border-white/[0.06] hover:border-[#C6F135]/20 transition-all">
        <div className="w-10 h-10 bg-[#C6F135]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C6F135]/20 transition-colors">
          {icon}
        </div>
        <h4 className="font-bold text-sm mb-2">{title}</h4>
        <p className="text-xs text-[#8a8a8a] leading-relaxed">{description}</p>
      </div>
    </Reveal>
  );
}

export default function AboutPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to send message");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
    
          <Header />

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-[#4F46E5]/20 via-[#0a0a0a] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
                <img
  src="/Devuniverse.png"
  alt="Sirvya Logo"
  className="absolute left-2/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-37 w-auto opacity-10"
/>
          <Reveal>
        
            <div className="max-w-3xl">
              <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-6">
                About DevUnivers
              </p>
             <h1 className="text-7xl sm:text-9xl lg:text-[100px] font-black leading-[0.85] tracking-tight mb-8">
  We Build
  <br />
  <span className="text-[#C6F135]">Digital</span> Futures.
</h1>
              <p className="text-white/50 text-lg max-w-xl leading-relaxed">
                DevUnivers is a product studio obsessed with craft. We design and ship apps, platforms, and experiences that people actually love to use.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OUR STORY
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-4">Our Story</p>
                <h2 className="text-4xl sm:text-5xl font-black mb-6">From a Side Project to a Global Studio</h2>
                <div className="space-y-4 text-[#8a8a8a] leading-relaxed">
                  <p>
                    DevUnivers started in 2022 as a late-night experiment between two developers who believed fitness apps could be beautiful <em>and</em> functional. That experiment became SIRVYA — and SIRVYA became the foundation of everything we build today.
                  </p>
                  <p>
                    We are now a distributed team of designers, engineers, and strategists across 4 continents. We do not chase trends. We build products that last.
                  </p>
                  <p>
                    Our philosophy is simple: every pixel, every interaction, every line of code should earn its place. No bloat. No shortcuts. Just craft.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#111] rounded-3xl p-6 border border-white/[0.06]">
                  <p className="text-4xl font-black text-[#C6F135] mb-2">2022</p>
                  <p className="text-xs text-[#8a8a8a]">Founded</p>
                </div>
                <div className="bg-[#111] rounded-3xl p-6 border border-white/[0.06] mt-8">
                  <p className="text-4xl font-black text-[#C6F135] mb-2">4</p>
                  <p className="text-xs text-[#8a8a8a]">Continents</p>
                </div>
                <div className="bg-[#111] rounded-3xl p-6 border border-white/[0.06]">
                  <p className="text-4xl font-black text-[#C6F135] mb-2">150+</p>
                  <p className="text-xs text-[#8a8a8a]">Projects Shipped</p>
                </div>
                <div className="bg-[#111] rounded-3xl p-6 border border-white/[0.06] mt-8">
                  <p className="text-4xl font-black text-[#C6F135] mb-2">2M+</p>
                  <p className="text-xs text-[#8a8a8a]">Users Reached</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VALUES
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-16">
            <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-4">What Drives Us</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Our Values</h2>
            <p className="text-[#8a8a8a] max-w-lg">The principles that guide every decision we make.</p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <ValueCard
              delay={0}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>}
              title="Craft Over Speed"
              description="We ship fast, but never at the cost of quality. Every detail matters."
            />
            <ValueCard
              delay={80}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /></svg>}
              title="People First"
              description="Our team, our partners, and our users come before everything else."
            />
            <ValueCard
              delay={160}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2"><polygon points="13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>}
              title="Move Fast, Break Nothing"
              description="We iterate aggressively but test obsessively. Stability is a feature."
            />
            <ValueCard
              delay={240}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>}
              title="Radical Transparency"
              description="We share our process, our pricing, and our failures. No hidden agendas."
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TEAM
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-4">The People</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Meet the Team</h2>
            <p className="text-[#8a8a8a] max-w-lg mx-auto">Small team, outsized impact.</p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <TeamCard name="Mouhsin Kamal" role="Founder & CEO" photo="/kamal.png" delay={0} />
            <TeamCard name="Mehdi Boudrna" role="CTO" photo="/mehdi.png" delay={100} />
            <TeamCard name="ANAS GANA" role="Software Engineer" photo="/profile.png" delay={200} />
            <TeamCard name="Aicha Akouchtah" role="IT support" photo="/team/sophie-dubois.jpg" delay={300} />
          </div>
        </div>
      </section>
       <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Managers</h2>
            <p className="text-[#8a8a8a] max-w-lg mx-auto">Help you anytime</p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <TeamCard name="Alexandre Roy" role="Founder & CEO" photo="/team/alexandre-roy.jpg" delay={0} />
            <TeamCard name="Mei Lin" role="Lead Designer" photo="/team/mei-lin.jpg" delay={100} />
            <TeamCard name="ANAS GANA" role="Software Engenier" photo="/profile.png" delay={200} />
            <TeamCard name="Sophie Dubois" role="Product Strategist" photo="/team/sophie-dubois.jpg" delay={300} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TIMELINE
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal className="mb-16">
            <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-4">The Journey</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Key Milestones</h2>
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px" />
            {[
              { year: "2022", title: "DevUnivers is Born", desc: "Started as a two-person team building SIRVYA from a garage in Montreal." },
              { year: "2023", title: "SIRVYA v1.0 Launch", desc: "First public release. 10,000 downloads in the first week." },
              { year: "2023", title: "First Gyms Onboarded", desc: "First partner gyms and certified coaches joined the platform in Casablanca." },
              { year: "2024", title: "Global Expansion", desc: "Team grew to 12 people across 4 continents. 150+ projects delivered." },
              { year: "2025", title: "2 Million Users", desc: "SIRVYA and partner apps reached a combined 2M+ active users worldwide." },
              { year: "2026", title: "The Future", desc: "Expanding to more cities and coaching specialties across Morocco." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="hidden md:block flex-1" />
                  <div className="w-8 h-8 rounded-full bg-[#111] border-2 border-[#C6F135]/30 flex items-center justify-center shrink-0 z-10 relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C6F135]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#C6F135] text-sm font-mono mb-1">{item.year}</p>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-[#8a8a8a] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT FORM
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left — Info */}
            <Reveal>
              <div>
                <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-4">Get in Touch</p>
                <h2 className="text-4xl sm:text-5xl font-black mb-6">Contact Us</h2>
                <p className="text-[#8a8a8a] leading-relaxed mb-10 max-w-md">
                  Have a project in mind, a partnership idea, or just want to say hi? We read every message and usually reply within 24 hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#111] border border-white/[0.06] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#8a8a8a]">Email</p>
                      <p className="text-sm font-medium">support@devunivers.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#111] border border-white/[0.06] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#8a8a8a]">Location</p>
                      <p className="text-sm font-medium">Casablanca, Maroc — Remote Worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#111] border border-white/[0.06] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#8a8a8a]">Response Time</p>
                      <p className="text-sm font-medium">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right — Form */}
            <Reveal delay={150}>
              <div className="bg-[#111] rounded-3xl p-8 sm:p-10 border border-white/[0.06]">
                <h3 className="text-xl font-bold mb-6">Send a Message</h3>

                {status === "success" ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#C6F135]/10 flex items-center justify-center mx-auto mb-4">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold mb-2">Message Sent!</h4>
                    <p className="text-sm text-[#8a8a8a] mb-6">Thanks for reaching out. We will get back to you shortly.</p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="text-[#C6F135] text-sm font-semibold hover:underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs text-[#8a8a8a] mb-2">Name</label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C6F135]/50 focus:ring-1 focus:ring-[#C6F135]/20 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs text-[#8a8a8a] mb-2">Email</label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C6F135]/50 focus:ring-1 focus:ring-[#C6F135]/20 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs text-[#8a8a8a] mb-2">Subject</label>
                      <input
                        id="subject"
                        type="text"
                        required
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C6F135]/50 focus:ring-1 focus:ring-[#C6F135]/20 transition-all"
                        placeholder="Project inquiry"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs text-[#8a8a8a] mb-2">Message</label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C6F135]/50 focus:ring-1 focus:ring-[#C6F135]/20 transition-all resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {status === "error" && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-[#C6F135] text-[#0a0a0a] px-8 py-4 rounded-full font-semibold hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      
    </div>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useRef, useState, ReactNode } from "react";
import Header from "@/components/Header"

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: any }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect users who prefer reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
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

export default function FitGuideLanding() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* ═══════════════════════════════════════════
          HERO — Fit Guide with purple background
      ═══════════════════════════════════════════ */}
        
      <section className="relative bg-gradient-to-b from-[#4F46E5] via-[#4338CA] to-[#0a0a0a] pt-8 pb-20">
        {/* Navigation */}
         <img
  src="/3.png"
  alt="Sirvya Logo"
  className="hidden sm:block absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-17 w-auto z-0"
/>
       <Header/>
        <div className="max-w-7xl mx-auto px-6  pt-[85px]">
         
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <Reveal>
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight mb-6">
                Sirvya
                <br />
                <span className="text-white">Coaching</span>
              </h1>
              <p className="text-white/60 text-lg max-w-md mb-8 leading-relaxed">
                Find certified coaches and partner gyms near you, book your sessions in a tap,
                and stay in touch with your coach every step of the way.
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="bg-[#C6F135] text-[#0a0a0a] px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C6F135] focus:ring-offset-2 focus:ring-offset-[#4338CA]"
                >
                  Download App
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  Learn More
                </button>
              </div>
            </Reveal>

            {/* Hero Phones */}
            <div className="relative flex justify-center items-center gap-4">
            
            </div>
          </div>

          {/* Tags */}
          <Reveal delay={150} className="flex flex-wrap justify-center gap-4 mt-16">
            {["iOS & Android", "Certified Coaches", "Partner Gyms", "In-App Chat"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full border border-white/20 text-sm text-white/60 hover:border-[#C6F135]/50 hover:text-[#C6F135] transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GET YOUR FIT — Phone grid
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black mb-2">Find Your Coach</h2>
              <p className="text-[#8a8a8a]">Certified coaches and partner gyms, all in one app</p>
            </div>
            <button
              type="button"
              className="px-6 py-3 rounded-full border border-white/20 text-sm hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Customize
            </button>
          </Reveal>

          {/* Grid of 4 phones with wave offset */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: "/login.png", label: "Welcome to Sirvya" },
              { img: "/images/screen4.png", label: "Browse Coaches Near You" },
              { img: "/images/screen5.png", label: "Book a Session in Seconds" },
              { img: "/images/screen6.png", label: "Message Your Coach Anytime" },
            ].map((item, i) => (
              <Reveal
                key={i}
                delay={i * 100}
                className={`relative group ${i % 2 === 1 ? "lg:mt-12" : ""}`}
              >
                <div className="rounded-[2rem] p-2 shadow-xl hover:border-[#C6F135]/30 transition-all duration-500 hover:-translate-y-2 h-[600px]">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="rounded-[1.5rem] w-full h-full aspect-[9/16] object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-sm text-[#8a8a8a] text-center px-2">{item.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FITGUIDE APPROACH — Text + Crosses
      ═══════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          {/* Decorative crosses */}
          <div
            className="absolute top-0 right-1/4 text-[#C6F135] text-6xl font-light opacity-60"
            aria-hidden="true"
          >
            ×
          </div>
          <div
            className="absolute bottom-0 left-1/4 text-[#C6F135] text-4xl font-light opacity-40"
            aria-hidden="true"
          >
            ×
          </div>

          <Reveal>
            <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-6">
              About Sirvya
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              SIRVYA: Smarter
              <br />
              Way to Train
            </h2>
            <p className="text-[#8a8a8a] text-lg max-w-2xl mx-auto leading-relaxed">
              We connect clients with certified coaches and trusted partner gyms, making it
              simple to book sessions, message your coach, and track your progress in one place.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WORKOUT SPECS — 3 phones + stats
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="flex items-center gap-3 mb-12">
            <h2 className="text-4xl sm:text-5xl font-black">Booking</h2>
            <span className="text-[#C6F135] text-4xl" aria-hidden="true">
              ×
            </span>
            <h2 className="text-4xl sm:text-5xl font-black">Made Easy</h2>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Phone 1 */}
            <Reveal className="relative group">
              <div className=" rounded-[2.5rem] p-2 shadow-2xl  hover:border-[#C6F135]/30 transition-all">
                <img
                  src="/images/screen1.png"
                  alt="Coach profile screen"
                  className="rounded-[2rem] w-full aspect-[9/19] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-[#8a8a8a]">Coach Profile</p>
              </div>
            </Reveal>

            {/* Phone 2 - Stats */}
            <Reveal delay={120} className="relative group lg:scale-110 z-10">
              <div className=" rounded-[2.5rem] p-2 shadow-2xl border-[#C6F135]/20">
                <img
                  src="/profil.png"
                  alt="Coach reviews screen"
                  className="rounded-[2rem] w-full aspect-[9/19] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-3xl font-black text-[#C6F135]">4.8★</p>
                <p className="text-sm text-[#8a8a8a]">Average Coach Rating</p>
              </div>
            </Reveal>

            {/* Phone 3 */}
            <Reveal delay={240} className="relative group">
              <div className="rounded-[2.5rem] p-2 shadow-2xl  hover:border-[#C6F135]/30 transition-all">
                <img
                  src="/profil2.png"
                  alt="Bookings screen"
                  className="rounded-[2rem] w-full aspect-[9/19] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-[#8a8a8a]">Your Bookings</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TYPEFACE — Big typography section
      ═══════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <p className="text-[#8a8a8a] text-sm mb-2">Typography</p>
            <p className="text-[#8a8a8a] text-sm">Bold, modern, and highly readable</p>
          </Reveal>

          <Reveal delay={100} className="relative bg-[#C6F135] rounded-3xl p-8 sm:p-12 overflow-hidden height-[700px]">
             <div className="relative z-10 h-[300px] sm:h-[300px] lg:h-[400px] flex flex-col justify-center items-start">              <p className="text-[#0a0a0a]/60 text-xs font-mono uppercase tracking-widest mb-4">
                Display Font
              </p>
              <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black text-[#0a0a0a] leading-[0.85]">
                Heading
              </h2>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  className="bg-[#0a0a0a] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#0a0a0a]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]/60"
                >
                  H1 Bold 96px
                </button>
                <p className="text-[#0a0a0a]/70 text-sm max-w-xs self-center">
                  Strong typographic hierarchy ensures clarity and impact across all screen sizes.
                </p>
              </div>
            </div>

            <div className="absolute right-5 top -translate-y-1/2  ">
              <div className="h-[650px] w-[500px]">
                <img
                  src="/women.webp"
                  alt="Typography demo screen"
                  className=" object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Floating phone in the typeface section */}
           
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DREAM BIGGER — Bento features grid
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Everything You Need
              <br />
              To Train Better
            </h2>
            <p className="text-[#8a8a8a] max-w-lg mx-auto">
              From finding a coach to staying in touch, Sirvya brings every part of your
              coaching journey into one app.
            </p>
          </Reveal>

          {/* Bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]">
            {/* Item 1 - Book a Coach */}
            <Reveal className="bg-[#111] rounded-2xl p-6 border border-white/5 hover:border-[#C6F135]/30 transition-all group">
              <div className="w-10 h-10 bg-[#C6F135]/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C6F135"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <p className="text-sm font-semibold">Book a Coach</p>
              <p className="text-xs text-[#8a8a8a] mt-1">Reserve sessions instantly</p>
            </Reveal>

            {/* Item 2 - Messaging */}
            <Reveal delay={80} className="bg-[#111] rounded-2xl p-6 border border-white/5 hover:border-[#C6F135]/30 transition-all group">
              <div className="w-10 h-10 bg-[#C6F135]/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C6F135"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <p className="text-sm font-semibold">In-App Messaging</p>
              <p className="text-xs text-[#8a8a8a] mt-1">Chat directly with your coach</p>
            </Reveal>

            {/* Item 3 - Decorative pattern */}
            <Reveal delay={160} className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden relative">
              <div className="absolute inset-0 opacity-20" aria-hidden="true">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#C6F135" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            </Reveal>

            {/* Item 4 - Illustration */}
            <Reveal delay={240} className="bg-[#111] rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden">
              <div
                className="w-16 h-16 bg-gradient-to-br from-[#C6F135] to-[#6366F1] rounded-2xl rotate-12 shadow-lg shadow-[#C6F135]/20"
                aria-hidden="true"
              />
              <div className="absolute bottom-3 left-3">
                <p className="text-xs text-[#8a8a8a]">Trusted Partner Gyms</p>
              </div>
            </Reveal>

            {/* Item 5 - 58 App Screens (large) */}
            <Reveal className="bg-[#111] rounded-2xl p-6 border border-white/5 col-span-2 row-span-2 flex flex-col justify-between relative overflow-hidden group">
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-[#C6F135]/5 rounded-full -translate-y-1/2 translate-x-1/2"
                aria-hidden="true"
              />
              <div>
                <p className="text-5xl font-black text-[#C6F135]">58</p>
                <p className="text-lg font-semibold mt-1">App Screens</p>
              </div>
              <div className="relative">
                <img
                  src="/images.png"
                  alt="App screens preview"
                  className="rounded-xl w-full aspect-video object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
            </Reveal>

            {/* Item 6 - 127 Illustrations */}
            <Reveal delay={120} className="bg-[#111] rounded-2xl p-6 border border-white/5 col-span-2 flex items-center justify-between">
              <div>
                <p className="text-4xl font-black text-[#C6F135]">127</p>
                <p className="text-sm font-semibold mt-1">Illustrations Used</p>
              </div>
              <div className="flex -space-x-3" aria-hidden="true">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C6F135] to-[#6366F1] border-2 border-[#111]"
                  />
                ))}
              </div>
            </Reveal>

            {/* Item 7 - Coach Availability */}
            <Reveal delay={200} className="bg-[#111] rounded-2xl p-6 border border-white/5">
              <div className="w-12 h-12 bg-[#C6F135]/10 rounded-xl flex items-center justify-center mb-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C6F135"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <p className="text-sm font-semibold">Coach Availability</p>
              <p className="text-xs text-[#8a8a8a] mt-1">Manage your schedule with ease</p>
            </Reveal>

            {/* Item 8 - 3D Elements */}
            <Reveal delay={280} className="bg-[#111] rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden">
              <div
                className="w-20 h-20 bg-gradient-to-tr from-[#6366F1] to-[#C6F135] rounded-2xl rotate-45 opacity-60"
                aria-hidden="true"
              />
              <div className="absolute bottom-3 left-3">
                <p className="text-xs text-[#8a8a8a]">3D Elements</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PALETTE PANORAMA — Colors
      ═══════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="flex items-center gap-3 mb-12">
            <h2 className="text-4xl sm:text-5xl font-black">Palette</h2>
            <span className="text-[#C6F135] text-2xl" aria-hidden="true">
              ×
            </span>
            <h2 className="text-4xl sm:text-5xl font-black">Panorama</h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { color: "#C6F135", name: "Lime Light", hex: "#C6F135" },
              { color: "#0a0a0a", name: "Void Black", hex: "#0a0a0a", border: true },
              { color: "#6366F1", name: "Neon Violet", hex: "#6366F1" },
              { color: "#111111", name: "Obsidian", hex: "#111111", border: true },
            ].map((item, i) => (
              <Reveal key={item.name} delay={i * 90} className="group cursor-pointer">
                <div
                  className={`h-40 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-105 ${
                    item.border ? "border border-white/20" : ""
                  }`}
                  style={{ backgroundColor: item.color }}
                />
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-[#8a8a8a] font-mono">{item.hex}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="flex gap-4 mt-8">
            <span className="px-4 py-2 rounded-full bg-[#111] border border-white/10 text-xs text-[#8a8a8a]">
              4 colors
            </span>
            <span className="px-4 py-2 rounded-full bg-[#111] border border-white/10 text-xs text-[#8a8a8a]">
              12 accents
            </span>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRACKING & PROGRESS — 4 phones
      ═══════════════════════════════════════════ */}
      <section  className="py-24 bg-[url('/dark.png')] bg-no-repeat bg-right bg-contain">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Book & Track</h2>
            <p className="text-[#8a8a8a] max-w-lg mx-auto">
              From finding a coach to logging your weight, everything you need for your
              coaching journey is in one place.
            </p>
          </Reveal>

         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-end">
  {[
    { img: "/booking1.png", title: "Browse Coaches & Gyms", height: 590 },
    { img: "/booking2.png", title: "Book Your Session", height: 610, highlight: true },
    { img: "/booking3.png", title: "Track Your Weight", height: 590 },
    { img: "/booking4.png", title: "Chat & Reviews", height: 580 },
  ].map((item, i) => (
    <Reveal
      key={i}
      delay={i * 100}
      className={`relative group ${i === 1 ? "lg:-mt-8" : ""}`}
    >
      <div
        className={`rounded-[2rem] p-2 shadow-xl border overflow-hidden ${
          item.highlight ? "border-[#C6F135]/30 shadow-[#C6F135]/10" : "border-white/5"
        } hover:border-[#C6F135]/30 transition-all duration-500`}
        style={{ height: `${item.height}px` }}
      >
        <img
          src={item.img}
          alt={item.title}
          className="rounded-[1.5rem] w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <p className="mt-4 text-sm text-[#8a8a8a] text-center">{item.title}</p>
    </Reveal>
  ))}
</div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FIT & FUELLED — Purple CTA
      ═══════════════════════════════════════════ */}
   <section className="py-24 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Phones */}
      <div className="flex justify-center gap-4 h-[550px]">
        <Reveal className="w-48 sm:w-56 -rotate-6">
          <div className="rounded-[2.5rem] p-2 h-full overflow-hidden">
            <img
              src="/scan.png"
              alt="Coach booking screen"
              className="rounded-[2rem] w-full  object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal delay={140} className="w-88 sm:w-46 rotate-3 translate-y-8">
          <div className="rounded-[2.5rem] p-2  h-full ">
            <img
              src="/pagecoach.png"
              alt="Coach chat screen"
              className="rounded-[2rem] w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>

      {/* Text */}
      <Reveal delay={100}>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-4xl sm:text-5xl font-black">Coach &</h2>
          <span className="text-[#C6F135] text-4xl sm:text-5xl">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#C6F135" aria-hidden="true">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </span>
          <h2 className="text-4xl sm:text-5xl font-black">Connected</h2>
        </div>
        <p className="text-white/70 text-lg mb-8 max-w-md leading-relaxed">
          Booking meets messaging. Reserve sessions with your coach or gym, and stay in
          touch before, during, and after every workout.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            className="bg-[#C6F135] text-[#0a0a0a] px-6 py-3 rounded-full font-semibold text-sm hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-[#C6F135] focus:ring-offset-2 focus:ring-offset-[#4F46E5]"
          >
            Download
          </button>
          <button
            type="button"
            className="border border-white/30 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Learn More
          </button>
        </div>
      </Reveal>
    </div>
  </div>
</section>

      {/* ═══════════════════════════════════════════
          FOOTER — Start Your Project
      ═══════════════════════════════════════════ */}
      <footer className="py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <div
            className="absolute top-0 right-1/4 text-[#C6F135] text-6xl font-light opacity-60"
            aria-hidden="true"
          >
            ×
          </div>
          <div
            className="absolute bottom-0 left-1/4 text-[#C6F135] text-4xl font-light opacity-40"
            aria-hidden="true"
          >
            ×
          </div>
          <Reveal>
              <div
            className="absolute top-0 right-1/4 text-[#C6F135] text-6xl font-light opacity-60"
            aria-hidden="true"
          >
            ×
          </div>
          <div
            className="absolute bottom-0 left-1/4 text-[#C6F135] text-4xl font-light opacity-40"
            aria-hidden="true"
          >
            ×
          </div>
            <p className="text-[#8a8a8a] text-sm mb-4">Thanks for checking out SIRVYA</p>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8">Start Your Fitness Journey</h2>

            <div className="flex justify-center gap-6 mb-12">
              {["Dribbble", "Behance", "Instagram"].map((social) => (
                <button
                  key={social}
                  onClick={(e) => e.preventDefault()}
                  className="text-[#8a8a8a] hover:text-[#C6F135] transition-colors text-sm underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[#C6F135] rounded bg-transparent border-none cursor-pointer"
                >
                  {social}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="button"
                className="bg-[#C6F135] text-[#0a0a0a] px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-[#C6F135] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
              >
                Get the App
              </button>
              <button
                type="button"
                className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                Contact Us
              </button>
            </div>

            <p className="text-[#8a8a8a] text-xs mt-16">© 2026 SIRVYA. All rights reserved.</p>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}
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

/* ─── Benefit Card ─── */
function BenefitCard({
  icon,
  title,
  description,
  tags,
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  tags?: string[];
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
          <p className="text-[#8a8a8a] text-sm leading-relaxed mb-4">{description}</p>
          {tags && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/50 border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Pricing Card ─── */
function PricingCard({
  name,
  price,
  period,
  features,
  highlighted = false,
  delay = 0,
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`h-full rounded-3xl p-8 border transition-all duration-500 hover:-translate-y-1 ${
          highlighted
            ? "bg-[#C6F135] text-[#0a0a0a] border-[#C6F135]"
            : "bg-[#111] text-white border-white/[0.06] hover:border-[#C6F135]/30"
        }`}
      >
        <p className={`text-sm font-mono uppercase tracking-widest mb-4 ${highlighted ? "text-[#0a0a0a]/60" : "text-[#C6F135]"}`}>
          {name}
        </p>
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-5xl font-black">{price}</span>
          <span className={`text-sm ${highlighted ? "text-[#0a0a0a]/60" : "text-[#8a8a8a]"}`}>{period}</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={highlighted ? "#0a0a0a" : "#C6F135"} strokeWidth="2.5" className="shrink-0 mt-0.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className={highlighted ? "text-[#0a0a0a]/80" : "text-[#8a8a8a]"}>{f}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`w-full py-3 rounded-full font-semibold text-sm transition-transform hover:scale-105 ${
            highlighted
              ? "bg-[#0a0a0a] text-white"
              : "bg-[#C6F135] text-[#0a0a0a]"
          }`}
        >
          Get Started
        </button>
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

export default function AdvisorPage() {
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
  src="/coaches.png"
  alt="Sirvya Logo"
  className="absolute left-2/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[650px] w-auto"
/>
            <Reveal>
              <div>
                <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-6">
                  For Gym Owners & Coaches
                </p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-8">
                  Grow Your
                  <br />
                  <span className="text-[#C6F135]">Gym.</span>
                  <br />
                  Empower Your
                  <br />
                  <span className="text-[#C6F135]">Coaches.</span>
                </h1>
                <p className="text-white/50 text-lg max-w-xl leading-relaxed mb-10">
                  SIRVYA Advisor permet aux gérants de salle de créer leur profil, d&apos;y rattacher leurs coachs, et de recevoir des réservations et des avis vérifiés — le tout en un seul endroit.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                 <Link
  href="https://fitlek-advisor.vercel.app/"
  className="bg-[#C6F135] text-[#0a0a0a] px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2"
>
  Become an Advisor
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path
      d="M5 12h14M13 5l7 7-7 7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</Link>
                  <button
                    type="button"
                    className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/5 transition-colors"
                  >
                    View Demo
                  </button>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a0a0a] border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "850+", label: "Salles Partenaires" },
              { value: "3,200+", label: "Coachs Certifiés" },
              { value: "180K", label: "Séances Réservées" },
              { value: "4.8/5", label: "Note Moyenne des Avis" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl font-black text-[#C6F135] mb-1">{stat.value}</p>
                  <p className="text-sm text-[#8a8a8a]">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BENEFITS GRID
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-16">
            <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-4">
              Built for Your Business
            </p>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Tout ce dont votre salle a besoin</h2>
            <p className="text-[#8a8a8a] max-w-lg">
              De votre profil public à vos réservations, SIRVYA Advisor vous donne les outils pour être trouvé et réservé.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <BenefitCard
              delay={0}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              title="Profil de Salle"
              description="Présentez votre salle avec une galerie de photos, votre spécialité, votre ville et une description qui donne envie de réserver."
              tags={["Galerie Photos", "Spécialité", "Ville"]}
            />
            <BenefitCard
              delay={80}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              }
              title="Coachs Rattachés"
              description="Vos coachs indiquent votre salle comme référence sur leur profil. Suivez vos invitations et les points gagnés à chaque coach parrainé."
              tags={["Codes d'Invitation", "Points", "Suivi"]}
            />
            <BenefitCard
              delay={160}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
              }
              title="Avis & Réputation"
              description="Recevez des avis notés et commentés de vos clients après chaque séance, visibles publiquement sur votre profil de salle."
              tags={["Notes", "Commentaires", "Réputation"]}
            />
            <BenefitCard
              delay={240}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
              title="Gestion des Réservations"
              description="Suivez chaque réservation (en attente, confirmée, annulée), fixez le lieu et le tarif de vos séances en toute simplicité."
              tags={["Statuts", "Lieu", "Tarifs"]}
            />
            <BenefitCard
              delay={320}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              }
              title="Visibilité en Ligne"
              description="Votre salle apparaît dans les recherches par ville et par spécialité, avec vos photos et vos coachs mis en avant."
              tags={["Recherche par Ville", "Spécialités", "Découvrabilité"]}
            />
            <BenefitCard
              delay={400}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              }
              title="Messagerie Coach-Client"
              description="Vos coachs échangent directement avec leurs clients dans l'application, avec accusés de lecture et historique complet."
              tags={["Chat Direct", "Accusés de Lecture", "Historique"]}
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
            <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-4">Simple Setup</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Comment ça marche</h2>
            <p className="text-[#8a8a8a] max-w-lg">De l'inscription à votre première réservation, en quelques étapes.</p>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="01"
              title="Créez votre profil"
              description="Inscrivez votre salle : spécialité, ville, description et photos. En quelques minutes."
              delay={0}
            />
            <StepCard
              number="02"
              title="Rattachez vos coachs"
              description="Vos coachs renseignent votre salle comme référence sur leur profil et deviennent visibles à vos côtés."
              delay={100}
            />
            <StepCard
              number="03"
              title="Recevez des réservations"
              description="Les clients trouvent votre salle par ville ou spécialité et réservent directement une séance avec vos coachs."
              delay={200}
            />
            <StepCard
              number="04"
              title="Gagnez en réputation"
              description="Accumulez des avis vérifiés et gagnez en visibilité dans les résultats de recherche."
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-4">Pricing</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Un Profil Adapté à Votre Salle</h2>
            <p className="text-[#8a8a8a] max-w-lg mx-auto">
              Commencez gratuitement. Évoluez selon vos besoins de visibilité et d'accompagnement.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <PricingCard
              name="Découverte"
              price="0€"
              period="/mois"
              features={[
                "Profil de salle avec ville et spécialité",
                "Une photo de présentation",
                "Réservations illimitées",
                "Avis clients vérifiés",
                "Support par email",
              ]}
              delay={0}
            />
            <PricingCard
              name="Vérifié"
              price="Sur demande"
              period=""
              features={[
                "Galerie photos complète",
                "Badge de salle vérifiée",
                "Mise en avant dans la recherche par ville",
                "Coachs rattachés illimités",
                "Support prioritaire",
                "Suivi des invitations & points",
              ]}
              highlighted
              delay={100}
            />
            <PricingCard
              name="Partenaire"
              price="Sur demande"
              period=""
              features={[
                "Plusieurs salles / plusieurs villes",
                "Accompagnement à l'inscription des coachs",
                "Support dédié",
                "Priorité sur les nouveautés",
                "Accès anticipé aux évolutions",
                "Suivi personnalisé",
              ]}
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">La Confiance des Gérants de Salle</h2>
            <p className="text-[#8a8a8a] max-w-lg">Des résultats concrets pour de vraies salles partenaires.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Depuis que notre salle est sur SIRVYA, nous recevons des réservations directement de clients qui nous trouvent en cherchant par ville.",
                author: "David Torres",
                role: "Gérant, IronHouse Gym",
              },
              {
                quote: "Mes coachs sont rattachés à mon profil et je vois leurs avis en temps réel. La messagerie facilite énormément les échanges avec les clients.",
                author: "Lisa Park",
                role: "Directrice, Fit Collective",
              },
              {
                quote: "La galerie photos et les avis vérifiés donnent tout de suite confiance aux nouveaux clients avant même la première séance.",
                author: "James Okafor",
                role: "Fondateur, Apex Fitness",
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
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg width="100%" height="100%">
            <pattern id="cta-grid-advisor" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#cta-grid-advisor)" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              Prêt à Développer Votre Salle ?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Rejoignez les 850+ salles déjà présentes sur SIRVYA Advisor. Création de profil en quelques minutes, gratuite pour commencer.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="button"
                className="bg-[#C6F135] text-[#0a0a0a] px-10 py-4 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Créer mon profil
              </button>
              <button
                type="button"
                className="border border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Nous contacter
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
"use client";

import Link from "next/link";
import Header from "@/components/Header"
import { useEffect, useRef, useState, ReactNode } from "react";

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

/* ─── Feature Card ─── */
function FeatureCard({
  icon,
  title,
  description,
  tags,
  delay = 0,
  large = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  tags?: string[];
  delay?: number;
  large?: boolean;
}) {
  return (
    <Reveal delay={delay} className={large ? "md:col-span-2" : ""}>
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

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState(0);

  const featureTabs = [
    {
      label: "Coaches & Salles",
      features: [
        { title: "Profils Vérifiés", desc: "Chaque coach est validé après vérification de son certificat avant d'apparaître sur la plateforme." },
        { title: "Recherche par Ville", desc: "Trouvez un coach ou une salle partenaire près de chez vous, filtré par spécialité et localisation." },
        { title: "Tarifs Transparents", desc: "Consultez le prix des séances et la bio de chaque coach avant de réserver." },
      ],
    },
    {
      label: "Réservation",
      features: [
        { title: "Créneaux en Direct", desc: "Les coachs bloquent leurs indisponibilités, vous ne réservez que des créneaux réellement libres." },
        { title: "Confirmation de Séance", desc: "Suivez le statut de votre réservation : en attente, confirmée ou annulée." },
        { title: "Annulation Simplifiée", desc: "Annulez une séance en un clic, avec motif communiqué au coach ou au client." },
      ],
    },
    {
      label: "Messagerie",
      features: [
        { title: "Chat Direct", desc: "Échangez avec votre coach ou votre client directement dans l'application." },
        { title: "Accusés de Lecture", desc: "Sachez quand votre message a été lu." },
        { title: "Historique de Conversation", desc: "Retrouvez tous vos échanges liés à chaque coaching." },
      ],
    },
    {
      label: "Suivi & Avis",
      features: [
        { title: "Courbe de Poids", desc: "Enregistrez votre poids régulièrement et suivez votre évolution dans le temps." },
        { title: "Avis Vérifiés", desc: "Notez votre coach ou votre salle après chaque séance et consultez les avis des autres clients." },
        { title: "Parrainage Coach", desc: "Les coachs invitent des clients avec un code personnel et cumulent des points." },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Header/>

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-[#4F46E5]/20 via-[#0a0a0a] to-[#0a0a0a]">
       <img
  src="/male.png"
  alt="Sirvya Logo"
  className="absolute left-2/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-88 w-auto"
       />
        <div className="max-w-7xl mx-auto px-6">
          
          <Reveal>
           
            <div className="max-w-3xl">
              <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-6">
                Coachs & Salles Vérifiés
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-8">
                Un Coach.
                <br />
                Une <span className="text-[#C6F135]">Réservation</span> à la Fois.
              </h1>
              <p className="text-white/50 text-lg max-w-xl leading-relaxed mb-10">
                SIRVYA vous connecte à des coachs certifiés et des salles partenaires : réservez une séance, échangez par message et suivez votre progression, le tout au même endroit.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                
                <div className="flex items-center gap-3 text-sm text-white/40">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C6F135] to-[#6366F1] border-2 border-[#0a0a0a]" />
                    ))}
                  </div>
                  <span>Coachs et salles vérifiés</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURE GRID
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Ce que fait SIRVYA</h2>
            <p className="text-[#8a8a8a] max-w-lg">Six piliers pensés pour connecter clients, coachs et salles partenaires.</p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              delay={0}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              }
              title="Annuaire de Coachs & Salles"
              description="Parcourez les profils de coachs certifiés et de salles partenaires, filtrés par spécialité, ville et tarif."
              tags={["Profils Vérifiés", "Recherche par Ville", "Spécialités"]}
            />
            <FeatureCard
              delay={80}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              }
              title="Réservation de Séances"
              description="Choisissez une date, une heure et un lieu, puis réservez votre séance directement auprès du coach de votre choix."
              tags={["Créneaux Disponibles", "Confirmation", "Annulation"]}
            />
            <FeatureCard
              delay={160}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
              }
              title="Messagerie Intégrée"
              description="Échangez directement avec votre coach ou votre client dans une conversation dédiée, avec accusés de lecture."
              tags={["Chat en Direct", "Historique", "Notifications"]}
            />
            <FeatureCard
              delay={240}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              }
              title="Suivi de Poids"
              description="Enregistrez votre poids au fil du temps et visualisez votre progression grâce à votre historique personnel."
              tags={["Historique", "Évolution", "Objectifs"]}
            />
            <FeatureCard
              delay={320}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
              title="Avis & Notes"
              description="Laissez un avis et une note après chaque séance pour votre coach ou votre salle, et consultez les avis des autres clients."
              tags={["Notes Vérifiées", "Commentaires", "Réputation"]}
            />
            <FeatureCard
              delay={400}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              title="Parrainage & Récompenses"
              description="Les coachs partagent leur code d'invitation personnel, gagnent des points pour chaque nouveau client inscrit."
              tags={["Code Personnel", "Points Gagnés", "Invitations"]}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INTERACTIVE TABS — Deep Dive
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Zoom sur l'App</h2>
            <p className="text-[#8a8a8a] max-w-lg">Découvrez chaque module et ce qu'il vous apporte concrètement.</p>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-wrap gap-2 mb-10">
              {featureTabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                    activeTab === i
                      ? "bg-[#C6F135] text-[#0a0a0a]"
                      : "bg-[#111] text-white/60 border border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal delay={150}>
              <div className="space-y-6">
                {featureTabs[activeTab].features.map((f, i) => (
                  <div
                    key={f.title}
                    className="flex gap-5 p-5 rounded-2xl bg-[#111] border border-white/[0.06] hover:border-[#C6F135]/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#C6F135]/10 flex items-center justify-center shrink-0 group-hover:bg-[#C6F135]/20 transition-colors">
                      <span className="text-[#C6F135] font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{f.title}</h4>
                      <p className="text-sm text-[#8a8a8a] leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="relative">
                <div className=" rounded-[2.5rem] p-3  border-white/10 max-w-sm mx-auto">
                  <img
                    src={`/images/phone-${["workout", "track", "workout", "track"][activeTab]}-2.jpg`}
                    alt={`${featureTabs[activeTab].label} preview`}
                    className="rounded-[2rem] w-full aspect-[9/19] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#C6F135] text-[#0a0a0a] text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                  {featureTabs[activeTab].label}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-16">
            <p className="text-[#C6F135] text-sm font-mono uppercase tracking-widest mb-4">Processus Simple</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Comment ça marche</h2>
            <p className="text-[#8a8a8a] max-w-lg">Réservez votre premier coach en quelques minutes.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <StepCard
              number="01"
              title="Créez votre profil"
              description="Inscrivez-vous comme client, coach ou salle partenaire. Les profils coach et salle sont validés après vérification."
              delay={0}
            />
            <StepCard
              number="02"
              title="Trouvez & Réservez"
              description="Parcourez les coachs et salles disponibles près de chez vous, choisissez un créneau libre et réservez votre séance."
              delay={120}
            />
            <StepCard
              number="03"
              title="Échangez & Suivez"
              description="Discutez avec votre coach par messagerie, enregistrez votre poids après chaque séance et laissez un avis."
              delay={240}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SCREENSHOTS SHOWCASE
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">L'App en Images</h2>
            <p className="text-[#8a8a8a] max-w-lg mx-auto">Un aperçu de l'expérience de réservation, messagerie et suivi.</p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { img: "/images/phone-fit-1.jpg", label: "Inscription" },
              { img: "/images/phone-fit-2.jpg", label: "Annuaire Coachs" },
              { img: "/images/phone-fit-3.jpg", label: "Réservation" },
              { img: "/images/phone-fit-4.jpg", label: "Messagerie" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100} className={`${i % 2 === 1 ? "md:mt-12" : ""}`}>
                <div className="bg-[#1a1a1a] rounded-[2rem] p-2 shadow-xl border border-white/5 hover:border-[#C6F135]/20 transition-all duration-500 group">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="rounded-[1.5rem] w-full aspect-[9/16] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-sm text-[#8a8a8a] text-center">{item.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMPARISON / WHY US
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#111]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Pourquoi SIRVYA ?</h2>
            <p className="text-[#8a8a8a] max-w-lg mx-auto">Ce que les autres plateformes ne proposent pas.</p>
          </Reveal>

          <div className="space-y-4">
            {[
              { label: "Coachs Certifiés Vérifiés", us: true, them: false },
              { label: "Recherche par Ville", us: true, them: true },
              { label: "Messagerie Intégrée", us: true, them: false },
              { label: "Réservation & Annulation en Ligne", us: true, them: false },
              { label: "Avis Clients Vérifiés", us: true, them: true },
              { label: "Suivi de Poids Personnel", us: true, them: false },
              { label: "Parrainage Coach", us: true, them: false },
            ].map((row, i) => (
              <Reveal key={row.label} delay={i * 60}>
                <div className="grid grid-cols-3 gap-4 items-center p-4 rounded-2xl bg-[#0a0a0a] border border-white/[0.04]">
                  <span className="text-sm font-medium">{row.label}</span>
                  <div className="flex justify-center">
                    {row.us ? (
                      <div className="w-6 h-6 rounded-full bg-[#C6F135]/20 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="3">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {row.them ? (
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="3">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="grid grid-cols-3 gap-4 mt-4 text-center text-xs text-[#8a8a8a]">
              <span></span>
              <span className="font-semibold text-[#C6F135]">SIRVYA</span>
              <span>Others</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg width="100%" height="100%">
            <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              Prêt à Réserver ?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Rejoignez SIRVYA dès aujourd'hui et réservez votre première séance avec un coach certifié près de chez vous.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="button"
                className="bg-[#C6F135] text-[#0a0a0a] px-10 py-4 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Trouver un Coach
              </button>
              <button
                type="button"
                className="border border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Devenir Coach
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
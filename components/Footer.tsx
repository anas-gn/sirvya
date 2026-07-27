import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#c6f135] rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#0a0a0a]">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-white font-bold text-xl">WelHub</span>
            </div>
            <p className="text-[#8a8a8a] text-sm">
              Plus qu'une salle de sport, une communauté qui vous pousse à dépasser vos limites.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {["Home", "About", "Programs", "Coach", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-[#8a8a8a] text-sm hover:text-[#c6f135] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Programmes</h4>
            <ul className="space-y-2">
              {["HIIT Ignite", "Strength Evolution", "Flow & Restore", "Personal Training"].map((item) => (
                <li key={item}>
                  <Link href="/programs" className="text-[#8a8a8a] text-sm hover:text-[#c6f135] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-[#8a8a8a] text-sm">
              <li>2715 San Dr, San Jose</li>
              <li>South Dakota 83475</li>
              <li>contact@welhub.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#8a8a8a] text-xs">© 2026 WelHub. Tous droits réservés.</p>
          <div className="flex gap-4">
            {["Instagram", "Twitter", "Facebook", "YouTube"].map((social) => (
              <a key={social} href="#" className="text-[#8a8a8a] text-xs hover:text-[#c6f135] transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
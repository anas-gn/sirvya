"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Features", href: "/fonctionnalites" },
    { name: "Advisor", href: "/advisor" },
    { name: "Collab", href: "/collab" },
    { name: "About", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "bg-black/60 backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <img
              src="/sirvya_byed.png"
              alt="Sirvya Logo"
              className="h-9 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-white font-medium"
                    : "text-white/60 hover:text-white transition-colors"
                }
              >
                {link.name}
              </Link>
            ))}
          </div>

          <a
            href="/downloads/sirvya.apk"
            download
            className="hidden md:block bg-[#C6F135] text-[#0a0a0a] px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
          >
            Download App
          </a>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="flex flex-col items-center gap-6 px-6 py-8 bg-[#0a0a0a] text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={
                  pathname === link.href
                    ? "text-white font-medium text-base"
                    : "text-white/60 hover:text-white transition-colors text-base"
                }
              >
                {link.name}
              </Link>
            ))}

            <a
              href="/downloads/sirvya-app.zip"
              download
              className="bg-[#C6F135] text-[#0a0a0a] px-6 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform mt-2"
            >
              Download App
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
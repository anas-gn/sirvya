import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sirvya — More Than an App, It's a Community",
  description: "Une communauté fitness qui vous pousse à dépasser vos limites. Coachs certifiés, salles partenaires, programmes personnalisés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <link rel="icon" href="/sirvya_byed.png" />
      <body className="antialiased">{children}</body>
    </html>
  );
}
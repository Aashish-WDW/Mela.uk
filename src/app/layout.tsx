import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mela.uk — London's B2B Wholesale Marketplace",
  description: "Verified buyers. Vetted vendors. One London warehouse.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Fraunces:opsz,ital,wght@9..144,0,300..700;9..144,1,300..700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";

import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { preload } from "react-dom";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Suman Debnath — Senior Frontend Engineer (React.js & Next.js)",
  description:
    "Senior Frontend Engineer with 12+ years in web development, 6+ years in React.js & Next.js and 3+ years full stack with Node.js. Builder of a React Flow workflow automation platform used by 155+ organizations.",
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // The particle portrait is drawn from this image: start fetching it with the HTML, not after the scripts load.
  preload("/profile.webp", { as: "image", type: "image/webp", fetchPriority: "high" });
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}

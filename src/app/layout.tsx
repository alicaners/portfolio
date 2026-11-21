import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@content/profile";
import { pageTitle } from "@content/ui";
import { themeInitScript } from "@/lib/theme";
import { getSiteUrl } from "@/lib/site-url";
import { PointerGlow } from "@/components/ui/PointerGlow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: pageTitle(profile.name, profile.title),
  description: profile.intro,
  openGraph: { locale: "tr_TR", type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <PointerGlow />
      </body>
    </html>
  );
}

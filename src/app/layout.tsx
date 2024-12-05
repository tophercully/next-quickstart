import type { Metadata } from "next";
import localFont from "next/font/local";
// import "./globals.css";
import "./output.css";
import { Analytics } from "@vercel/analytics/next";

const overusedGrotesk = localFont({
  src: "./fonts/OverusedGrotesk-VF.ttf",
  variable: "--overused-grotesk",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Chris McCully - Blog",
  description: "Blog by Chris McCully",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${overusedGrotesk.className} flex h-fit min-h-[100svh] w-screen flex-col items-center justify-center overflow-y-auto antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

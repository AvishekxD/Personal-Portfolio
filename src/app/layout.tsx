import './globals.css';
import { ReactNode } from "react";
import { Metadata } from "next";
import MouseLight from '@/components/HUD/MouseLight';
import Header from '@/components/HUD/Header';
import MouseCanvas from '@/components/MouseCanvas';
import MouseDistortion from '@/components/MouseDistoration';
import MouseDepthLayer from "@/components/MouseDepthLayer";
import BrickHoverReveal from '@/components/HUD/BrickHoverReveal';
import BrickReveal from '@/components/BrickReveal';
import BrickRevealCanvas from '@/components/BrickRevealCanvas';
import CursorTrail from '@/components/CursorTrail';
import ScrollToTopButton from '@/components/ScrollToTopButton';


export const metadata: Metadata = {
  title: "Abhishek Meena — Portfolio",
  description: "portfolio",
   icons: {
    icon: "/assets/favicon/favicon.svg",        
    shortcut: "/assets/favicon/favicon.ico",
    apple: "/assets/favicon/favicon.ico", 
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="hydrated">
      <body className="min-h-screen bg-printBg text-black font-mono overflow-x-hidden px-4">
        {/*  Global full-screen animated layers */}
        {/* <BrickRevealCanvas />
        <MouseCanvas />
        <MouseDepthLayer />
        <BrickHoverReveal />
        <MouseLight /> */}
        {/* <MouseDistortion /> */}
        {/* <BrickReveal /> */}
        {/* <CursorTrail /> */}
        <Header />
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}

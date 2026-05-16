//src/app/layout.js

import "./globals.css";
import { Cormorant_Garamond,Montserrat } from "next/font/google";

import { Poppins } from "next/font/google";
import DesktopModeDetector from "@/components/DesktopModeDetector";

import ClientLayout from "@/components/layout/ClientLayout";
import SmoothScroll from "@/components/SmoothScroll";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
export const metadata = {
  title: "Kalloviyam",
  description: "Construction Company Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`
          ${poppins.className}
          ${montserrat.variable}
         
          bg-[#F8F7F5]
          text-[#1F1F1F]
          overflow-x-hidden
        `}
      >
        <DesktopModeDetector />
        <SmoothScroll>
          <ClientLayout>
            {children}
          </ClientLayout>
        </SmoothScroll>
      </body>
    </html>
  );
}
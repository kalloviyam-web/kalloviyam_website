//src/app/layout.js

import "./globals.css";

import { Poppins } from "next/font/google";

import ClientLayout from "@/components/layout/ClientLayout";
import SmoothScroll from "@/components/SmoothScroll";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
          bg-[#F8F7F5]
          text-[#1F1F1F]
          overflow-x-hidden
        `}
      >
        <SmoothScroll>
          <ClientLayout>
            {children}
          </ClientLayout>
        </SmoothScroll>
      </body>
    </html>
  );
}
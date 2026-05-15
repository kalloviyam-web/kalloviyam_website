//src/components/layout/ClientLayout.jsx
"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import FloatingContactButtons from "../common/FloatingContactButtons";

const Navbar = dynamic(() => import("./Navbar"), {
  ssr: false,
});

const Footer = dynamic(() => import("./Footer"), {
  ssr: false,
});

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const isStudio = pathname.startsWith("/studio");

  return (
    <>
      {!isStudio && <Navbar />}

      <main>
        {children}
      </main>

      {!isStudio && pathname !== "/" && <Footer />}

      {!isStudio && <FloatingContactButtons />}
    </>
  );
}
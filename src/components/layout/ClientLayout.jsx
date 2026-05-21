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

  const isVisitingCard = pathname === "/visiting_card";

  return (
    <>
      {/* Navbar */}
      {!isStudio && !isVisitingCard && <Navbar />}

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      {!isStudio &&
        !isVisitingCard &&
        pathname !== "/" &&
        !pathname.startsWith("/projects/") && <Footer />}

      {/* Floating Buttons */}
      {!isStudio && !isVisitingCard && (
        <FloatingContactButtons />
      )}
    </>
  );
}
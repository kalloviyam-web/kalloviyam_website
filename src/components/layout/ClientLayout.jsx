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

  const isAdmin = pathname.startsWith("/admin");
  const isVisitingCard = pathname === "/visiting_card";

  return (
    <>
      {/* Navbar */}
      {!isAdmin && !isVisitingCard && <Navbar />}

      {/* Page Content */}
      <div className="w-full">{children}</div>

      {/* Footer */}
      {!isAdmin &&
        !isVisitingCard &&
        pathname !== "/" &&
        !pathname.startsWith("/projects/") && <Footer />}

      {/* Floating Buttons */}
      {!isAdmin && !isVisitingCard && (
        <FloatingContactButtons />
      )}
    </>
  );
}
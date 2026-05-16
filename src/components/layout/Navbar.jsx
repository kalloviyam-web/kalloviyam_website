//src/components/layout/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import WhiteFont from "@/assets/white_font.png";
import BlackFont from "@/assets/black_font.png";

import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

import { motion, AnimatePresence } from "framer-motion";

import WhiteLogo from "@/assets/white_logo.png";
import BlackLogo from "@/assets/black_logo.png";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Services",
    path: "/services",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const isHomePage = pathname === "/";

  /* Navbar Background On Scroll */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close Mobile Menu on Desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="
          fixed
          top-0
          left-0
          w-full
          z-50
        "
      >
        {/* NAVBAR */}
        <div
          className={`
  w-full

  h-[70px]
  md:h-[76px]

  flex
  items-center
  justify-between

  px-5
  sm:px-7
  md:px-10
  lg:px-16
  xl:px-20

  transition-all
  duration-500

  ${scrolled ? "bg-[#F8F7F4]/85 backdrop-blur-md" : "bg-transparent"}
`}
        >
          {/* LOGO */}
          <Link
            href="/"
            className="
              flex
              items-center
              gap-3
              shrink-0
            "
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={isHomePage ? WhiteLogo : BlackLogo}
                alt="Kalloviyam Logo"
                priority
                className="
                  w-[34px]
                  h-[34px]
                  md:w-[38px]
                  md:h-[38px]
                  object-contain
                "
              />
            </motion.div>

            <div
  className="
    relative

    w-[165px]
    sm:w-[185px]
    md:w-[190px]
    lg:w-[200px]

    h-[34px]
    sm:h-[38px]
    md:h-[38px]
    lg:h-[35px]

    transition-all
    duration-300
  "
>
  <Image
    src={isHomePage ? WhiteFont : BlackFont}
    alt="Kalloviyam"

    fill
    priority

    className="
      object-contain
      object-left
    "
  />
</div>
          </Link>

          {/* DESKTOP MENU */}
          <nav
  className="
    hidden
    lg:flex
    fd-lg-flex

    items-center
    gap-10
    xl:gap-14
  "
>
            {navLinks.map((link, index) => {
              const isActive =
                link.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.path);

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -2,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.path}
                    className={`
  relative

  text-[12px]

  uppercase

  tracking-[4px]

  font-medium

  font-['Montserrat']

  transition-all
  duration-300

  ${
    isHomePage
      ? isActive
        ? "!text-white"
        : "!text-white/75 hover:!text-white"
      : isActive
        ? "!text-black"
        : "!text-black/60 hover:!text-black"
  }
`}
                  >
                    {link.name}

                    <span
                      className={`
                        absolute
                        left-0
                        -bottom-[6px]

                        h-[2px]

                        rounded-full

                        transition-all
                        duration-300

                        ${isHomePage ? "bg-white" : "bg-black"}

                        ${isActive ? "w-full" : "w-0"}
                      `}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`
  lg:hidden
  fd-lg-hidden

  text-[32px]

  transition-all
  duration-300

  ${isHomePage ? "text-white" : "text-black"}
`}
            onClick={() => setMobileMenu(true)}
          >
            <HiOutlineMenuAlt3 />
          </motion.button>
        </div>
      </motion.header>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
  initial={{ opacity: 0 }}

animate={{ opacity: 1 }}

exit={{ opacity: 0 }}

transition={{
  duration: 0.22,
  ease: "linear",
}}
            className="
              fixed
              inset-0
              z-[999]
              bg-black/50
              backdrop-blur-sm
            "
            onClick={() => setMobileMenu(false)}
          />
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{
  opacity: 0,
  scale: 1.015,
}}

animate={{
  opacity: 1,
  scale: 1,
}}

exit={{
  opacity: 0,
  scale: 1.01,
}}

transition={{
  duration: 0.28,
  ease: [0.16, 1, 0.3, 1],
}}
            className="
              fixed
              top-0
              will-change-transform
  transform-gpu
              right-0

              h-screen
              w-full

              bg-[#F8F7F4]

              z-[1000]

              flex
              flex-col
            "
          >
            {/* CLOSE BUTTON */}
            <div className="absolute top-7 right-7">
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="
                  text-black
                  text-[42px]
                "
                onClick={() => setMobileMenu(false)}
              >
                <HiOutlineX />
              </motion.button>
            </div>

            {/* MOBILE LOGO */}
            <div className="pt-8 pl-7">
              <Link
                href="/"
                onClick={() => setMobileMenu(false)}
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <Image
                  src={BlackLogo}
                  alt="Kalloviyam Logo"
                  className="
                    w-[36px]
                    h-[36px]
                    object-contain
                  "
                />

                <div
  className="
    relative

    w-[170px]
    h-[34px]
  "
>
  <Image
    src={BlackFont}
    alt="Kalloviyam"

    fill

    className="
      object-contain
      object-left
    "
  />
</div>
              </Link>
            </div>

            {/* MOBILE NAVIGATION */}
            <nav
              className="
                flex-1

                flex
                flex-col

                items-center
                justify-center

                gap-8
              "
            >
              {navLinks.map((link, index) => {
                const isActive =
                  link.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.path);

                return (
                  <motion.div
                    key={index}
                    initial={{
  opacity: 0,
  y: 8,
}}

animate={{
  opacity: 1,
  y: 0,
}}

transition={{
  duration: 0.22,
  delay: index * 0.035,
  ease: "easeOut",
}}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setMobileMenu(false)}
                      className={`
  text-[24px]
  md:text-[28px]

  uppercase

  tracking-[5px]

  font-medium

  font-['Montserrat']

  transition-all
  duration-300

  ${isActive ? "!text-black" : "!text-black/55 hover:!text-black"}
`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

//src/components/layout/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

import { motion, AnimatePresence } from "framer-motion";

import Logo from "@/assets/logo.png";

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

  /* Scroll Effect */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
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

            rounded-b-[38px]
            md:rounded-b-[50px]
            lg:rounded-b-[65px]

            shadow-[0_8px_30px_rgba(0,0,0,0.18)]

            transition-all
            duration-500

            ${
              scrolled
                ? "bg-gradient-to-r from-[#3F3B38]/95 via-[#4B4541]/95 to-[#5A534D]/95 backdrop-blur-md"
                : "bg-gradient-to-r from-[#4A443F]/95 via-[#5A534D]/95 to-[#6A625B]/95 backdrop-blur-sm"
            }
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
                src={Logo}
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

            <h1
              className="
                text-white

                text-[18px]
                sm:text-[20px]
                md:text-[21px]

                font-semibold

                tracking-[0.5px]
              "
            >
              kalloviyam
            </h1>
          </Link>

          {/* DESKTOP MENU */}
          <nav
            className="
              hidden
              lg:flex

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

  text-[15px]
  font-semibold

  transition-all
  duration-300

  ${
  isActive
    ? "!text-[#FFA93A]"
    : "!text-white hover:!text-[#FFA93A]"
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

                        bg-[#FFA93A]

                        rounded-full

                        transition-all
                        duration-300

                        ${
                          isActive
                            ? "w-full"
                            : "w-0"
                        }
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
            className="
              lg:hidden

              text-white

              text-[32px]
            "
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
            transition={{ duration: 0.3 }}
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45 }}
            className="
              fixed
              top-0
              right-0

              h-screen
              w-full

              bg-gradient-to-br
              from-[#4A443F]
              via-[#5A534D]
              to-[#6A625B]

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
                  text-white
                  text-[42px]
                "
                onClick={() => setMobileMenu(false)}
              >
                <HiOutlineX />
              </motion.button>
            </div>

            {/* MOBILE NAVIGATION */}
            <nav
              className="
                flex-1

                flex
                flex-col

                items-center
                justify-center

                gap-10
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setMobileMenu(false)}
                      className={`
  text-[30px]
  md:text-[34px]

  font-medium

  tracking-[1px]

  transition-all
  duration-300

  ${
  isActive
    ? "!text-[#FFA93A]"
    : "!text-white hover:!text-[#FFA93A]"
}
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
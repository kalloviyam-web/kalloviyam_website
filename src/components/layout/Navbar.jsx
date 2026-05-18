//src/components/layout/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Cormorant_Garamond } from "next/font/google";


import WhiteLogo from "@/assets/white_logo.png";
import BlackLogo from "@/assets/black_logo.png";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
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

  /* NAVBAR BACKGROUND ON SCROLL */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* CLOSE MOBILE MENU ON DESKTOP */
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
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          fixed
          top-0
          left-0

          w-full

          z-[1200]
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

           ${
  mobileMenu
    ? isHomePage
      ? "bg-transparent"
      : "bg-[#F8F7F4]/88 backdrop-blur-md"
    : scrolled
      ? "bg-[#F8F7F4]/88 backdrop-blur-md"
      : "bg-transparent"
}
          `}
        >
          {/* LOGO */}
          <Link
            href="/"
            onClick={() => setMobileMenu(false)}
            className="
              flex
              items-center
              gap-3

              shrink-0

              relative
              z-[1300]
            "
          >
            <motion.div
              whileHover={{
                rotate: 360,
              }}
              transition={{
                duration: 0.8,
              }}
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
    flex
    flex-col

    items-start

    leading-none
  "
>
  {/* COMPANY NAME */}
  <div
    className="
      flex
      items-start
    "
  >
    <span
      className={`
        ${cormorant.className}

        text-[26px]
        sm:text-[34px]
        md:text-[35px]
        lg:text-[36px]

        font-medium

        tracking-[2px]

        leading-none

        transition-all
        duration-300

        ${
          isHomePage
            ? "text-[#D2D1CD]"
            : "text-[#111111]"
        }
      `}
      style={{
        fontFeatureSettings:
          '"liga" 1, "kern" 1',
      }}
    >
      Kalloviyam
    </span>

    {/* TM SYMBOL */}
    <span
      className={`
        text-[9px]
        sm:text-[10px]

        ml-[2px]
        mt-[4px]

        font-semibold

        ${
          isHomePage
            ? "text-[#D2D1CD]/80"
            : "text-[#111111]/70"
        }
      `}
    >
      ™
    </span>
  </div>

  {/* TAGLINE */}
  <span
    className={`
      text-[8px]
      sm:text-[9px]
      md:text-[10px]

      uppercase

      tracking-[2.8px]

      mt-[4px]

      font-medium

      font-['Montserrat']

      transition-all
      duration-300

      ${
        isHomePage
          ? "text-[#D2D1CD]/58"
          : "text-[#111111]/52"
      }
    `}
  >
    The Breathable Homes
  </span>
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
                  transition={{
                    duration: 0.2,
                  }}
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
            whileTap={{
              scale: 0.92,
            }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`
              lg:hidden
              fd-lg-hidden

              relative

              w-[34px]
              h-[34px]

              flex
              items-center
              justify-center

              z-[1300]

              ${
  isHomePage
    ? "text-white"
    : mobileMenu
      ? "text-black"
      : "text-black"
}
            `}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <AnimatePresence mode="wait">
              {mobileMenu ? (
               <motion.div
  key="close"
  initial={{
    opacity: 0,
    scale: 0.82,
    rotate: -70,
  }}
  animate={{
    opacity: 1,
    scale: 1,
    rotate: 0,
  }}
  exit={{
    opacity: 0,
    scale: 0.82,
    rotate: 70,
  }}
  transition={{
    duration: 0.22,
    ease: [0.16, 1, 0.3, 1],
  }}
  className="
  relative

  w-[32px]
  h-[32px]

  translate-x-[1px]
"
>
                  {/* CROSS LINE 1 */}
                  <span
  className="
    absolute

    top-[66%]
left-[54%]

    w-[92%]
h-[1.4px]

    bg-current

    rounded-full

    -translate-x-1/2
    -translate-y-1/2

    rotate-[46deg]
  "
/>

                  {/* CROSS LINE 2 */}
                  <span
  className="
    absolute

    top-[42%]
left-[53%]

    w-full
    h-[2px]

    bg-current

    rounded-full

    -translate-x-1/2
    -translate-y-1/2

    -rotate-[56deg]
  "
/>
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                >
                  <HiOutlineMenuAlt3 size={30} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{
  opacity: 0,
  scale: 1.035,
  y: 12,
}}

animate={{
  opacity: 1,
  scale: 1,
  y: 0,
}}

exit={{
  opacity: 0,
  scale: 1.02,
  y: 8,
}}

transition={{
  duration: 0.42,
  ease: [0.16, 1, 0.3, 1],
}}
            className={`
  fixed
  inset-0

  z-[1000]

  ${
    isHomePage
      ? `
        bg-black/96

        backdrop-blur-md

        shadow-[0_0_120px_rgba(0,0,0,0.45)]
      `
      : `
        bg-[#F8F7F4]/96

        backdrop-blur-sm

        shadow-[0_0_80px_rgba(0,0,0,0.08)]
      `
  }

  will-change-transform
  transform-gpu
`}
          >
            {/* MOBILE NAVIGATION */}
            <nav
              className="
                h-full

                flex
                flex-col

                items-center
                justify-center

                pt-10
                pb-16

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
  y: 14,
  scale: 0.985,
}}

animate={{
  opacity: 1,
  y: 0,
  scale: 1,
}}

transition={{
  duration: 0.34,
  delay: 0.08 + index * 0.045,
  ease: [0.16, 1, 0.3, 1],
}}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setMobileMenu(false)}
                      className={`
                          text-[26px]
                          md:text-[30px]

                          uppercase

                          tracking-[5px]

                          font-medium

                          font-['Montserrat']

                          transition-all
                          duration-300

                         ${
  isHomePage
    ? isActive
      ? "!text-white"
      : "!text-white/45 hover:!text-white"
    : isActive
      ? "!text-black"
      : "!text-black/55 hover:!text-black"
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

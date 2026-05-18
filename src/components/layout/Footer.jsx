"use client";

import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import { Cormorant_Garamond } from "next/font/google";

import BlackLogo from "@/assets/black_logo.png";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const navLinks = [
  {
    name: "HOME",
    href: "/",
  },

  {
    name: "ABOUT",
    href: "/about",
  },

  {
    name: "SERVICES",
    href: "/services",
  },

  {
    name: "PROJECTS",
    href: "/projects",
  },

  {
    name: "CONTACT",
    href: "/contact",
  },
];

const socials = [
  {
    icon: <FaWhatsapp />,
    href: "https://api.whatsapp.com/send/?phone=917010100073&text&type=phone_number&app_absent=0",
  },

  {
    icon: <FaInstagram />,
    href: "https://www.instagram.com/kalloviyam?igsh=MWRlNW1lbTRndm9tdw%3D%3D",
  },

  {
    icon: <FaFacebookF />,
    href: "https://www.facebook.com/share/1ESr4VLKFW/",
  },

  {
    icon: <FaYoutube />,
    href: "https://www.youtube.com/@kalloviyam-thebreathablehomes",
  },
];

export default function Footer() {
  return (
    <footer
      className="
        relative

        overflow-hidden

        bg-[#F8F7F4]

        rounded-t-[38px]
        sm:rounded-t-[55px]

        shadow-[0_-20px_60px_rgba(0,0,0,0.04)]
      "
    >
      {/* SUBTLE LIGHT EFFECT */}
      <div
        className="
          absolute
          top-0
          left-1/2

          -translate-x-1/2

          w-[600px]
          h-[300px]

          bg-[#FFFDF9]

          opacity-90

          blur-[140px]

          pointer-events-none
        "
      />

      {/* TOP SOFT SHADOW */}
      <div
        className="
          absolute
          top-0
          left-0

          w-full
          h-[1px]

          bg-gradient-to-r
          from-transparent
          via-[#DDD6CC]
          to-transparent
        "
      />

      <div
        className="
          relative
          z-10

          max-w-[1250px]

          mx-auto

          px-6
          sm:px-10
          lg:px-16

          py-12
          sm:py-14
        "
      >
        {/* MAIN ROW */}
        <div
          className="
            flex
            flex-col
            lg:flex-row

            items-center
            justify-between

            gap-10
            lg:gap-6

            mb-10
          "
        >
          {/* LEFT BRAND */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
            }}
            className="
              flex
              items-center

              gap-4
            "
          >
            {/* LOGO */}
            <Image
              src={BlackLogo}
              alt="Kalloviyam Logo"
              className="
                w-[40px]
                h-[40px]

                object-contain
              "
            />

            {/* BRAND TEXT */}
            <div
              className="
                flex
                flex-col
              "
            >
              {/* NAME */}
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
                    sm:text-[28px]

                    font-medium

                    tracking-[1.2px]

                    text-[#111111]

                    leading-none
                  `}
                >
                  Kalloviyam
                </span>

                {/* TM */}
                <span
                  className="
                    text-[12px]

                    mt-[4px]
                    ml-[2px]

                    font-semibold

                    text-[#444444]
                  "
                >
                  ™
                </span>
              </div>

              {/* TAGLINE */}
              <span
                className="
    mt-[5px]

    text-[8px]
    sm:text-[10px]

    uppercase

    tracking-[2.6px]

    text-[#6F6A63]

    leading-none

    whitespace-nowrap
  "
              >
                THE BREATHABLE HOMES
              </span>
            </div>
          </motion.div>

          {/* CENTER NAV */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="
  flex

  items-center
  justify-center

  flex-nowrap

  gap-[18px]
  sm:gap-x-8

  overflow-x-auto
  scrollbar-hide

  w-full
"
          >
            {navLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="
                  relative

                  text-[10px]
sm:text-[12px]

                  tracking-[2.6px]

                  font-semibold

                  text-[#555555]

                  hover:text-[#111111]

                  transition-colors
                  duration-300
                "
              >
                {item.name}
              </Link>
            ))}
          </motion.div>

          {/* RIGHT SOCIALS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="
              flex
              items-center

              gap-3
            "
          >
            {socials.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -5,
                  scale: 1.06,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  group

                  w-[44px]
                  h-[44px]

                  rounded-full

                  border
                  border-[#E2DDD5]

                  bg-[#FCFBF8]

                  flex
                  items-center
                  justify-center

                  shadow-[0_4px_18px_rgba(0,0,0,0.04)]

                  hover:bg-[#4F6743]
                  hover:border-[#4F6743]

                  transition-all
                  duration-300
                "
              >
                <span
                  className="
                    text-[#6A5A4C]

                    text-[15px]

                    group-hover:text-[#FFFDF9]

                    transition-colors
                    duration-300
                  "
                >
                  {item.icon}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* DIVIDER */}
        <motion.div
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          whileInView={{
            scaleX: 1,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          style={{
            originX: 0.5,
          }}
          className="
            w-full
            h-[1px]

            bg-[#DDD7CF]

            mb-7
          "
        />

        {/* COPYRIGHT */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
          className="
            text-center
          "
        >
          <p
            className="
              text-[#8A847D]

              text-[12px]
              sm:text-[13px]

              tracking-[0.3px]

              leading-[1.8]
            "
          >
            © 2026 Kalloviyam™ — The Breathable Homes. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

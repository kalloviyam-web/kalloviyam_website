"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

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

          max-w-[1200px]

          mx-auto

          px-6
          sm:px-10
          lg:px-16

          py-14
          sm:py-16
        "
      >
        {/* SOCIAL ICONS */}
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
            justify-center

            gap-4
            sm:gap-5

            mb-10
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

    w-[48px]
    h-[48px]

    rounded-full

    border
    border-[#DFDAD2]

    bg-[#FCFBF8]

    flex
    items-center
    justify-center

    shadow-[0_4px_18px_rgba(0,0,0,0.04)]

    hover:bg-[#C8862B]
    hover:border-[#C8862B]

    transition-all
    duration-300
  "
            >
              <span
                className="
      text-[#6A5A4C]

      text-[16px]

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

        {/* NAVIGATION */}
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
            flex-wrap

            items-center
            justify-center

            gap-x-8
            gap-y-4

            mb-10
          "
        >
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="
                relative

                text-[11px]
                sm:text-[12px]

                tracking-[2px]

                font-medium

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

            mb-8
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
          className="text-center"
        >
          <p
            className="
              text-[#777777]

              text-[12px]
              sm:text-[13px]

              tracking-[0.4px]

              leading-[1.8]
            "
          >
            © 2026 Kalloviyam – The Breathable Homes. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

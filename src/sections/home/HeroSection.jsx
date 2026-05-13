//src/sections/home/HeroSection.jsx
"use client";

import Link from "next/link";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="
        relative

        h-screen
        min-h-[700px]

        overflow-hidden
      "
    >

      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute
          inset-0

          w-full
          h-full

          object-cover
        "
      >
        <source
          src="/home-hero-video.mp4"
          type="video/mp4"
        />
      </video>

      {/* DARK OVERLAY */}
      <div
        className="
          absolute
          inset-0

          bg-black/50
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10

          h-full

          flex
          items-center
          justify-center

          text-center
        "
      >

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="px-5"
        >

          <h1
            className="
              text-white

              text-[25px]
              sm:text-[35px]
              lg:text-[48px]

              leading-[1.1]

              font-semibold

              max-w-[1000px]

              mx-auto

              mb-6
            "
          >
            Homes That Breathe & Endure
          </h1>

          <p
            className="
              text-white/80

              text-[12px]
              sm:text-[14px]

              leading-[1.9]

              max-w-[700px]

              mx-auto

              mb-10
            "
          >
            Rooted in traditional wisdom, built with interlock mud block technology —
            Kalloviyam creates eco-friendly homes that are strong,
            comfortable, and timeless.
          </p>

          <div
  className="
    flex
    flex-row

    items-center
    justify-center

    gap-3
    sm:gap-5

    w-full
    max-w-[420px]

    mx-auto
  "
>

            <Link
              href="/services"
              className="
                h-[52px]
flex-1

                rounded-[10px]

                bg-[#C8862B]
                hover:bg-[#AA731F]

            
                font-medium

                flex
                items-center
                justify-center

                transition-all
                duration-300
              "
              style={{
    color: "#FFFFFF",
  }}
            >
              Our Services →
            </Link>

            <Link
              href="/projects"
              className="
                h-[52px]
flex-1

                rounded-[10px]

                border
                border-white/40

                bg-white/10
                backdrop-blur-md

                

                flex
                items-center
                justify-center

                hover:bg-white/20

                transition-all
                duration-300
              "
              style={{
    color: "#FFFFFF",
  }}
            >
              View Our Project
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}
//src/sections/about/AboutHero.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import AboutHomeImage from "@/assets/about-home.png";

export default function AboutHero() {
  return (
    <section
      className="
        relative
        pt-[105px]
sm:pt-[120px]
lg:pt-[140px]

pb-20
md:pb-28
      "
    >

      <div className="container">

        <div
          className="
            grid
            lg:grid-cols-2
            gap-16
            lg:gap-20
            items-center
          "
        >

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            {/* SMALL LABEL */}
            <div
              className="
                flex
                items-center
                gap-3
                mb-5
              "
            >

              <span className="w-8 h-[2px] bg-[#4F6743]" />

              <p
                className="
                  text-[#4F6743]
                  uppercase
                  tracking-[2px]
                  text-[11px]
                  font-semibold
                "
              >
                Legacy & Purpose
              </p>

            </div>

            {/* TITLE */}
            <h1
              className="
                text-[38px]
                sm:text-[46px]
                lg:text-[56px]

                leading-[1.1]

                font-bold

                text-[#1E1E1E]

                mb-7
              "
            >
              Our Story
            </h1>

            {/* DESCRIPTION */}
            <div
              className="
                flex
                flex-col
                gap-6
              "
            >

              <p
                className="
                  text-[#5E5E5E]
                  leading-[1.9]
                  text-[15px]
                "
              >
                Kalloviyam was born from a simple yet powerful belief —
                a home should breathe, just like the people who live in it.
                Rooted in traditional wisdom and shaped by modern sustainable
                practices, we set out to redefine how homes are built.
              </p>

              <p
                className="
                  text-[#5E5E5E]
                  leading-[1.9]
                  text-[15px]
                "
              >
                In an era dominated by concrete-heavy construction,
                we chose a different path. By embracing interlock building
                technology, we create homes that are structurally strong,
                thermally comfortable, environmentally responsible,
                and aesthetically timeless.
              </p>

              <p
                className="
                  text-[#5E5E5E]
                  leading-[1.9]
                  text-[15px]
                "
              >
                Every Kalloviyam home reflects our respect for nature,
                our commitment to craftsmanship,
                and our responsibility toward future generations.
              </p>

            </div>

            {/* BUTTON */}
            <Link
  href="/projects"
  className="
    mt-10

    h-[54px]
    px-10

    rounded-[12px]

    bg-[#4F6743]
    hover:bg-[#328C05]

    
    font-semibold
    text-[15px]

    inline-flex
    items-center
    justify-center

    transition-all
    duration-300
  "
  style={{
    color: "#FFFFFF",
  }}
>
  View Our Work →
</Link>

          </motion.div>


          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >

            {/* TOP SHAPE */}
            <div
              className="
                absolute
                -top-2
-right-2

sm:-top-4
sm:-right-8

lg:-top-5
lg:-right-5

                w-[60px]
h-[90px]

sm:w-[90px]
sm:h-[90px]

lg:w-[110px]
lg:h-[110px]

                bg-[#CBD2C7]

                block
              "
            />

            {/* BOTTOM SHAPE */}
            <div
              className="
                absolute
                -bottom-2
-left-2

sm:-bottom-4
sm:-left-4

lg:-bottom-5
lg:-left-5

                w-[45px]
h-[70px]

sm:w-[65px]
sm:h-[65px]

lg:w-[80px]
lg:h-[80px]

                bg-[#CBD2C7]

                block
              "
            />

            {/* IMAGE CARD */}
            <div
              className="
                relative
                z-10

                overflow-hidden
                rounded-[18px]

                shadow-[0_18px_60px_rgba(0,0,0,0.12)]

                bg-white

                p-3
              "
            >

              <div
                className="
                  relative

                  h-[300px]
                  sm:h-[420px]
                  lg:h-[520px]

                  overflow-hidden
                  rounded-[14px]
                "
              >

                <Image
  src={AboutHomeImage}
  alt="Kalloviyam Home"
  fill
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

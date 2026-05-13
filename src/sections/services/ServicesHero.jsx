"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import HeroImage from "@/assets/s_hero_image.png";

export default function ServicesHero() {
  return (
    <section
      className="
        pt-[110px]
        sm:pt-[120px]
        lg:pt-[150px]

        pb-20
      "
    >

      <div className="container">

        <div
          className="
            grid
            lg:grid-cols-2
            gap-14
            lg:gap-20
            items-center
          "
        >

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <div
              className="
                flex
                items-center
                gap-3
                mb-5
              "
            >

              <span className="w-9 h-[2px] bg-[#C8862B]" />

              <p
                className="
                  uppercase
                  tracking-[2px]
                  text-[11px]
                  font-semibold
                  text-[#C8862B]
                "
              >
                Erode, Tamil Nadu
              </p>

            </div>

            <h1
              className="
                text-[38px]
                sm:text-[52px]
                lg:text-[64px]

                leading-[1.1]

                font-semibold

                text-[#1D1D1D]

                mb-8
              "
            >
              <span className="italic font-light">
                Where
              </span>{" "}

              <span className="text-[#C8862B]">
                Roots
              </span>

              <br />

              <span className="italic font-light">
                Meet Architecture
              </span>
            </h1>

            <p
              className="
                text-[#555]
                text-[15px]
                sm:text-[16px]

                leading-[2]

                max-w-[560px]

                mb-10
              "
            >
              We build homes that carry the soul of Tamil tradition
              from Chettinad grandeur to breathable mud homes crafted
              with authentic materials and generational knowledge.
            </p>

            <Link
  href="/projects"
  className="
    h-[54px]
    px-10

    rounded-[10px]

    bg-[#C8862B]
    hover:bg-[#A96E1F]

    
    font-medium

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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <div
              className="
                relative

                h-[260px]
                sm:h-[360px]
                lg:h-[440px]

                overflow-hidden
                rounded-[18px]
              "
            >

              <Image
  src={HeroImage}
  alt="Kalloviyam Services"
  fill
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
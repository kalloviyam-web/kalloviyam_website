"use client";

import { motion } from "framer-motion";

export default function ServicesIntro() {
  return (
    <section className="pb-20">

      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >

          <div
            className="
              flex
              items-center
              justify-center
              gap-4

              mb-5
            "
          >

            <span className="w-12 h-[1px] bg-[#C8862B]" />

            <p
              className="
                uppercase
                tracking-[2px]
                text-[11px]
                font-semibold
                text-[#C8862B]
              "
            >
              Our Expertise
            </p>

            <span className="w-12 h-[1px] bg-[#C8862B]" />

          </div>

          <h2
            className="
              text-[34px]
              sm:text-[48px]

              leading-[1.2]

              mb-6
            "
          >
            <span className="italic font-light">
              Four Pillars of
            </span>{" "}

            <span className="text-[#C8862B]">
              Our Craft
            </span>
          </h2>

          <p
            className="
              max-w-[720px]
              mx-auto

              text-[#666]
              leading-[2]
            "
          >
            From heritage revival to sustainable innovation,
            every project blends tradition with modern engineering precision.
          </p>

        </motion.div>

      </div>

    </section>
  );
}
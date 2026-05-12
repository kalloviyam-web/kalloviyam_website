"use client";

import { motion } from "framer-motion";

import {
  ShieldCheck,
  Clock3,
  Users,
  Hammer,
  Star,
  Wind,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Materials",
    description:
      "We use only certified, long-lasting materials. Our interlocking mud blocks are tested for strength and durability.",
  },

  {
    icon: Clock3,
    title: "On-Time Delivery",
    description:
      "Professional workflow with transparent progress updates. Average villas time: 1 years, always on schedule.",
  },

  {
    icon: Users,
    title: "Skilled Team",
    description:
      "Experienced masons, carpenters, engineers, and planners combining traditional craftsmanship with modern expertise.",
  },

  {
    icon: Hammer,
    title: "Traditional Craftsmanship",
    description:
      "Heritage carpentry, pillars, doors, and Athangudi tiles — we maintain cultural heritage in every project.",
  },

  {
    icon: Star,
    title: "Customer Satisfaction",
    description:
      "Your vision becomes our priority. 95% client satisfaction rate with dedicated ongoing support after handover.",
  },

  {
    icon: Wind,
    title: "Breathable Homes",
    description:
      "Our mud block homes regulate temperature naturally — natural cooling, superior durability, reduced energy costs.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="pb-28 md:pb-36">

      <div className="container">

        {/* TITLE */}
        <div className="text-center mb-20">

          <h2
            className="
              text-[42px]
              sm:text-[58px]

              leading-[1.2]

              text-[#1F1F1F]

              mb-6
            "
          >
            Why Choose{" "}

            <span className="italic text-[#C8862B]">
              Kalloviyam
            </span>
          </h2>

          <p
            className="
              max-w-[760px]
              mx-auto

              text-[#666]

              leading-[1.9]

              mb-10
            "
          >
            We combine traditional craftsmanship with modern sustainability
            to create breathable, eco-friendly homes that stand the test of time.
          </p>

          <div
            className="
              w-[70px]
              h-[2px]

              bg-[#C8862B]

              mx-auto
            "
          />

        </div>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3

            gap-8
          "
        >

          {features.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="
                bg-white

                border
                border-[#ECECEC]

                rounded-[18px]

                p-8

                shadow-[0_6px_24px_rgba(0,0,0,0.04)]

                hover:-translate-y-2
                hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]

                transition-all
                duration-500
              "
            >

              <div
                className="
                  w-14
                  h-14

                  rounded-[14px]

                  bg-[#F6EFE6]

                  flex
                  items-center
                  justify-center

                  mb-6
                "
              >

                <item.icon
                  size={28}
                  strokeWidth={1.8}
                  className="text-[#C8862B]"
                />

              </div>

              <h3
                className="
                  text-[24px]

                  font-semibold

                  text-[#222]

                  mb-5
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  text-[#666]

                  leading-[1.9]
                "
              >
                {item.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}
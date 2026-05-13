//src/sections/home/ServicesPreview.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import Service1 from "@/assets/service1.png";
import Service2 from "@/assets/service2.png";
import Service3 from "@/assets/service3.png";
import Service4 from "@/assets/service4.png";

const services = [
  {
    title: "Traditional Architecture & Heritage Homes",
    image: Service1,
  },

  {
    title: "Eco-Friendly & Breathable Construction",
    image: Service2,
  },

  {
    title: "Modern Fusion & Turnkey Projects",
    image: Service3,
  },

  {
    title: "Renovation, Interiors & Landscape",
    image: Service4,
  },
];

export default function ServicesPreview() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container">
        {/* TOP */}
        <div
          className="
            flex
            flex-col
            lg:flex-row

            lg:items-end
            lg:justify-between

            gap-8

            mb-8
            lg:mb-14
          "
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-[#C8862B]" />

              <p
                className="
                  uppercase
                  tracking-[2px]
                  text-[11px]
                  font-semibold
                  text-[#C8862B]
                "
              >
                What We Build
              </p>
            </div>

            <h2
              className="
                text-[38px]
                sm:text-[54px]

                leading-[1.2]

                text-[#1F1F1F]
              "
            >
              Our <span className="italic text-[#C8862B]">Services</span>
            </h2>
          </div>

          <Link
            href="/services"
            className="
              hidden
              lg:inline-flex

              h-[52px]
              px-8

              rounded-[10px]

              bg-[#C8862B]
              hover:bg-[#AA731F]

              font-medium

              items-center
              justify-center

              transition-all
              duration-300
            "
            style={{
              color: "#FFFFFF",
            }}
          >
            Explore All Services →
          </Link>
        </div>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4

            gap-6
          "
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="
                group
                relative

                w-full
                h-[360px]

                overflow-hidden

                rounded-[14px]

                cursor-pointer
              "
            >
              {/* IMAGE */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="25vw"
                className="
                  object-cover

                  transition-transform
                  duration-700

                  group-hover:scale-[1.06]
                "
              />

              {/* OVERLAY */}
              <div
                className="
    absolute
    inset-0

    bg-gradient-to-t
    from-black/80
    via-black/35
    to-transparent
  "
              />

              {/* CONTENT */}
              <div
                className="
    absolute
    bottom-0
    left-0

    w-full

    p-5
    sm:p-6

    z-10
  "
              >
                {/* DESKTOP ANIMATION */}
                <div className="hidden lg:block overflow-hidden">
                  <div
                    className="
        transform
        translate-y-[72px]

        group-hover:translate-y-0

        transition-all
        duration-500
        ease-out
      "
                  >
                    <h3
                      className="
          text-white

          text-[17px]

          leading-[1.5]

          font-medium

          drop-shadow-md
        "
                    >
                      {service.title}
                    </h3>

                    <p
                      className="
          mt-3

          text-white/80

          text-[12px]

          leading-[1.7]

          opacity-0

          group-hover:opacity-100

          transition-all
          duration-500
          delay-100
        "
                    >
                      Timeless craftsmanship with premium quality construction
                      solutions for elegant living spaces.
                    </p>
                  </div>
                </div>

                {/* MOBILE / TABLET */}
                <div className="lg:hidden">
                  <h3
                    className="
        text-white

        text-[16px]

        leading-[1.5]

        font-medium

        drop-shadow-md
      "
                  >
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* BORDER */}
              <div
                className="
                  absolute
                  inset-0

                  rounded-[14px]

                  border
                  border-white/10

                  group-hover:border-[#C8862B]/50

                  transition-all
                  duration-500
                "
              />
            </motion.div>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <div
          className="
            flex
            justify-center

            mt-12

            lg:hidden
          "
        >
          <Link
            href="/services"
            className="
              h-[52px]
              px-8

              rounded-[10px]

              bg-[#C8862B]

              font-medium

              inline-flex
              items-center
              justify-center
            "
            style={{
              color: "#FFFFFF",
            }}
          >
            Explore All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}

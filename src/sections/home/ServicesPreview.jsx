"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import Service1 from "@/assets/service1.png";
import Service2 from "@/assets/service2.png";
import Service3 from "@/assets/service3.png";
import Service4 from "@/assets/service4.png";
import { TbHours24 } from "react-icons/tb";

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
              Our{" "}

              <span className="italic text-[#C8862B]">
                Services
              </span>
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

            gap-8
          "
        >

          {services.map((service, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="
                bg-white

                rounded-[10px]

                overflow-hidden

                border
                border-[#ECECEC]

                shadow-[0_6px_24px_rgba(0,0,0,0.05)]

                hover:-translate-y-2
                hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]

                transition-all
                duration-500
              "
            >

              <div
                className="
                  relative

                  h-[260px]

                  overflow-hidden
                "
              >

                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="25vw"
                  className="
                    object-cover

                    transition-transform
                    duration-700

                    hover:scale-105
                  "
                />

              </div>

              <div className="p-6">

                <h4
  className="
    text-[18px]
    sm:text-[20px]

    leading-[1.6]

    text-center

    text-[#222]

    font-medium

    max-w-[260px]

    mx-auto
  "
>
  {service.title}
</h4>

              </div>

            </motion.div>

          ))}

        </div>

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
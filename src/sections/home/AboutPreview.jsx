"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import Home1 from "@/assets/home_about_1.png";
import Home2 from "@/assets/home_about_2.png";
import Home3 from "@/assets/home_about_3.png";

export default function AboutPreview() {
  return (
    <section className="py-12 md:py-22">

      <div className="container">

        <div
          className="
            grid
            lg:grid-cols-2
            gap-16
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
                Who We Are
              </p>

            </div>

            <h2
              className="
                text-[38px]
                sm:text-[54px]

                leading-[1.2]

                text-[#1F1F1F]

                mb-7
              "
            >
              A Home Should{" "}

              <span className="italic text-[#C8862B]">
                Breathe,
              </span>

              {" "}Just Like the{" "}

              <span className="italic text-[#C8862B]">
                People
              </span>

              {" "}in It
            </h2>

            <div className="flex flex-col gap-6 mb-10">

              <p className="text-[#555] leading-[1.9]">
                Kalloviyam was born from a simple yet powerful belief.
                Rooted in traditional wisdom and shaped by modern sustainable practices,
                we set out to redefine how homes are built in Tamil Nadu.
              </p>

              <p className="text-[#555] leading-[1.9]">
                By embracing interlock building technology,
                we create homes that are structurally strong,
                thermally comfortable,
                environmentally responsible,
                and aesthetically timeless.
              </p>

            </div>

            <div className="flex flex-wrap gap-3 mb-10">

              {[
                "interlock technology",
                "mud block mastery",
                "heritage design",
                "vastu compliance",
              ].map((item) => (

                <div
                  key={item}
                  className="
                    px-4
                    py-2

                    rounded-full

                    bg-[#ECE7E2]

                    text-[#666]
                    text-[13px]
                  "
                >
                  {item}
                </div>

              ))}

            </div>

           <Link
  href="/about"
  className="
    inline-block

    border-b

    pb-[2px]

    hover:opacity-70

    transition-all
    duration-300
  "
  style={{
    color: "#C76F35",
    borderColor: "#C76F35",
  }}
>
  Read Our Full Story →
</Link>

          </motion.div>


          {/* RIGHT IMAGES */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <div className="grid grid-cols-2 gap-4">

              <div
                className="
                  relative

                  h-[420px]

                  overflow-hidden
                  rounded-[16px]
                  
                "
              >

                <Image
                  src={Home1}
                  alt="About"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />

              </div>

              <div className="flex flex-col gap-4">

                <div
                  className="
                    relative

                    h-[200px]

                    overflow-hidden
                    rounded-[16px]
                  "
                >

                  <Image
                    src={Home2}
                    alt="About"
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />

                </div>

                <div
  className="
    relative

    h-[200px]

    overflow-hidden
    rounded-[16px]
  "
>

  <Image
    src={Home3}
    alt="About"
    fill
    sizes="50vw"
    className="object-cover"
  />

</div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
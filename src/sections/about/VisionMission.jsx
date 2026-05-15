//src/sections/about/VisionMission.jsx
"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Compass,
} from "lucide-react";

export default function VisionMission() {
  return (
    <section className="pb-20 md:pb-28">

      <div className="container">

        <div
          className="
            grid
            md:grid-cols-2
            gap-8
          "
        >

          {/* VISION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              bg-[#F1ECEA]

              rounded-[18px]

              p-8
              md:p-10
            "
          >

            <div className="text-[#328C05] text-3xl mb-5">
              <Eye size={34} strokeWidth={2} />
            </div>

            <h2
              className="
                text-[30px]
                font-bold
                text-[#2A2A2A]
                mb-5
              "
            >
              Our Vision
            </h2>

            <p
              className="
                text-[#5A5A5A]
                leading-[1.9]
                text-[15px]
              "
            >
              To make eco-friendly homes accessible and promote sustainable living across Tamil Nadu.
            </p>

          </motion.div>


          {/* MISSION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="
              bg-[#494949]

              rounded-[18px]

              p-8
              md:p-10
            "
          >

            <div className="text-[#328C05] text-3xl mb-5">
              <Compass size={34} strokeWidth={2} />
            </div>

            <h2
              className="
                text-[30px]
                font-bold
                text-white
                mb-5
              "
            >
              Our Mission
            </h2>

            <p
              className="
                text-white/80
                leading-[1.9]
                text-[15px]
              "
            >
              Building high-quality, eco-friendly homes using advanced mud block technology,
              ensuring comfort, durability, and affordability.
            </p>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

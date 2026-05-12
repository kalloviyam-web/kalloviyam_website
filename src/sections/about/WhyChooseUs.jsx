//src/sections/about/WhyChooseUs.jsx
"use client";

import { motion } from "framer-motion";

import { Thermometer, Leaf, Shield, Wallet } from "lucide-react";

const features = [
  {
    title: "Thermal Comfort",
    description: "Natural insulation keeping homes cool in Tamil Nadu’s heat.",
    icon: Thermometer,
  },
  {
    title: "Zero Waste",
    description: "Minimizing environmental footprint through local materials.",
    icon: Leaf,
  },
  {
    title: "Structural Strength",
    description:
      "Interlocking technology provides superior earthquake resilience.",
    icon: Shield,
  },
  {
    title: "Affordability",
    description: "High-end sustainable design accessible for every family.",
    icon: Wallet,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-10
          "
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="text-center"
            >
              <div
                className="
    mb-6

    flex
    items-center
    justify-center

    text-[#B26E0C]
  "
              >
                <item.icon size={42} strokeWidth={1.8} />
              </div>

              <h3
                className="
                  text-[22px]
                  font-semibold
                  text-[#2A2A2A]
                  mb-4
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  text-[#666666]
                  text-[15px]
                  leading-[1.8]
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

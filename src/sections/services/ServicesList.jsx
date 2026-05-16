"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import Service1 from "@/assets/service1.png";
import Service2 from "@/assets/service2.png";
import Service3 from "@/assets/service3.png";
import Service4 from "@/assets/service4.png";

const services = [
  {
    id: "SERVICE 01",
    title: "Traditional Architecture",
    highlight: "& Heritage Homes",
    image: Service1,
    reverse: false,
    points: [
      "Chettinad-style home design with authentic details",
      "Kerala Nalukettu & courtyard (Mutram) homes",
      "Temple-inspired facades & village thinnai concepts",
      "Heritage carpentry, pillars, doors & Athangudi tiles",
    ],
  },

  {
    id: "SERVICE 02",
    title: "Eco-Friendly &",
    highlight: "Breathable Construction",
    image: Service2,
    reverse: true,
    points: [
      "Interlocking mud block & compressed earth block (CEB)",
      "Lime plaster, natural wall finishes & terracotta flooring",
      "Stone masonry with traditional craftsmanship",
      "Natural ventilation & passive heat reduction design",
    ],
  },

  {
    id: "SERVICE 03",
    title: "Modern Fusion &",
    highlight: "Turnkey Projects",
    image: Service3,
    reverse: false,
    points: [
      "RCC structure + traditional exterior blending",
      "Tile roof + steel hybrid systems",
      "2D/3D planning, MEP & structural engineering",
      "Complete Design → Build → Handover delivery",
    ],
  },

  {
    id: "SERVICE 04",
    title: "Renovation, Interiors",
    highlight: "& Landscape",
    image: Service4,
    reverse: true,
    points: [
      "Restoration of old village houses",
      "Interior design with terracotta, oxide & Athangudi flooring",
      "Courtyard, gardens & stone pathway landscaping",
      "Vastu-based layout & space planning",
    ],
  },
];

export default function ServicesList() {
  const router = useRouter();

  return (
    <section className="pb-28">
      <div className="container">
        <div className="flex flex-col gap-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`
 grid
lg:grid-cols-2
fd-lg-grid-2
  gap-10
  lg:gap-16
  items-center

  [&>*:first-child]:order-2
[&>*:last-child]:order-1

${
  service.reverse
    ? `
      lg:[&>*:first-child]:order-2
      lg:[&>*:last-child]:order-1
      fd-order-reverse
    `
    : `
      lg:[&>*:first-child]:order-1
      lg:[&>*:last-child]:order-2
      fd-order-normal
    `
}
`}
            >
              {/* CONTENT */}
              <div>
                <div
                  className="
                    inline-flex
                    items-center

                    px-5
                    h-[38px]

                    rounded-full

                    border
                    border-[#4F6743]

                    text-[#4F6743]
                    text-[12px]
                    tracking-[1px]

                    mb-7
                  "
                >
                  {service.id}
                </div>

                <h2
                  className="
                    text-[34px]
                    sm:text-[42px]

                    leading-[1.3]

                    text-[#1F1F1F]

                    mb-8
                  "
                >
                  {service.title}

                  <br />

                  <span
                    className="
                      italic
                      text-[#4F6743]
                      font-light
                    "
                  >
                    {service.highlight}
                  </span>
                </h2>

                <ul
                  className="
                    flex
                    flex-col
                    gap-5

                    mb-10
                  "
                >
                  {service.points.map((point, i) => (
                    <li
                      key={i}
                      className="
                        flex
                        gap-3

                        text-[#444]
                        leading-[1.8]
                      "
                    >
                      <span>•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => router.push("/contact")}
                  className="
                    text-[#4F6743]

                    underline

                    underline-offset-4

                    hover:opacity-70

                    transition-all
                  "
                >
                  Enquire about this service →
                </button>
              </div>

              {/* IMAGE */}
              <div>
                <div
                  className="
                    relative

                    h-[300px]
                    sm:h-[420px]
                    lg:h-[500px]

                    overflow-hidden
                    rounded-[18px]
                  "
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";

import { ChevronLeft, ChevronRight } from "lucide-react";

import Hero1 from "@/assets/hero1.png";
import Hero2 from "@/assets/hero2.png";
import Hero3 from "@/assets/hero3.png";
import Hero4 from "@/assets/hero4.png";
import Hero5 from "@/assets/hero5.png";

const heroSlides = [
  {
    image: Hero1,
    heading: "Living in Harmony With Nature",
  },

  {
    image: Hero2,
    heading: "Tradition Crafted for Modern Living",
  },

  {
    image: Hero3,
    heading: "Elegant Spaces, Timeless Impressions",
  },

  {
    image: Hero4,
    heading: "Where Nature Meets Modern Comfort",
  },

  {
    image: Hero5,
    heading: "Designed for Peaceful Living",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  /* AUTO SLIDE */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  /* NEXT */
  const nextSlide = () => {
    setCurrent((prev) =>
      prev === heroSlides.length - 1 ? 0 : prev + 1
    );
  };

  /* PREV */
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  return (
    <motion.section
  onPanEnd={(event, info) => {
    if (info.offset.x < -80) {
      nextSlide();
    }

    if (info.offset.x > 80) {
      prevSlide();
    }
  }}
      className="
        relative

        h-screen
        min-h-[100svh]

        overflow-hidden

        touch-pan-y
      "
    >
      {/* BACKGROUND IMAGE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{
            scale: 1.08,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1.6,
            ease: "easeOut",
          }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[current].image}
            alt={heroSlides[current].heading}
            fill
            priority
            className="
              object-cover

              select-none
              pointer-events-none
            "
          />
        </motion.div>
      </AnimatePresence>

      {/* DARK OVERLAY */}
      <div
        className="
          absolute
          inset-0

          bg-black/45
        "
      />

      {/* CINEMATIC OVERLAY */}
      <div
        className="
          absolute
          inset-0

          bg-gradient-to-t
          from-black/70
          via-black/20
          to-black/10
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10

          h-full

          flex
          items-center
          justify-center

          text-center
        "
      >
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -30,
              }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
              }}
              className="
                px-5

                flex
                flex-col

                items-center
                justify-center

                text-center
              "
            >
              {/* TOP LABEL */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                }}
                className="
                  text-[#D7B27A]

                  uppercase

                  tracking-[8px]

                  text-[8px]
                  sm:text-[11px]

                  font-medium

                  mb-6
                "
              >
                Kalloviyam • Tropical Living
              </motion.p>

              {/* HEADING */}
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 0.25,
                }}
                className="
                  text-white

                  text-[18px]
                  sm:text-[20px]
                  lg:text-[30px]

                  leading-[2.0]

                  font-[300]

                  tracking-[3px]

                  text-center

                  max-w-[1100px]

                  mx-auto
                "
                style={{
                  fontFamily: "serif",
                }}
              >
                {heroSlides[current].heading}
              </motion.h1>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* DESKTOP ARROWS */}
      <div
        className="
          hidden
          lg:flex

          absolute
          inset-y-0

          w-full

          items-center
          justify-between

          px-8

          z-20
        "
      >
        <button
          onClick={prevSlide}
          className="
            w-[52px]
            h-[52px]

            rounded-full

            bg-white/10
            backdrop-blur-md

            border
            border-white/20

            text-white

            flex
            items-center
            justify-center

            hover:bg-white/20

            transition-all
            duration-300
          "
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          className="
            w-[52px]
            h-[52px]

            rounded-full

            bg-white/10
            backdrop-blur-md

            border
            border-white/20

            text-white

            flex
            items-center
            justify-center

            hover:bg-white/20

            transition-all
            duration-300
          "
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* INDICATORS */}
      <div
        className="
          absolute
          bottom-8
          left-1/2

          -translate-x-1/2

          flex
          items-center

          gap-3

          z-20
        "
      >
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              rounded-full

              transition-all
              duration-500

              ${
                current === index
                  ? "w-[34px] h-[8px] bg-white"
                  : "w-[8px] h-[8px] bg-white/40"
              }
            `}
          />
        ))}
      </div>
    </motion.section>
  );
}
"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

import { Plus, Minus } from "lucide-react";

export default function FloatingContactButtons() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="
        fixed
        bottom-8
        right-6

        sm:bottom-5
        sm:right-5

        md:bottom-6
        md:right-6

        z-[9999]

        flex
        flex-col
        items-center
        gap-2.5
      "
    >
      {/* FLOATING ICONS */}
      <AnimatePresence>
        {open && (
          <>
            {/* PHONE */}
            <motion.a
              href="tel:+917010100073"
              initial={{
                opacity: 0,
                y: 12,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 12,
                scale: 0.75,
              }}
              transition={{
                duration: 0.22,
              }}
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.92,
              }}
              className="
                w-[38px]
                h-[38px]

                sm:w-[42px]
                sm:h-[42px]

                md:w-[46px]
                md:h-[46px]

                rounded-full

                bg-[#4F6743]

                flex
                items-center
                justify-center

                shadow-[0_8px_25px_rgba(0,0,0,0.18)]

                border
                border-white/10
              "
            >
              <FaPhoneAlt
                className="
                  text-white

                  text-[13px]

                  sm:text-[14px]

                  md:text-[15px]
                "
              />
            </motion.a>

            {/* WHATSAPP */}
            <motion.a
              href="https://wa.me/917010100073"
              target="_blank"
              rel="noopener noreferrer"
              initial={{
                opacity: 0,
                y: 12,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 12,
                scale: 0.75,
              }}
              transition={{
                duration: 0.22,
                delay: 0.04,
              }}
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.92,
              }}
              className="
                w-[38px]
                h-[38px]

                sm:w-[42px]
                sm:h-[42px]

                md:w-[46px]
                md:h-[46px]

                rounded-full

                bg-[#4F6743]

                flex
                items-center
                justify-center

                shadow-[0_8px_25px_rgba(0,0,0,0.18)]

                border
                border-white/10
              "
            >
              <FaWhatsapp
                className="
                  text-white

                  text-[18px]

                  sm:text-[20px]

                  md:text-[22px]
                "
              />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* MAIN BUTTON */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.92 }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className="
          relative

          w-[42px]
          h-[42px]

          sm:w-[42px]
          sm:h-[42px]

          md:w-[42px]
          md:h-[42px]

          rounded-full

          bg-white/88

          border
          border-black/5

          flex
          items-center
          justify-center

          shadow-[0_8px_24px_rgba(0,0,0,0.10)]

          transition-all
          duration-300
        "
      >
        {/* ICON */}
        <span
          className="
    relative
    z-10

    text-black/75

    leading-none

    flex
    items-center
    justify-center
  "
        >
          {open ? (
            <Minus size={20} strokeWidth={1.5} />
          ) : (
            <Plus size={20} strokeWidth={1.5} />
          )}
        </span>
      </motion.button>
    </div>
  );
}

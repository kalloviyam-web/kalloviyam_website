"use client";

import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaGlobe,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShareAlt,
} from "react-icons/fa";

import data from "./data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: (i) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function VisitingCardClient() {
 const [loading, setLoading] = useState(true);

const [showMain, setShowMain] = useState(false);
  

  useEffect(() => {
  const loadingTimer = setTimeout(() => {
    setLoading(false);

    setTimeout(() => {
      setShowMain(true);
    }, 300);
  }, 3200);

  return () => clearTimeout(loadingTimer);
}, []);

  const saveContact = () => {
    const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${data.owner}
ORG:${data.company}
TEL:${data.phone}
EMAIL:${data.email}
URL:${data.website}
ADR:${data.address}
END:VCARD
`;

    const blob = new Blob([vCard], {
      type: "text/vcard",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = `${data.company}.vcf`;

    link.click();
  };

  const shareProfile = async () => {
    if (navigator.share) {
      navigator.share({
        title: data.company,
        text: "Kalloviyam Constructions",
        url: window.location.href,
      });
    }
  };

  return (
    <>
      {/* INTRO SCREEN */}
      <AnimatePresence mode="wait">
  {loading && (
    <motion.div
      key="intro-screen"
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
  opacity: 0,
  scale: 1,
  y: -8,
}}
      transition={{
        duration: 1.4,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="
        fixed
        inset-0
        z-[9999]
        overflow-hidden
        bg-[#F7F3F0]
        flex
        items-center
        justify-center
      "
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#EFE7E2,#F7F3F0_65%)]" />

      {/* Animated Glow */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
x: [0, 20, -20, 0],
y: [0, -10, 10, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          w-[500px]
          h-[500px]
          bg-[#C6A16E15]
          rounded-full
          blur-3xl
        "
      />

      <div className="relative z-10 text-center px-6">

        {/* Logo */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.4,
            rotate: -12,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-[#C6A16E30] blur-3xl rounded-full" />

          <motion.img
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            src="/visiting-card/logo.png"
            alt="logo"
            className="relative w-36 mx-auto"
          />
        </motion.div>

        {/* Brand */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 40,
            letterSpacing: "18px",
          }}
          animate={{
            opacity: 1,
            y: 0,
            letterSpacing: "8px",
          }}
          transition={{
            delay: 0.5,
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-14
            text-[40px]
            md:text-[52px]
            leading-none
           text-[#1F2937]
            font-light
          "
          style={{
            fontFamily: cormorant.style.fontFamily,
          }}
        >
          KALLOVIYAM
        </motion.h1>

        {/* Welcome */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.4,
duration: 1.4,
ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8"
        >
          <p
            className="
              text-[#C6A16E]
              text-[15px]
              tracking-[6px]
              uppercase
              font-medium
            "
            style={{
              fontFamily: montserrat.style.fontFamily,
            }}
          >
            Welcome To
          </p>

          <p
            className="
              text-[#1F2937]
              text-[24px]
              tracking-[3px]
              mt-3
              font-light
            "
            style={{
              fontFamily: montserrat.style.fontFamily,
            }}
          >
            Kalloviyam Constructions
          </p>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      {/* MAIN PAGE */}
      {showMain && (
  <motion.main
  initial={{
    opacity: 0,
  }}
  animate={{
    opacity: loading ? 0 : 1,
  }}
  transition={{
    duration: 0.6,
delay: 0,
  }}
 className="
  relative
  min-h-screen
  overflow-hidden
  bg-[#F7F3F0]
  text-[#1F2937]
  will-change-transform
  translate-z-0
"
>
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#EFE7E2,#F7F3F0_65%)]" />

        {/* Glow */}
        <div className="absolute top-[-120px] left-[-120px] w-96 h-96 bg-[#C6A16E15] rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-[#C6A16E08] rounded-full blur-3xl" />

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative z-10 w-full max-w-md mx-auto px-6 py-14">
          {/* HERO */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0,
              duration: 1,
            }}
            className="text-center"
          >
            {/* Floating Logo */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative inline-block"
            >
              <div className="absolute inset-0 bg-[#C6A16E30] blur-3xl rounded-full" />

              <img
                src="/visiting-card/logo.png"
                alt="logo"
                className="relative w-32 mx-auto"
              />
            </motion.div>

            {/* Logo Text */}
            <img
              src="/visiting-card/logo-text.png"
              alt="logo text"
              className="w-64 mx-auto -mt-4 opacity-90 object-contain"
            />

            {/* Owner */}
            <h2 className="text-4xl font-semibold mt-6 tracking-wide">
              {data.owner}
            </h2>

            {/* Role */}
            <p className="text-[#C6A16E] mt-3 text-sm tracking-[4px] uppercase">
              {data.role}
            </p>

            {/* Divider */}
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C6A16E] to-transparent mx-auto mt-8" />
          </motion.div>

          {/* CONTACT CARDS */}
          <div className="space-y-4 mt-10">
            <PremiumCard
              index={0}
              icon={<FaMapMarkerAlt />}
              title="Location"
              subtitle="33/89, MGR St, Jansi Nagar, Veerappanchatram, Erode, Tamil Nadu 638004"
              link={data.map}
            />

            <PremiumCard
              index={1}
              icon={<FaEnvelope />}
              title="Email"
              subtitle={data.email}
              link={`mailto:${data.email}`}
            />

            <PremiumCard
              index={2}
              icon={<FaWhatsapp />}
              title="WhatsApp"
              subtitle="+91 70101 00073"
              link={`https://wa.me/91${data.whatsapp}`}
            />

            <PremiumCard
              index={3}
              icon={<FaInstagram />}
              title="Instagram"
              subtitle={data.instagram.name}
              link={data.instagram.link}
            />

            <PremiumCard
              index={4}
              icon={<FaFacebookF />}
              title="Facebook"
              subtitle={data.facebook.name}
              link={data.facebook.link}
            />

            <PremiumCard
              index={5}
              icon={<FaYoutube />}
              title="YouTube"
              subtitle={data.youtube.name}
              link={data.youtube.link}
            />

            <PremiumCard
              index={6}
              icon={<FaGlobe />}
              title="Website"
              subtitle="www.kalloviyam.com"
              link={data.website}
            />

            <PremiumCard
              index={7}
              icon={<FaMapMarkerAlt />}
              title="Direction"
              subtitle="Click To View Direction"
              link={data.map}
            />
          </div>

          {/* BUTTONS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 2.5,
            }}
            className="grid grid-cols-2 gap-4 mt-10"
          >
            <button
              onClick={saveContact}
              className="
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-[#C6A16E]
to-[#B0895A]
                text-black
                font-semibold
                shadow-[0_12px_40px_rgba(198,161,110,0.18)]
                hover:scale-[1.03]
                transition
                duration-300
              "
            >
              Save Contact
            </button>

            <button
              onClick={shareProfile}
              className="
                h-14
                rounded-2xl
                border
                border-[#E5DDD5]
                bg-white/70
                backdrop-blur-xl
                text-[#1F2937]
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                hover:bg-white/90
                hover:scale-[1.03]
                transition
                duration-300
              "
            >
              <FaShareAlt />
              Share
            </button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 3,
            }}
            className="text-center mt-14"
          >
          </motion.div>
        </div>
      </motion.main>
)}
    </>
  );
}

function PremiumCard({ icon, title, subtitle, link, index }) {
  return (
    <motion.a
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      href={link}
      target="_blank"
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[#E5DDD5]
        bg-white/70
       backdrop-blur-md
        p-5
        flex
        items-center
        gap-5
        hover:border-[#C6A16E50]
        transition
        duration-500
      "
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-[#C6A16E10] to-transparent" />

      {/* Icon */}
      <div
        className="
        relative
        z-10
        w-14
        h-14
        rounded-2xl
        bg-[#C6A16E15]
        border
        border-[#C6A16E20]
        flex
        items-center
        justify-center
        text-[#C6A16E]
        text-xl
        shadow-[0_10px_30px_rgba(198,161,110,0.08)]
      "
      >
        {icon}
      </div>

      {/* Text */}
      <div className="relative z-10 flex-1">
        <h3 className="text-lg font-semibold text-[#1F2937]">{title}</h3>

        <p className="text-sm text-[#6B7280] mt-1 leading-6">{subtitle}</p>
      </div>
    </motion.a>
  );
}

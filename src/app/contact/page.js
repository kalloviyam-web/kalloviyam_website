// src/app/contact/page.js
"use client";

import { useState } from "react";

import { Phone, MapPin, Mail } from "lucide-react";

import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    enquiryType: "Normal Enquiry",
    message: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWhatsAppSubmit = () => {
    const text = `
New Enquiry - Kalloviyam

Full Name: ${formData.fullName}

Email: ${formData.email}

Phone: ${formData.phone}

Location: ${formData.location}

Enquiry Type: ${formData.enquiryType}

Message:
${formData.message}
    `;

    const whatsappUrl = `https://wa.me/917010100073?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <main
      className="
        pt-[90px]
        sm:pt-[100px]
        lg:pt-[120px]

        pb-24
        md:pb-32
      "
    >
      <div className="container">
        {/* TOP */}
        <div className="text-center mb-14 md:mb-20">
          <h1
            className="
              text-[25px]
              sm:text-[30px]
              lg:text-[40px]

              font-semibold

              text-[#946700]

              mb-3
            "
          >
            Get in Touch
          </h1>

          <p
            className="
              text-[#D48716]

              text-[15px]
              sm:text-[18px]

              leading-[1.8]

              max-w-[700px]

              mx-auto
            "
          >
            Experience personalized service tailored to your high-end real
            estate requirements.
          </p>
        </div>

        {/* MAIN GRID */}
        <div
          className="
            grid
            lg:grid-cols-2

            gap-14
            lg:gap-20

            items-start
          "
        >
          {/* LEFT */}
          <div>
            {/* CALL */}
            <div className="flex gap-5 mb-12">
              <div
                className="
                  w-[60px]
                  h-[60px]

                  rounded-[14px]

                  bg-[#F4E7CC]

                  flex
                  items-center
                  justify-center

                  shrink-0
                "
              >
                <Phone size={28} strokeWidth={1.8} color="#946700" />
              </div>

              <div>
                <p
                  className="
                    text-[#5C5C5C]
                    text-[15px]
                    font-semibold
                    mb-2
                  "
                >
                  Call Us
                </p>

                <a
                  href="tel:+917010100073"
                  className="
                    text-[#2A2A2A]

                    text-[17px]
                    font-semibold
                  "
                >
                  +91 7010100073
                </a>
              </div>
            </div>

            {/* LOCATION */}
            <div className="flex gap-5 mb-12">
              <div
                className="
                  w-[60px]
                  h-[60px]

                  rounded-[14px]

                  bg-[#F4E7CC]

                  flex
                  items-center
                  justify-center

                  shrink-0
                "
              >
                <MapPin size={28} strokeWidth={1.8} color="#946700" />
              </div>

              <div>
                <p
                  className="
                    text-[#5C5C5C]
                    text-[15px]
                    font-semibold
                    mb-2
                  "
                >
                  Our Location
                </p>

                <p
                  className="
                    text-[#2A2A2A]

                    text-[17px]
                    font-semibold

                    leading-[1.8]
                  "
                >
                  33/89, MGR St, Jansi Nagar, Veerappanchatram, Erode,
                  <br />
                  Tamil Nadu - 638004
                </p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex gap-5 mb-12">
              <div
                className="
                  w-[60px]  
                  h-[60px]

                  rounded-[14px]

                  bg-[#F4E7CC]

                  flex
                  items-center
                  justify-center

                  shrink-0
                "
              >
                <Mail size={28} strokeWidth={1.8} color="#946700" />
              </div>

              <div>
                <p
                  className="
                    text-[#5C5C5C]
                    text-[15px]
                    font-semibold
                    mb-2
                  "
                >
                  Email Inquiries
                </p>

                <a
                  href="mailto:kalloviyam@gmail.com"
                  className="
                    text-[#2A2A2A]

                    text-[17px]
                    font-semibold
                  "
                >
                  kalloviyam@gmail.com
                </a>
              </div>
            </div>


            {/* MAP */}
            <a
              href="https://maps.app.goo.gl/DNJNz3ucrW52cCaZ7"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div
                className="
                  overflow-hidden
                  rounded-[18px]

                  border
                  border-[#E9E9E9]
                "
              >
                <iframe
                  src="https://maps.google.com/maps?q=33/89,%20MGR%20St,%20Jansi%20Nagar,%20Veerappanchatram,%20Erode,%20Tamil%20Nadu%20638004&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="
                    w-full
                    h-[320px]

                    border-0
                  "
                  loading="lazy"
                />
              </div>
            </a>
          </div>

          {/* RIGHT FORM */}
          <div
            className="
              bg-white

              rounded-[24px]

              border
              border-[#F0E3D6]

              shadow-[0_10px_40px_rgba(0,0,0,0.04)]

              p-6
              sm:p-10
            "
          >
            <h2
              className="
                text-[25px]
                sm:text-[32px]

                font-semibold

                text-black

                mb-10
              "
            >
              Send an Enquiry
            </h2>

            <div className="space-y-7">
              {/* NAME + EMAIL */}
              <div
                className="
                  grid
                  sm:grid-cols-2
                  gap-5
                "
              >
                <div>
                  <label
                    className="
                      block

                      text-[14px]
                      font-semibold

                      text-[#444]

                      mb-3
                    "
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="
                      w-full
                      h-[56px]

                      rounded-[10px]

                      border
                      border-[#D8D8D8]

                      px-4

                      outline-none

                      focus:border-[#C8862B]
                    "
                  />
                </div>

                <div>
                  <label
                    className="
                      block

                      text-[14px]
                      font-semibold

                      text-[#444]

                      mb-3
                    "
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="
                      w-full
                      h-[56px]

                      rounded-[10px]

                      border
                      border-[#D8D8D8]

                      px-4

                      outline-none

                      focus:border-[#C8862B]
                    "
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label
                  className="
                    block

                    text-[14px]
                    font-semibold

                    text-[#444]

                    mb-3
                  "
                >
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="
                    w-full
                    h-[56px]

                    rounded-[10px]

                    border
                    border-[#D8D8D8]

                    px-4

                    outline-none

                    focus:border-[#C8862B]
                  "
                />
              </div>

              {/* LOCATION */}
              <div>
                <label
                  className="
                    block

                    text-[14px]
                    font-semibold

                    text-[#444]

                    mb-3
                  "
                >
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Coimbatore, Tamil Nadu"
                  className="
                    w-full
                    h-[56px]

                    rounded-[10px]

                    border
                    border-[#D8D8D8]

                    px-4

                    outline-none

                    focus:border-[#C8862B]
                  "
                />
              </div>

              {/* ENQUIRY TYPE */}
              <div className="relative">
                <label
                  className="
      block

      text-[14px]
      font-semibold

      text-[#444]

      mb-3
    "
                >
                  Enquiry Type
                </label>

                {/* SELECT BOX */}
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="
      h-[56px]

      rounded-[14px]

      border
      border-[#D8D8D8]

      bg-white

      px-5

      flex
      items-center
      justify-between

      cursor-pointer

      transition-all
      duration-300

      hover:border-[#C8862B]

      shadow-[0_4px_12px_rgba(0,0,0,0.03)]
    "
                >
                  <span className="text-[#222] text-[16px]">
                    {formData.enquiryType}
                  </span>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`
        transition-transform
        duration-300
        ${dropdownOpen ? "rotate-180" : ""}
      `}
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#343434"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* DROPDOWN MENU */}
                {dropdownOpen && (
                  <div
                    className="
  absolute
  left-0
  top-[92px]

  w-full

  overflow-hidden

  rounded-[14px]

  border
  border-[#E5D6C7]

  bg-white

  shadow-[0_15px_35px_rgba(0,0,0,0.08)]

  z-50

      "
                  >
                    {["Project", "Vendor", "Normal Enquiry"].map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            enquiryType: item,
                          });

                          setDropdownOpen(false);
                        }}
                        className={`
            px-5
            py-4

            cursor-pointer

            transition-all
            duration-200

            text-[15px]

            ${
              formData.enquiryType === item
                ? "bg-[#F8EFE3] text-[#C8862B]"
                : "hover:bg-[#FAF6F1] text-[#222]"
            }
          `}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  className="
                    block

                    text-[14px]
                    font-semibold

                    text-[#444]

                    mb-3
                  "
                >
                  Message
                </label>

                <textarea
                  rows={6}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we assist you with your property search?"
                  className="
                    w-full

                    rounded-[10px]

                    border
                    border-[#D8D8D8]

                    px-4
                    py-4

                    outline-none

                    resize-none

                    focus:border-[#C8862B]
                  "
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={handleWhatsAppSubmit}
                className="
                  w-full
                  h-[58px]

                  rounded-[10px]

                  bg-[#A67811]
                  hover:bg-[#8E650D]

                  text-white

                  text-[15px]
                  font-semibold

                  tracking-[1px]

                  shadow-[0_10px_20px_rgba(0,0,0,0.08)]

                  transition-all
                  duration-300
                "
              >
                SEND MESSAGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

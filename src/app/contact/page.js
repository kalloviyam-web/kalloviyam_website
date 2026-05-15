// src/app/contact/page.js
"use client";

import { useState } from "react";

import { Phone, MapPin, Mail } from "lucide-react";

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

    const whatsappUrl = `https://wa.me/917010100073?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <main
      className="
        pt-[90px]
        sm:pt-[100px]
        lg:pt-[120px]

        pb-20
        md:pb-24
      "
    >
      <div className="container">
        {/* MAIN GRID */}
        <div
          className="
            grid
            lg:grid-cols-[0.9fr_1.1fr]

            gap-10
            lg:gap-14

            items-start
          "
        >
          {/* LEFT */}
          <div>
            {/* CALL */}
            <div
              className="
                flex
                items-center

                gap-4

                mb-6
              "
            >
              <div
                className="
                  w-[42px]
                  h-[42px]

                  rounded-[10px]

                  bg-[#CBD2C7]

                  flex
                  items-center
                  justify-center

                  shrink-0
                "
              >
                <Phone
                  size={18}
                  strokeWidth={1.8}
                  color="#328C05"
                />
              </div>

              <a
                href="tel:+917010100073"
                className="
                  text-[#2A2A2A]

                  text-[15px]

                  font-medium

                  leading-none
                "
              >
                +91 7010100073
              </a>
            </div>

            {/* EMAIL */}
            <div
              className="
                flex
                items-center

                gap-4

                mb-7
              "
            >
              <div
                className="
                  w-[42px]
                  h-[42px]

                  rounded-[10px]

                  bg-[#CBD2C7]

                  flex
                  items-center
                  justify-center

                  shrink-0
                "
              >
                <Mail
                  size={18}
                  strokeWidth={1.8}
                  color="#328C05"
                />
              </div>

              <a
                href="mailto:kalloviyam@gmail.com"
                className="
                  text-[#2A2A2A]

                  text-[15px]

                  font-medium

                  leading-none
                "
              >
                kalloviyam@gmail.com
              </a>
            </div>

            {/* LOCATION */}
            <div
              className="
                flex
                items-center

                gap-4

                mb-6
              "
            >
              <div
                className="
                  w-[42px]
                  h-[42px]

                  rounded-[10px]

                  bg-[#CBD2C7]

                  flex
                  items-center
                  justify-center

                  shrink-0
                "
              >
                <MapPin
                  size={18}
                  strokeWidth={1.8}
                  color="#328C05"
                />
              </div>

              <p
                className="
                  text-[#2A2A2A]

                  text-[15px]

                  font-medium

                  leading-[1.7]
                "
              >
                33/89, MGR St, Jansi Nagar,
                Veerappanchatram, Erode,
                <br />
                Tamil Nadu - 638004
              </p>
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

                  rounded-[16px]

                  border
                  border-[#E9E9E9]
                "
              >
                <iframe
                  src="https://maps.google.com/maps?q=33/89,%20MGR%20St,%20Jansi%20Nagar,%20Veerappanchatram,%20Erode,%20Tamil%20Nadu%20638004&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="
                    w-full
                    h-[280px]

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
              w-full

              bg-white

              rounded-[18px]

              border
              border-[#F0E3D6]

              shadow-[0_10px_40px_rgba(0,0,0,0.04)]

              p-5
              sm:p-6
            "
          >
            <h2
              className="
                text-[22px]
                sm:text-[28px]

                font-semibold

                text-black

                mb-5
              "
            >
              Send an Enquiry
            </h2>

            <div className="space-y-4">
              {/* NAME + EMAIL */}
              <div
                className="
                  grid
                  sm:grid-cols-2

                  gap-4
                "
              >
                <div>
                  <label
                    className="
                      block

                      text-[13px]

                      font-medium

                      text-[#444]

                      mb-2
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
                      h-[44px]

                      rounded-[10px]

                      border
                      border-[#D8D8D8]

                      px-4

                      text-[14px]

                      outline-none

                      focus:border-[#C8862B]
                    "
                  />
                </div>

                <div>
                  <label
                    className="
                      block

                      text-[13px]

                      font-medium

                      text-[#444]

                      mb-2
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
                      h-[44px]

                      rounded-[10px]

                      border
                      border-[#D8D8D8]

                      px-4

                      text-[14px]

                      outline-none

                      focus:border-[#C8862B]
                    "
                  />
                </div>
              </div>

              {/* LOCATION */}
              <div>
                <label
                  className="
                    block

                    text-[13px]

                    font-medium

                    text-[#444]

                    mb-2
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
                    h-[44px]

                    rounded-[10px]

                    border
                    border-[#D8D8D8]

                    px-4

                    text-[14px]

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

                    text-[13px]

                    font-medium

                    text-[#444]

                    mb-2
                  "
                >
                  Enquiry Type
                </label>

                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="
                    h-[44px]

                    rounded-[10px]

                    border
                    border-[#D8D8D8]

                    bg-white

                    px-4

                    flex
                    items-center
                    justify-between

                    cursor-pointer

                    transition-all
                    duration-300

                    hover:border-[#CBD2C7]
                  "
                >
                  <span className="text-[#222] text-[14px]">
                    {formData.enquiryType}
                  </span>

                  <svg
                    width="16"
                    height="16"
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* DROPDOWN */}
                {dropdownOpen && (
                  <div
                    className="
                      absolute
                      left-0
                      top-[78px]

                      w-full

                      overflow-hidden

                      rounded-[12px]

                      border
                      border-[#E5D6C7]

                      bg-white

                      shadow-[0_15px_35px_rgba(0,0,0,0.08)]

                      z-50
                    "
                  >
                    {[
                      "Project",
                      "Vendor",
                      "Normal Enquiry",
                    ].map((item) => (
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
                          px-4
                          py-3

                          cursor-pointer

                          transition-all
                          duration-200

                          text-[14px]

                          ${
                            formData.enquiryType === item
                              ? "bg-[#CBD2C7] text-[#4F6743]"
                              : "hover:bg-[#F0FFE9] text-[#222]"
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

                    text-[13px]

                    font-medium

                    text-[#444]

                    mb-2
                  "
                >
                  Message
                </label>

                <textarea
                  rows={3}
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
                    py-3

                    text-[14px]

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
                  h-[46px]

                  rounded-[10px]

                  bg-[#4F6743]
                  hover:bg-[#328C05]

                  text-white

                  text-[14px]

                  font-medium

                  tracking-[1px]

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
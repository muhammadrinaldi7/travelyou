"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMailForward,
  faMap,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useFetchPaymentMethod } from "@/api/hooks/Payment/useFetchPaymenMethod";
import endpoints from "@/api/endpoints";
import { usePaymentStore } from "@/stores/paymentStore";
// Logo Bank

const Footer = () => {
  const { data: paymentMethodBanks } = useFetchPaymentMethod(
    endpoints.paymentMethod
  );
  const { setPaymentMethodBanks, paymentMethodBanks: dataPayment } =
    usePaymentStore();
  useEffect(() => {
    if (paymentMethodBanks) {
      setPaymentMethodBanks(paymentMethodBanks.data);
    }
  }, [paymentMethodBanks, setPaymentMethodBanks]);
  // console.log(dataPayment);
  return (
    <footer className="container mx-auto text-white bg-primary-300">
      <div className="px-5 pt-16 pb-8 ">
        {/* Footer Content */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Tentang Perusahaan */}
          <div>
            <h3 className="mb-4 text-2xl font-bold">TravelYouuu</h3>
            <p className="mb-4 text-white">
              Jelajahi dunia dengan mudah dan nyaman bersama TravelYouuu.
              Pengalaman perjalanan terbaik hanya dalam satu sentuhan.
            </p>

            {/* Sosial Media */}
            <div className="flex mt-4 space-x-4">
              {[
                { icon: <FontAwesomeIcon icon={faFacebook} />, link: "#" },
                { icon: <FontAwesomeIcon icon={faInstagram} />, link: "#" },
                { icon: <FontAwesomeIcon icon={faTwitter} />, link: "#" },
                { icon: <FontAwesomeIcon icon={faLinkedin} />, link: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="text-white transition-colors hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-bold">Tautan Cepat</h4>
            <ul className="space-y-2">
              {[
                "Beranda",
                "Destinasi",
                "Paket Wisata",
                "Tentang Kami",
                "Kontak",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-white transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Metode Pembayaran */}
          <div>
            <h4 className="mb-4 font-bold">Metode Pembayaran</h4>
            <div className="grid grid-cols-3 gap-4">
              {dataPayment?.map((bank, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-2 drop-shadow-md rounded-lg bg-white/90"
                >
                  <Image
                    src={bank.imageUrl || "/img/noimage.webp"}
                    alt={bank.name}
                    width={1000}
                    height={1000}
                    className="transition-all w-16 h-8 drop-shadow-lg grayscale hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Kontak */}
          <div className="flex flex-col items-center">
            <h4 className="mb-6 font-bold">Hubungi Kami</h4>
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faMailForward}
                  className="w-5 h-5 text-white"
                />
                <span>support@travelyouuu.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faMap} className="w-5 h-5 text-white" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="w-5 h-5 text-white"
                />
                <span>+62 812-3456-7890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 mt-6 text-center border-t border-white">
          <p className="text-white">
            © {new Date().getFullYear()} TravelYouuu. All Rights Reserved.
            Designed with ❤️ by TravelYouuu Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

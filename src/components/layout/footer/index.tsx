// components/Footer.tsx
import React from 'react';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faMailForward, faMap, faPhone } from '@fortawesome/free-solid-svg-icons';

// Logo Bank
const bankLogos = [
    {
        "id": "4c0108a5-5ba9-4ee2-b688-7fbfbdab2576",
        "name": "BCA",
        "imageUrl": "https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/bca-logo.svg"
    },
    {
        "id": "3d772d88-6e2c-4c7e-ba3e-79cb3ea84503",
        "name": "Bank BRI",
        "imageUrl": "https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/bri-logo.svg"
    },
    {
        "id": "e22b39c0-177b-4337-9b31-ae41a69aac95",
        "name": "Bank Mandiri",
        "imageUrl": "https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/mandiri-logo.svg"
    },
    {
        "id": "60a4c099-4134-4115-b1c0-a7b989d6f9dc",
        "name": "Bank BNI",
        "imageUrl": "https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/bni-logo.svg"
    },
];

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary-300  text-white">
            <div className="px-4 pt-16 pb-8 container mx-auto">
                {/* Footer Content */}
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Tentang Perusahaan */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">TravelYouuu</h3>
                        <p className="text-white mb-4">
                            Jelajahi dunia dengan mudah dan nyaman bersama TravelYouuu. 
                            Pengalaman perjalanan terbaik hanya dalam satu sentuhan.
                        </p>
                        
                        {/* Sosial Media */}
                        <div className="flex space-x-4 mt-4">
                            {[
                                { icon: <FontAwesomeIcon icon={faFacebook}/>, link: '#' },
                                { icon: <FontAwesomeIcon icon={faInstagram}/>, link: '#' },
                                { icon: <FontAwesomeIcon icon={faTwitter}/>, link: '#' },
                                { icon: <FontAwesomeIcon icon={faLinkedin}/>, link: '#' },
                            ].map((social, index) => (
                                <a 
                                    key={index} 
                                    href={social.link} 
                                    className="text-white hover:text-white transition-colors"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-4">Tautan Cepat</h4>
                        <ul className="space-y-2">
                            {[
                                'Beranda',
                                'Destinasi',
                                'Paket Wisata',
                                'Tentang Kami',
                                'Kontak',
                            ].map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href="#" 
                                        className="text-white hover:text-white transition-colors"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Metode Pembayaran */}
                    <div>
                        <h4 className="font-bold mb-4">Metode Pembayaran</h4>
                        <div className="grid grid-cols-3 gap-4">
                            {bankLogos.map((bank, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white/10 rounded-lg p-2 flex items-center justify-center"
                                >
                                    <Image 
                                        src={bank.imageUrl} 
                                        alt={bank.name}
                                        width={60}
                                        height={30}
                                        className="grayscale hover:grayscale-0 transition-all"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Kontak */}
                    <div className='flex items-center flex-col'>
                        <h4 className="font-bold  mb-6">Hubungi Kami</h4>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faMailForward} className="w-5 h-5 text-white" />
                                <span>support@travelyouuu.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faMap} className="w-5 h-5 text-white" />
                                <span>Jakarta, Indonesia</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-white" />
                                <span>+62 812-3456-7890</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-6 pt-6 border-t border-white text-center">
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
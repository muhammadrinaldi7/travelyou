// components/ActivitySection.tsx
import React from 'react';
import Image from 'next/image';
import { faCompass,faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Definisi tipe untuk aktivitas
interface Activity {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
}

const activityCategories: Activity[] = [
    {
        id: 1,
        name: 'Pendakian Gunung',
        description: 'Petualangan menantang di puncak gunung',
        image: 'https://travel-journal-api-bootcamp.do.dibimbing.id/images/1731345425120-biografi-singkat-ki-hajar-dewantara-626x391.jpg',
        price: 750000
    },
    {
        id: 2,
        name: 'Wisata Bahari',
        description: 'Jelajahi keindahan laut Indonesia',
        image: 'https://travel-journal-api-bootcamp.do.dibimbing.id/images/1730729196316-512px-the_tank_man_against_army_moving_forward.jpg',
        price: 1200000
    },
    {
        id: 3,
        name: 'Camping Eksotik',
        description: 'Pengalaman berkemah di alam bebas',
        image: 'https://travel-journal-api-bootcamp.do.dibimbing.id/images/1730729196316-512px-the_tank_man_against_army_moving_forward.jpg',
        price: 500000
    },
    {
        id: 4,
        name: 'Wisata Udara',
        description: 'Petualangan dari ketinggian',
        image: 'https://travel-journal-api-bootcamp.do.dibimbing.id/images/1731345425120-biografi-singkat-ki-hajar-dewantara-626x391.jpg',
        price: 1500000
    }
];

const ActivitySection: React.FC = () => {
    return (
        <section className="container px-4 py-16 mx-auto bg-gradient-to-b from-white to-primary-300">
            {/* Judul Section */}
            <div className="mb-12 text-center">
                <h2 className="mb-4 text-4xl font-bold text-gray-800">
                    Explore Amazing Activities
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600">
                    Temukan berbagai petualangan menakjubkan yang siap memanjakan liburan Anda
                </p>
            </div>

            {/* Grid Aktivitas */}
            <div className="grid gap-8 px-5 md:grid-cols-2 lg:grid-cols-4">
                {activityCategories.map((activity) => (
                    <div 
                        key={activity.id} 
                        className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2 group"
                    >
                        {/* Gambar Aktivitas */}
                        <div className="relative w-full h-56">
                            <Image 
                                src={activity.image} 
                                alt={activity.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            {/* Ikon Aktivitas */}
                            <div className="absolute p-2 rounded-full top-4 right-4 bg-white/80">
                              <FontAwesomeIcon icon={faStar} className='text-yellow-400' /> <span>{4}</span>
                            </div>
                        </div>

                        {/* Deskripsi Aktivitas */}
                        <div className="p-6">
                            <h3 className="mb-2 text-xl font-bold text-gray-800">
                                {activity.name}
                            </h3>
                            <p className="mb-4 text-gray-600">
                                {activity.description}
                            </p>

                            {/* Informasi Harga */}
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-blue-600">
                                    Rp {activity.price.toLocaleString()}
                                </span>
                                <button className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                                    Pesan Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tombol Lihat Semua */}
            <div className="mt-12 text-center">
                <button className="flex items-center px-6 py-3 mx-auto space-x-2 text-gray-800 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
                    <FontAwesomeIcon icon={faCompass} className="w-5 h-5" />
                    <span>Jelajahi Semua Aktivitas</span>
                </button>
            </div>
        </section>
    );
};

export default ActivitySection;
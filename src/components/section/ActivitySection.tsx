// components/ActivitySection.tsx
import React from 'react';
import Image from 'next/image';
import { faCompass, faMountain, faPlane, faShip, faStar, faTent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useFetchActivity } from '@/api/hooks/Activity/useFetchActivity';
import endpoints from '@/api/endpoints';




const ActivitySection: React.FC = () => {
    const {data:activityCategories,isLoading} = useFetchActivity(endpoints.activity)
    return (
        <section id='activity' className="container px-4 py-16 mx-auto bg-gradient-to-b from-white to-primary-300">
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
            <div className="grid gap-5 px-5 md:grid-cols-2 lg:grid-cols-4">
                {activityCategories?.data?.slice(0,4).map((activity) => (
                    <div 
                        key={activity.id} 
                        className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2 group"
                    >
                        {/* Gambar Aktivitas */}
                        <div className="relative w-full h-56">
                            <Image 
                                src={activity.imageUrls[0]||"/img/favicon.ico"}
                                alt={activity.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            {/* Ikon Aktivitas */}
                            <div className="absolute p-2 rounded-full top-4 right-4 bg-white/80">
                                <FontAwesomeIcon icon={faStar} className='text-yellow-400'/> <span className='text-sm font-semibold'>{activity.rating}</span>
                            </div>
                        </div>

                        {/* Deskripsi Aktivitas */}
                        <div className="p-6">
                            <h3 className="mb-2 text-xl font-bold text-gray-800">
                                {activity.title}
                            </h3>
                            <p className="mb-4 text-sm text-gray-600">
                               Provincy:{activity.province}, Kota: {activity.city}
                            </p>

                            {/* Informasi Harga */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-red-600 line-through">
                                    Rp. {activity.price.toLocaleString()}
                                </span>
                                <span className="font-semibold text-blue-600 text-md">
                                    Rp. {activity.price_discount.toLocaleString()}
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
                <Link href={'/user/activity'} className="flex items-center px-6 py-3 mx-auto space-x-2 text-gray-800 transition-colors bg-gray-100 rounded-lg w-fit hover:bg-gray-200">
                    <FontAwesomeIcon icon={faCompass} className="w-5 h-5" />
                    <span>Jelajahi Semua Aktivitas</span>
                </Link>
            </div>
        </section>
    );
};

export default ActivitySection;
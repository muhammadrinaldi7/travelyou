import React from "react";
import Image from "next/image";
import {
  faCompass,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useFetchActivity } from "@/api/hooks/Activity/useFetchActivity";
import endpoints from "@/api/endpoints";

const ActivitySection: React.FC = () => {
  const { data: activityCategories } = useFetchActivity(endpoints.activity);
  const filteredActivities = activityCategories?.data.filter(
    (activity) => parseInt(activity.total_reviews) > 200
  );
  return (
    <section
      id="activity"
      className="container px-4 py-16 mx-auto bg-gradient-to-b from-white to-primary-300"
    >
      {/* Judul Section */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-800">
          Explore Amazing Activities
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Temukan berbagai petualangan menakjubkan yang siap memanjakan liburan
          Anda
        </p>
      </div>

      {/* Grid Aktivitas */}
      <div className="grid gap-5 px-5 md:grid-cols-2 lg:grid-cols-4">
        {filteredActivities?.slice(0, 4).map((activity) => (
          <div
            key={activity.id}
            className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2 group"
          >
            <div className="relative w-full h-56">
              <Image
                src={activity.imageUrls[0] || "/img/noimage.webp"}
                alt={activity.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute p-2 rounded-xl bg-white/85 top-4 left-4">
                <h1 className="text-sm font-semibold">
                  Riviews:{" "}
                  <span className="font-bold text-primary-300">
                    {activity.total_reviews.toLocaleString()}
                  </span>
                </h1>
              </div>
              <div className="absolute p-2 rounded-full top-4 right-4 bg-white/80">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />{" "}
                <span className="text-sm font-semibold">{activity.rating}</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {activity.title}
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                {activity.province}, {activity.city}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-red-600 line-through">
                  Rp. {activity.price.toLocaleString()}
                </span>
                <span className="font-semibold text-blue-600 text-md">
                  Rp. {activity.price_discount.toLocaleString()}
                </span>
              </div>
              <button className="px-4 py-2 mt-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                Pesan Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href={"/user/activity"}
          className="flex items-center px-6 py-3 mx-auto space-x-2 text-gray-800 transition-colors bg-gray-100 rounded-lg w-fit hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={faCompass} className="w-5 h-5" />
          <span>Jelajahi Semua Aktivitas</span>
        </Link>
      </div>
    </section>
  );
};

export default ActivitySection;

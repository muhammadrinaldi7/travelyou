"use client";
import endpoints from "@/api/endpoints";
import { useFetchActivityById } from "@/api/hooks/Activity/useFetchActivity";
import ImageSlider from "@/components/card/imageSlider";
import { useParams } from "next/navigation";
export default function ActivityDetailPage() {
  const params = useParams(); // Menggunakan useParams untuk mendapatkan params
  const id = params.activityId; // Mengakses activityId setelah meng-unpack params
  const { data: activity } = useFetchActivityById(
    endpoints.activityDetail + id
  );
  console.log(activity);
  return (
    <>
      <div className="container mx-auto py-20 px-5">
        {activity?.data && (
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2">
              <ImageSlider
                key={activity.data.id}
                images={activity.data.imageUrls}
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">{activity.data.title}</h2>
              <p className="text-gray-600 mb-4">{activity.data.description}</p>
              <p className="text-gray-600 mb-4">Harga: {activity.data.price}</p>
              <p className="text-gray-600 mb-4">
                Rating: {activity.data.rating}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

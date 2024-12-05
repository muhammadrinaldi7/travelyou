"use client";
import endpoints from "@/api/endpoints";
import { useFetchActivityById } from "@/api/hooks/Activity/useFetchActivity";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutUser from "@/components/layout/LayoutUser";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams } from "next/navigation";
export default function ActivityDetailPage() {
  const params = useParams();
  const id = params.activityId;
  const { data: activity } = useFetchActivityById(
    endpoints.activityDetail + id
  );

  return (
    <>
      <LayoutUser
        title={activity?.data?.title || "Detail Activity"}
        desc="Detail Activity"
      >
        <BreadCumbs
          title="Detail Activity"
          to="/user/activity"
          prevPage="Activity"
        />
        <div className="flex gap-8  lg:flex-row flex-col ">
          <div className="w-full px-10 md:w-[40%]">
            <Carousel className="w-full h-full">
              <CarouselContent>
                {activity?.data?.imageUrls?.map((image, index) => (
                  <CarouselItem key={index}>
                    <div>
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-2">
                          <Image
                            src={image}
                            alt="image"
                            width={1000}
                            height={1000}
                            className="w-full h-full object-cover"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="w-full md:w-[60%]">
            <h2 className="text-3xl font-bold mb-4">{activity?.data?.title}</h2>
            <p className="text-gray-600 mb-4">{activity?.data?.description}</p>
            <p className="text-gray-600 mb-4">
              Harga:{" IDR. "}
              <span className="line-through mr-2">
                {activity?.data?.price.toLocaleString()}
              </span>{" "}
              {" IDR. "}
              {activity?.data?.price_discount.toLocaleString()}{" "}
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-gray-600">
                {activity?.data?.province}, <span>{activity?.data?.city}</span>
              </p>
              <p className="text-gray-600 mb-4">{activity?.data?.address}</p>
            </div>
            <div className="flex items-center mb-2 gap-2">
              <p className="text-gray-600">
                Rating : {activity?.data?.rating}
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <span className="text-gray-600 font-bold">
                  {" "}
                  ({activity?.data?.total_reviews})
                </span>
              </p>
            </div>

            <div
              className="text-gray-600 rounded-lg w-full h-full overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: activity?.data?.location_maps || "",
              }}
            />
          </div>
        </div>
      </LayoutUser>
    </>
  );
}

{
  /* <div className="container mx-auto py-20 px-5">
  <div className="my-4">
    <BreadCumbs
      title={`Detail ${activity?.data?.title}`}
      prevPage="Activity"
      to="/user/activity"
    />
  </div>
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
</div> */
}

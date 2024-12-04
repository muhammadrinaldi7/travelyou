"use client";
import endpoints from "@/api/endpoints";
import {
  useFetchActivity,
  useFetchCategory,
} from "@/api/hooks/Activity/useFetchActivity";
import CardCategory from "@/components/card/cardCategory";
import ActivityCard from "@/components/card/listActivity";
import { ColourPagination } from "@/components/pagination/pagination";
import Spinner from "@/components/spinner/Spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";

export default function ActivityPage() {
  const { data: category } = useFetchCategory(endpoints.category);
  const { data: activity, isLoading } = useFetchActivity(endpoints.activity);
  const [filteredActivities, setFilteredActivities] = useState({
    kota: "",
    hargaMin: "",
    hargaMax: 0,
    rating: 0,
    kategori: "",
  });

  const handleCategoryClick = (category: string) => {
    setFilteredActivities({
      ...filteredActivities,
      kategori: category,
    });
  };

  const activityFiltered = activity?.data?.filter((activity) => {
    const isCityMatch = activity.city
      .toLowerCase()
      .includes(filteredActivities.kota.toLowerCase());
    const priceMin = filteredActivities.hargaMin
      ? parseInt(activity.price_discount) <=
        parseFloat(filteredActivities.hargaMin)
      : true; // Jika harga kosong, lewati filter
    const priceMax = filteredActivities.hargaMax
      ? parseInt(activity.price) >= filteredActivities.hargaMax
      : true;
    const isRatingMatch = activity.rating >= filteredActivities.rating;
    const isCategoryMatch = filteredActivities.kategori
      ? activity.categoryId === filteredActivities.kategori
      : true;
    return (
      isCityMatch && priceMin && priceMax && isRatingMatch && isCategoryMatch
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = activityFiltered?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = activityFiltered
    ? Math.ceil(activityFiltered.length / itemsPerPage)
    : 0;
  return (
    <>
      <div className="flex flex-col w-full bg-white">
        <div
          className="relative flex justify-center h-64 mx-1 bg-center bg-cover rounded-b-2xl"
          style={{ backgroundImage: "url('/img/blue-sea.webp')" }}
        >
          <div className="w-[80%] drop-shadow-md shadow-lg h-72 container flex flex-col mx-auto mt-28 rounded-xl items-center p-6 bg-gray-100/95">
            <div className="flex items-center justify-center w-full">
              <h1 className="self-center text-xl font-travelyouu text-primary-300">
                TravelYouuu
              </h1>
            </div>
            <div className="relative w-full mt-8">
              <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                value={filteredActivities.kota}
                onChange={(e) =>
                  setFilteredActivities({
                    ...filteredActivities,
                    kota: e.target.value,
                  })
                }
                placeholder="Cari Kota Wisata Anda "
                className="self-center w-full text-gray-600 rounded-full focus:border-primary-300"
              />
            </div>
            <h1>Kategori</h1>
            <div className="flex items-center gap-3 overflow-x-auto h-full justify-left w-full">
              <div
                onClick={() => handleCategoryClick("")}
                className="cursor-pointer"
              >
                <CardCategory name="All" imageUrl="/img/hero.webp" />
              </div>
              {category?.data.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="cursor-pointer"
                >
                  <CardCategory
                    name={category.name}
                    imageUrl={category.imageUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container flex mt-20 justify-center mx-auto bg-white py-14">
          <div className="flex flex-col px-[5%] gap-3 w-full py-5 justify-between bg-white">
            <div className="flex w-full justify-between">
              <h1 className="self-center text-xl font-tittle text-gray-600">
                Result : {activityFiltered?.length}
              </h1>
            </div>
            <div className="flex flex-col  md:px-10 md:flex-row">
              <div className="flex flex-col md:w-[20%] rounded-xl shadow-md h-fit p-4 bg-white">
                <h1 className="self-center text-xl font-tittle text-gray-600">
                  Filter
                </h1>
                <div className="flex flex-col gap-2 mt-4">
                  <Label className="text-sm font-semibold">Harga Max</Label>
                  <Input
                    type="number"
                    value={filteredActivities.hargaMin}
                    onChange={(e) =>
                      setFilteredActivities({
                        ...filteredActivities,
                        hargaMin: e.target.value,
                      })
                    }
                    placeholder="Harga"
                    className="self-center w-full text-gray-600 rounded-full focus:border-primary-300"
                  />
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <Label className="text-sm font-semibold">Rating</Label>
                  <Input
                    type="number"
                    value={filteredActivities.rating}
                    onChange={(e) =>
                      setFilteredActivities({
                        ...filteredActivities,
                        rating: parseInt(e.target.value),
                      })
                    }
                    placeholder="Rating"
                    className="self-center w-full text-gray-600 rounded-full focus:border-primary-300"
                  />
                </div>
              </div>
              <div className="flex flex-col  w-full items-center space-y-4 p-4">
                {activityFiltered?.length === 0 && (
                  <h1 className="self-center text-2xl font-tittle text-gray-600">
                    Not Found
                  </h1>
                )}
                {isLoading && <Spinner />}
                {currentItems?.map((activity, index) => (
                  <ActivityCard
                    key={index}
                    imageUrl={activity.imageUrls[0] || "/img/noimage.webp"}
                    title={activity.title}
                    description={activity.description}
                    price={activity.price.toLocaleString()}
                    province={activity.province}
                    city={activity.city}
                    price_discount={activity.price_discount}
                    rating={activity.rating}
                    id={activity.id}
                    total_reviews={activity.total_reviews}
                  />
                ))}
                <div>
                  <ColourPagination
                    page={currentPage}
                    totalPage={totalPages}
                    handlePageChange={(prev: number) => setCurrentPage(prev)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

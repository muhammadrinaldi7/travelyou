"use client";
import endpoints from "@/api/endpoints";
import usePostCart from "@/api/hooks/Cart/usePostCart";
import { Activities } from "@/stores/activitiesStore";
import { useAuthStore } from "@/stores/authStore";
import { useCartsStore } from "@/stores/cartsStore";

import {
  faCartPlus,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface ActivityCardProps
  extends Omit<
    Activities,
    | "imageUrls"
    | "category"
    | "categoryId"
    | "facilities"
    | "location_maps"
    | "createdAt"
    | "updatedAt"
    | "address"
  > {
  imageUrl: string;
}
const ActivityCard = ({
  imageUrl,
  title,
  description,
  price,
  price_discount,
  rating,
  total_reviews,
  province,
  city,
  id,
}: ActivityCardProps) => {
  // const { carts, addCart } = useCartsStore();
  const { isAuthenticated } = useAuthStore();
  const { addCart } = usePostCart(endpoints.addCart);
  const { addItemCart } = useCartsStore();
  const routes = useRouter();
  const handleToAddCart = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to add to cart.");
      routes.push("/auth/Login");
      return;
    }
    try {
      // Panggil API untuk menambahkan item ke keranjang
      addItemCart(1);
      addCart({ activityId: id });
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } flex items-center w-full max-w-xs p-2 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded shadow`}
          role="alert"
        >
          <Image
            src={`${imageUrl}`}
            width={1000}
            height={1000}
            alt={`${title}`}
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="pl-5">
            <div className="text-sm font-bold">Added to Cart</div>
            <div className="text-sm">Rp. {price_discount}</div>
          </div>
          <div className="flex border-l justify-end items-end border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    } catch (error) {
      toast.error("Failed to add to cart. Please try again.");
      console.error("Error adding to cart:", error);
    }
  };
  // console.log(carts);
  return (
    <div className="flex w-full bg-white drop-shadow-lg rounded-xl p-2 md:h-52 flex-col md:flex-row ">
      <Image
        src={`${imageUrl}`}
        width={1000}
        height={1000}
        alt={`${title}`}
        className="object-cover rounded-xl w-full md:w-1/3"
      />
      <div className="flex w-full md:gap-4 gap-1 p-4 flex-col">
        <div className="flex justify-between md:justify-start md:gap-6">
          <p className="text-gray-600 text-sm">
            <FontAwesomeIcon icon={faLocationDot} className="mr-2" /> {province}
            , {city}
          </p>
          <h1 className="text-md font-desc font-semibold">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400" />{" "}
            {rating} <span>({total_reviews})</span>
          </h1>
        </div>

        <h1 className="font-bold">{title}</h1>
        <p className="text-sm overflow-hidden">{description}</p>
      </div>
      <div className="flex items-center md:gap-6 md:flex-col md:justify-center justify-between px-2 md:w-2/3 ">
        <div className="flex flex-col md:flex-row gap-2">
          <h1>Rp. {price_discount.toLocaleString()}</h1>
          <span className="line-through">Rp. {price}</span>
        </div>
        <div className="flex fflex-row items-end gap-2 justify-end">
          <Link
            href={`/user/activity/${id}`}
            className="p-3 text-sm text-white hover:bg-blue-400 hover:text-gray-700 rounded-xl bg-blue-500 w-fit"
          >
            Details
          </Link>
          <button
            onClick={() => {
              handleToAddCart();
            }}
            className="p-3 text-sm text-white hover:bg-blue-400 hover:text-gray-700 rounded-xl bg-blue-500"
          >
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;

//  imageUrls: string;
//  title: string;
//  description: string;
//  price: string;
//  price_discount: number;
//  rating: number;
//  total_reviews: number;
//  province: string;
//  city: string;

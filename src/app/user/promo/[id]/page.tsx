"use client";
import endpoints from "@/api/endpoints";
import { useFetchPromo } from "@/api/hooks/Promo/useFetchPromo";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutUser from "@/components/layout/LayoutUser";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function PromoDetail() {
  const { data: promos } = useFetchPromo(endpoints.promo);
  const param = useParams();
  const id = param.id as string;
  const promo = promos?.data.find((data) => data.id == id);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(promo?.promo_code || "");
    toast.success("Promo code copied to clipboard!");
  };
  return (
    <>
      <LayoutUser title={promo?.title || "Detail Promo"} desc="Detail Promo">
        <BreadCumbs title="Detail Promo" to="/user/promo" prevPage="Promo" />
        <div className="w-full flex-col md:flex-row flex justify-between mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src={promo?.imageUrl || "/img/noimage.webp"}
            alt={promo?.title || "Promo"}
            className="w-full md:w-1/2 h-80 obcect-center object-cover"
            width={1000}
            height={1000}
          />
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800">{promo?.title}</h2>
            <p className="text-gray-600 mt-2">{promo?.description}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">
                Promo Code:
                <span className="text-blue-500 font-bold ml-1">
                  {promo?.promo_code}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="ml-2 text-gray-500 hover:text-blue-500 focus:outline-none"
                  title="Copy Promo Code"
                >
                  <FontAwesomeIcon icon={faClipboard} />
                </button>
              </h3>
              <p className="text-gray-600">
                Discount Price: IDR{" "}
                {promo?.promo_discount_price.toLocaleString()}
              </p>
              <p className="text-gray-600">
                Minimum Claim Price: IDR{" "}
                {promo?.minimum_claim_price.toLocaleString()}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Terms & Conditions:</h4>
              <div
                className="text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: promo?.terms_condition || "",
                }}
              />
            </div>
          </div>
        </div>
      </LayoutUser>
    </>
  );
}

"use client";
import endpoints from "@/api/endpoints";
import { useFetchPromo } from "@/api/hooks/Promo/useFetchPromo";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import { CardPromo } from "@/components/card/cardPromo";
import LayoutUser from "@/components/layout/LayoutUser";

export default function PromoPage() {
  const { data: dataPromo } = useFetchPromo(endpoints.promo);
  return (
    <>
      <LayoutUser title="Promo Terbaru" desc="Promo Terbaru Dari Kami">
        <BreadCumbs title="Promo" to="/" prevPage="Home" />
        <div className="">
          <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:items-center md:gap-10 justify-center">
                {dataPromo?.data?.map((promo, index) => (
                  <CardPromo
                    key={index}
                    discount={promo.promo_discount_price.toLocaleString()}
                    imageUrl={promo.imageUrl}
                    title={promo.title}
                    description={promo.description}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </LayoutUser>
    </>
  );
}

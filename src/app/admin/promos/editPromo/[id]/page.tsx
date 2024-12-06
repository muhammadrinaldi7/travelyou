"use client";
import endpoints from "@/api/endpoints";
import { useFetchPromoById } from "@/api/hooks/Promo/useFetchPromo";
import { usePostPromo } from "@/api/hooks/Promo/usePostPromo";
import useImageUpload from "@/api/hooks/uploadImage/useUploadImage";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditPromo() {
  const { id } = useParams();
  const router = useRouter();
  const { data: promo } = useFetchPromoById(endpoints.promoById + id);
  const { updatePromo } = usePostPromo(endpoints.updatePromo + id);
  const { handleUploadImage } = useImageUpload({
    onSuccess: (data) => {
      if (data) {
        setFormData((prev) => ({ ...prev, imageUrl: data }));
      }
    },
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: 0,
    minimum_claim_price: 0,
  });
  useEffect(() => {
    if (promo) {
      setFormData({
        title: promo?.data?.title || "",
        imageUrl: promo?.data?.imageUrl || "",
        description: promo?.data.description || "",
        terms_condition: promo?.data.terms_condition || "",
        promo_code: promo?.data.promo_code || "",
        promo_discount_price: promo?.data.promo_discount_price || 0,
        minimum_claim_price: promo?.data.minimum_claim_price || 0,
      });
    }
  }, [promo]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePromo(formData, {
      onSuccess: () => {
        toast.success("Promo updated successfully!");
        router.push("/admin/promos");
      },
    });
  };
  return (
    <LayoutDashboard title="Edit Promo" desc="Edit Your Promo">
      <BreadCumbs title="Edit Promo" to="/admin/promos" prevPage="Promos" />
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 mt-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Title</Label>
          <Input
            type="text"
            name="name"
            value={formData.title}
            onChange={handleInputChange}
            id="name"
            placeholder="Title Promo"
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Description</Label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            id="description"
            placeholder="Description"
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Terms & Condition</Label>
          <Input
            type="text"
            name="terms_condition"
            value={formData.terms_condition}
            onChange={handleInputChange}
            id="terms_condition"
            placeholder="Terms & Condition"
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Promo Code</Label>
          <Input
            type="text"
            name="promo_code"
            value={formData.promo_code}
            onChange={handleInputChange}
            id="promo_code"
            placeholder="Promo Code"
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Promo Discount</Label>
          <Input
            type="number"
            name="promo_discount_price"
            value={formData.promo_discount_price}
            onChange={handleInputChange}
            id="promo_discount_price"
            placeholder="Discount Promo"
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Minimum Claim</Label>
          <Input
            type="number"
            name="minimum_claim_price"
            value={formData.minimum_claim_price}
            onChange={handleInputChange}
            id="minimum_claim_price"
            placeholder="Minimum Claim"
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="imageUrl">Image</Label>
          {formData?.imageUrl && (
            <Image
              width={1000}
              height={1000}
              className="w-full h-64 object-cover aspect-square"
              src={formData?.imageUrl}
              alt="Uploaded"
            />
          )}
          <Input
            type="file"
            onChange={handleUploadImage}
            accept="image/*"
            id="imageUrl"
            name="imageUrl"
          />
        </div>
        <Button className="bg-primary-300" type="submit">
          Submit
        </Button>
        <Button
          type="button"
          onClick={() => {
            router.push("/admin/promos");
          }}
          variant="outline"
        >
          Cancel
        </Button>
      </form>
    </LayoutDashboard>
  );
}

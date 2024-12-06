"use client";
import endpoints from "@/api/endpoints";
import { usePostPromo } from "@/api/hooks/Promo/usePostPromo";
import useImageUpload from "@/api/hooks/uploadImage/useUploadImage";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddPromo() {
  const { addPromo } = usePostPromo(endpoints.createPromo);
  const { handleUploadImage } = useImageUpload({
    onSuccess: (imageUrl) => {
      setFormData((prev) => ({ ...prev, imageUrl: imageUrl }));
    },
  });
  const [formData, setFormData] = useState({
    tittle: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: 0,
    minimum_claim_price: 0,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPromo(
      {
        title: formData.tittle,
        description: formData.description,
        imageUrl: formData.imageUrl,
        terms_condition: formData.terms_condition,
        promo_code: formData.promo_code,
        promo_discount_price: parseInt(
          formData.promo_discount_price.toString()
        ),
        minimum_claim_price: parseInt(formData.minimum_claim_price.toString()),
      },
      {
        onSuccess: () => {
          toast.success("Promo added successfully!");
          setFormData({
            tittle: "",
            description: "",
            imageUrl: "",
            terms_condition: "",
            promo_code: "",
            promo_discount_price: 0,
            minimum_claim_price: 0,
          });
          router.push("/admin/promos");
        },
      }
    );
  };
  console.log(formData);
  return (
    <>
      <LayoutDashboard title="Add Promo" desc="Add a new promo!">
        <BreadCumbs title="Add Promo" to="/admin/promos" prevPage="Promos" />
        <form
          onSubmit={handleSubmit}
          className="mt-4 gap-3 flex flex-col w-full"
        >
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="tittle">Tittle</Label>
            <Input
              type="text"
              id="tittle"
              name="tittle"
              value={formData.tittle}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="terms_condition">Terms & Condition</Label>
            <Input
              type="text"
              id="terms_condition"
              name="terms_condition"
              value={formData.terms_condition}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="promo_code">Promo Code</Label>
            <Input
              type="text"
              id="promo_code"
              name="promo_code"
              value={formData.promo_code}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="promo_discount_price">Promo Discount</Label>
            <Input
              type="number"
              id="promo_discount_price"
              name="promo_discount_price"
              value={formData.promo_discount_price}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="minimum_claim_price">Minimum Claim</Label>
            <Input
              type="number"
              id="minimum_claim_price"
              name="minimum_claim_price"
              value={formData.minimum_claim_price}
              onChange={handleInputChange}
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
          <Button className="btn btn-primary">Submit</Button>
        </form>
      </LayoutDashboard>
    </>
  );
}

"use client";
import endpoints from "@/api/endpoints";
import { usePostBanner } from "@/api/hooks/Banner/usePostBanner";
import { usePostImage } from "@/api/hooks/Image/usePostImage";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddBanner() {
  const { addImage } = usePostImage(endpoints.uploadImage);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const { addBanner } = usePostBanner(endpoints.addBanner);
  const route = useRouter();
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 999999) {
        toast.error("File size must be less than 1MB");
        return;
      }
      addImage(
        { image: file },
        {
          onSuccess: (imageUrl) => {
            setUploadedImageUrl(imageUrl);
            toast.success("Image uploaded successfully!");
          },
          onError: (error) => {
            console.log("Image upload failed:", error);
            toast.error(error.message);
          },
        }
      );
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const image = uploadedImageUrl;
    const payloadData = {
      name,
      imageUrl: image,
    };
    addBanner(
      { name: payloadData.name, imageUrl: payloadData.imageUrl },
      {
        onSuccess: () => {
          toast.success("Banner added successfully!");
          setUploadedImageUrl(null);
          route.push("/admin/banners");
        },
        onError: (error) => {
          console.log("Banner add failed:", error);
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <>
      <LayoutDashboard title="Add Banners" desc="Add Your Banners!">
        <BreadCumbs
          title="Add Banners"
          to="/admin/banners"
          prevPage="Banners"
        />
        <div className="container mx-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-3 mt-4"
          >
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Judul</Label>
              <Input
                type="text"
                name="name"
                required
                id="name"
                placeholder="Nama Banner"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Foto Banner</Label>
              <Input
                type="file"
                onChange={(e) => handleUpload(e)}
                name="image"
                accept="image/*"
                id="image"
                placeholder="Gambar"
              />
            </div>
            <Button type="submit">Simpan</Button>
          </form>
        </div>
      </LayoutDashboard>
    </>
  );
}
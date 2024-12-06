"use client";
import endpoints from "@/api/endpoints";
import { useFetchBannerById } from "@/api/hooks/Banner/useFetchBanner";
import { usePostBanner } from "@/api/hooks/Banner/usePostBanner";
import { usePostImage } from "@/api/hooks/Image/usePostImage";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditBanner() {
  const { id } = useParams();
  const { data: dataBanner } = useFetchBannerById(endpoints.bannerById + id);
  const banner = dataBanner?.data;
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const { addImage } = usePostImage(endpoints.uploadImage);
  const { updateBanner } = usePostBanner(endpoints.updateBanner + id);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
  });
  const router = useRouter();
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
            setFormData((prev) => ({ ...prev, imageUrl: imageUrl }));
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

  useEffect(() => {
    if (banner) {
      setFormData({
        name: banner.name || "",
        imageUrl: banner.imageUrl || "",
      });
    }
  }, [banner]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateBanner(
      { name: formData.name, imageUrl: formData.imageUrl },
      {
        onSuccess: () => {
          toast.success("Banner updated successfully!");
          setUploadedImageUrl(null);
          setFormData({ name: "", imageUrl: "" });
          router.push("/admin/banners");
        },
        onError: (error) => {
          console.log("Banner update failed:", error);
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <LayoutDashboard title="Edit Banner" desc="Welcome to the admin dashboard!">
      <BreadCumbs title="Edit Banners" to="/admin/banners" prevPage="Banners" />
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
              value={formData.name} // Controlled input
              onChange={handleInputChange}
              id="name"
              placeholder="Nama Banner"
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="image">Foto Banner</Label>
            {uploadedImageUrl ? (
              <Image
                src={uploadedImageUrl}
                width={1000}
                height={1000}
                className="w-96 h-64 object-cover object-center rounded-lg"
                alt="profile"
              />
            ) : (
              <Image
                src={banner?.imageUrl || "/img/noimage.webp"}
                width={1000}
                height={1000}
                className="w-96 h-64 object-cover object-center rounded-lg"
                alt="profile"
              />
            )}
            <Input
              type="file"
              name="image"
              accept="image/*"
              id="image"
              onChange={handleUpload}
              placeholder="Gambar"
            />
          </div>
          <Button type="submit">Simpan</Button>
        </form>
      </div>
    </LayoutDashboard>
  );
}

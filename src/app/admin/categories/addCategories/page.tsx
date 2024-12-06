"use client";
import useImageUpload from "@/api/hooks/uploadImage/useUploadImage";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePostCategories } from "@/api/hooks/Categories/usePostCategories";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddCategoriesPage() {
  const [payloadData, setPayloadData] = useState({
    name: "",
    imageUrl: "",
  });
  const router = useRouter();
  const { addCategory } = usePostCategories();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayloadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const { handleUploadImage } = useImageUpload({
    onSuccess: (data) => {
      if (data) {
        setPayloadData((prev) => ({ ...prev, imageUrl: data }));
      }
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCategory(payloadData, {
      onSuccess: () => {
        toast.success("Category added successfully!");
        router.push("/admin/categories");
      },
    });
  };
  useEffect(() => {
    console.log(payloadData);
  }, [payloadData]);
  return (
    <LayoutDashboard
      title="Add Categories"
      desc="Welcome to the admin dashboard!"
    >
      <BreadCumbs
        title="Add Categories"
        to="/admin/categories"
        prevPage="Categories"
      />
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 mt-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Category Name</Label>
          <Input
            type="text"
            name="name"
            onChange={handleInputChange}
            required
            id="name"
            placeholder="Category Name"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Foto Banner</Label>
          {payloadData.imageUrl && (
            <Image
              width={1000}
              height={1000}
              src={payloadData.imageUrl}
              alt="Uploaded"
              className="w-32 h-32 object-cover"
            />
          )}
          <Input
            type="file"
            onChange={handleUploadImage}
            name="image"
            accept="image/*"
            id="image"
            placeholder="Gambar"
          />
        </div>
        <Button type="submit">Simpan</Button>
      </form>
    </LayoutDashboard>
  );
}

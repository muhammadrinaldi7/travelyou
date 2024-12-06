"use client";
import endpoints from "@/api/endpoints";
import { useFetchCategory } from "@/api/hooks/Activity/useFetchActivity";
import { usePostActivity } from "@/api/hooks/Activity/usePostActivity";
import useImageUpload from "@/api/hooks/uploadImage/useUploadImage";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddActivity() {
  const [files, setFiles] = useState<string[]>([]);
  const [payloadData, setPayloadData] = useState({
    categoryId: "",
    title: "",
    description: "",
    imageUrls: [""],
    price: 0,
    price_discount: 0,
    rating: 0,
    total_reviews: 0,
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
  });
  const { data: category } = useFetchCategory(endpoints.category);
  const { handleUploadImage } = useImageUpload({
    onSuccess: (imageUrls) => {
      setFiles((prevFiles) => [...prevFiles, imageUrls]);
    },
  });
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPayloadData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (value: string) => {
    setPayloadData((prev) => ({ ...prev, categoryId: value }));
  };
  useEffect(() => {
    setPayloadData((prev) => ({ ...prev, imageUrls: files }));
  }, [files]);
  const { addActivity } = usePostActivity();
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addActivity(
      { ...payloadData, price: parseInt(payloadData.price.toString()) },
      {
        onSuccess: () => {
          toast.success("Activity added successfully");
          router.push("/admin/activities");
        },
      }
    );
  };
  console.log(payloadData);
  return (
    <LayoutDashboard title="Add Activity" desc="Add Activity">
      <BreadCumbs
        title="Add Activity"
        prevPage="Activities"
        to="/admin/activities"
      />
      <div className="flex flex-col gap-3 p-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select name="categoryId" onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {category?.data.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              onChange={handleInputChange}
              placeholder="Title"
            />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              onChange={handleInputChange}
              placeholder="Description"
            />
          </div>
          <div className="grid gap-2">
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              onChange={handleInputChange}
              placeholder="Price"
            />
          </div>
          <div className="grid gap-2">
            <Label>Price Discount</Label>
            <Input
              type="number"
              name="price_discount"
              onChange={handleInputChange}
              placeholder="Price Discount"
            />
          </div>
          <div className="grid gap-2">
            <Label>Rating</Label>
            <Input
              type="number"
              name="rating"
              onChange={handleInputChange}
              placeholder="Rating"
            />
          </div>
          <div className="grid gap-2">
            <Label>Total Reviews</Label>
            <Input
              type="number"
              name="total_reviews"
              onChange={handleInputChange}
              placeholder="Total Viewes"
            />
          </div>
          <div className="grid gap-2">
            <Label>Facilities</Label>
            <Input
              type="text"
              name="facilities"
              onChange={handleInputChange}
              placeholder="Facilities"
            />
          </div>
          <div className="grid gap-2">
            <Label>Provincy</Label>
            <Input
              type="text"
              name="province"
              onChange={handleInputChange}
              placeholder="Provincy"
            />
          </div>
          <div className="grid gap-2">
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              onChange={handleInputChange}
              placeholder="City"
            />
          </div>
          <div className="grid gap-2">
            <Label>Address</Label>
            <Textarea
              name="address"
              onChange={handleInputChange}
              placeholder="Address"
            />
          </div>
          <div className="grid gap-2">
            <Label>Location Maps</Label>
            <Textarea
              name="location_maps"
              onChange={handleInputChange}
              placeholder="Please Copy Iframe Maps From Google Maps"
            />
          </div>
          <div className="grid gap-2">
            <Label>Image</Label>
            <div className="lg:flex grid grid-cols-2 lg:flex-row gap-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex overflow-hidden justify-center items-center p-2 w-32 h-32 rounded-lg bg-primary-300/10"
                >
                  <Image
                    src={file}
                    width={1000}
                    height={1000}
                    alt={`Image ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="flex justify-center items-center p-4 w-32 h-32 rounded-lg bg-blue-50 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadImage}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="text-3xl text-gray-600"
                />
              </div>
            </div>
          </div>
          <Button className="bg-blue-600">Submit</Button>
          <Link href="/admin/activities">
            <Button type="button" className="bg-red-600 w-full">
              Cancel
            </Button>
          </Link>
        </form>
      </div>
    </LayoutDashboard>
  );
}

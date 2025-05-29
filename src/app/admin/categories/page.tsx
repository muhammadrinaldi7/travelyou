"use client";
import endpoints from "@/api/endpoints";
import { useFetchCategory } from "@/api/hooks/Activity/useFetchActivity";
import { usePostCategories } from "@/api/hooks/Categories/usePostCategories";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import { Button } from "@/components/ui/button";
import { proxiedUrl } from "@/lib/utils";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const { data: categories } = useFetchCategory(endpoints.categories);
  const { deleteCategory } = usePostCategories();
  const queryClient = useQueryClient();
  const handleDelete = async (id: string) => {
    toast(
      (t) => (
        <div className="flex flex-col items-start gap-2">
          <p>Are you sure you want to delete this banner?</p>
          <div className="flex gap-2">
            <Button
              className="bg-green-600 text-white"
              onClick={() => {
                toast.dismiss(t.id);
                deleteCategory(id, {
                  onSuccess: () => {
                    toast.success("Banner deleted successfully!");
                    queryClient.invalidateQueries({
                      queryKey: ["fetchCategory", endpoints.categories],
                    });
                  },
                  onError: (error) => {
                    if (
                      error instanceof AxiosError &&
                      error.response?.data.code == "500"
                    ) {
                      toast.error(
                        "Gagal hapus kategori, pastikan tidak ada aktivitas yang terkait dengan kategori ini."
                      );
                    } else {
                      toast.error("Failed to delete banner.");
                    }
                    console.error("Failed to delete banner:", error);
                  },
                });
              }}
            >
              Yes
            </Button>
            <Button
              className="bg-red-600 text-white"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </Button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        className: "mt-16",
      }
    );
  };
  return (
    <LayoutDashboard
      title="Categories"
      desc="Welcome to the categories dashboard!"
    >
      <BreadCumbs title="Categories" prevPage="Dashboard" to="/admin" />
      <div className="flex items-center justify-center flex-col-reverse gap-4 p-4 lg:grid lg:grid-cols-3">
        {categories?.data.map((category) => (
          <div key={category.id} className="block">
            <Image
              width={1000}
              height={1000}
              alt="Category Image"
              src={proxiedUrl(category.imageUrl)}
              className="h-56 w-full rounded-bl-3xl rounded-tr-3xl object-cover sm:h-64 lg:h-72"
            />
            <div className="mt-4 sm:flex sm:items-center sm:justify-center sm:gap-4">
              <strong className="font-medium">{category?.name}</strong>

              <span className="hidden sm:block sm:h-px sm:w-8 sm:bg-yellow-500"></span>

              <div className="flex gap-3">
                <Button className="bg-green-600 shadow-lg hover:shadow-sm">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-600 shadow-lg"
                >
                  Delete
                </Button>
              </div>
              {/* <p className="mt-0.5 opacity-50 sm:mt-0">Branding / Signage</p> */}
            </div>
          </div>
        ))}
        <Link
          className="flex justify-center rounded-xl min-h-36 w-full lg:max-w-sm lg:min-h-64 lg:m-6 hover:bg-primary-300 hover:text-white text-gray-500 items-center bg-primary-300/40"
          href="/admin/categories/addCategories"
        >
          <FontAwesomeIcon icon={faPlusCircle} className="size-8" />
        </Link>
      </div>
    </LayoutDashboard>
  );
}

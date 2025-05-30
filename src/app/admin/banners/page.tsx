"use client";
import endpoints from "@/api/endpoints";
import { useFetchBanner } from "@/api/hooks/Banner/useFetchBanner";
import { usePostBanner } from "@/api/hooks/Banner/usePostBanner";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { proxiedUrl } from "@/lib/utils";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminBannersPage() {
  const { deleteBanner } = usePostBanner(endpoints.deleteBanner);
  const { data: dataBanner } = useFetchBanner(endpoints.banner);
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
                deleteBanner(id, {
                  onSuccess: () => {
                    toast.success("Banner deleted successfully!");
                  },
                  onError: (error) => {
                    console.error("Failed to delete banner:", error);
                    toast.error("Failed to delete banner.");
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
    <>
      <LayoutDashboard title="Banners" desc="Manage Your Banners!">
        <section className="container py-4 mx-auto">
          <BreadCumbs title="Banners" to="/admin" prevPage="Dashboard" />
          <Link href="/admin/banners/addBanner">
            <Button className="bg-green-600">Add Banner</Button>
          </Link>
          <Table className="mt-4">
            <TableCaption>A list of your Banners.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataBanner?.data?.map((banner, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{banner.name}</TableCell>
                  <TableCell>
                    <Image
                      src={proxiedUrl(banner.imageUrl)}
                      width={100}
                      height={100}
                      className="w-10 h-10 rounded-lg"
                      alt="banner"
                    />
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Link href={`/admin/banners/editBanner/${banner.id}`}>
                      <Button className="bg-blue-600">
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleDelete(banner.id)}
                      className="bg-red-600 "
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </LayoutDashboard>
    </>
  );
}

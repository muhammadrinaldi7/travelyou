"use client";
import endpoints from "@/api/endpoints";
import { useFetchPromo } from "@/api/hooks/Promo/useFetchPromo";
import { usePostPromo } from "@/api/hooks/Promo/usePostPromo";
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
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function PromosPage() {
  const { data: dataPromo } = useFetchPromo(endpoints.promo);
  const { deletePromo } = usePostPromo(endpoints.deletePromo);
  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="text-center">
          Are you sure you want to delete this promo?
        </p>
        <div className="flex justify-center items-center gap-2">
          <Button
            className="bg-green-600 text-white"
            onClick={() => {
              toast.dismiss(t.id);
              deletePromo(id, {
                onSuccess: () => {
                  toast.success("Promo deleted successfully");
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
    ));
  };
  return (
    <LayoutDashboard title="Promos" desc="Manage Your Promos">
      <BreadCumbs title="Promos" to="/admin" prevPage="Dashboard" />
      <Link href="/admin/promos/addPromo">
        <Button className="bg-green-600">Add promo</Button>
      </Link>
      <Table className="mt-4">
        <TableCaption>A list of your promos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Tittle</TableHead>
            <TableHead>Promo Discount</TableHead>
            <TableHead>Minimum Claim Price</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataPromo?.data?.map((promo, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{promo?.title}</TableCell>
              <TableCell>{promo?.promo_discount_price}</TableCell>
              <TableCell>{promo?.minimum_claim_price}</TableCell>
              <TableCell>
                <Image
                  src={proxiedUrl(promo.imageUrl)}
                  width={100}
                  height={100}
                  className="w-10 h-10 rounded-lg"
                  alt="promo"
                />
              </TableCell>
              <TableCell className="flex gap-2">
                <Link href={`/admin/promos/editPromo/${promo.id}`}>
                  <Button className="bg-blue-600">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDelete(promo.id)}
                  className="bg-red-600 "
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </LayoutDashboard>
  );
}

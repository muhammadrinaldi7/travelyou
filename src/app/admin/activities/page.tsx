"use client";
import endpoints from "@/api/endpoints";
import { useFetchActivity } from "@/api/hooks/Activity/useFetchActivity";
import { usePostActivity } from "@/api/hooks/Activity/usePostActivity";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ActivityPage() {
  const { data: activity } = useFetchActivity(endpoints.activity);
  const { deleteActivity } = usePostActivity();
  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="text-center">
          Are you sure you want to delete this activity?
        </p>
        <div className="flex justify-center items-center gap-2">
          <Button
            className="bg-green-600 text-white"
            onClick={() => {
              toast.dismiss(t.id);
              deleteActivity(id, {
                onSuccess: () => {
                  toast.success("Activity deleted successfully");
                },
                onError: (error) => {
                  console.log("Failed to delete activity:", error);
                  toast.error("Failed to delete activity");
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
    <LayoutDashboard title="Activities" desc="Welcome to the admin dashboard!">
      <BreadCumbs title="Activities" prevPage="Dashboard" to="/admin" />
      <div className="flex flex-col gap-3">
        <Link className="w-fit" href={"/admin/activities/addActivity"}>
          <Button className="bg-green-600 w-fit text-white">
            Add Activity
          </Button>
        </Link>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price/Discount</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activity?.data.map((activity, index) => (
              <TableRow key={activity.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{activity.title}</TableCell>
                <TableCell className="max-w-xs">
                  {activity.description}
                </TableCell>
                <TableCell>
                  {activity.price} / {activity.price_discount}
                </TableCell>
                <TableCell>
                  {activity.province}, {activity.city}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button className="bg-green-600 text-white">Edit</Button>
                  <Button
                    onClick={() => handleDelete(activity.id)}
                    className="bg-red-600 text-white"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </LayoutDashboard>
  );
}

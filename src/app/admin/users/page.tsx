"use client";
import endpoints from "@/api/endpoints";
import { useFetchAllUsers } from "@/api/hooks/User/useFetchUsers";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import { PaginationTransaction } from "@/components/pagination/transactionPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function UsersPage() {
  const { data: dataUsers } = useFetchAllUsers(endpoints.users);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };
  const totalPage =
    dataUsers?.data.length &&
    Math.ceil(dataUsers?.data.length / pagination.itemsPerPage);
  const filteredUsers = dataUsers?.data
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(
      (pagination.currentPage - 1) * pagination.itemsPerPage,
      pagination.currentPage * pagination.itemsPerPage
    );
  return (
    <>
      <LayoutDashboard title="Users" desc="Manage your users!">
        <BreadCumbs title="Users" to="/admin" prevPage="Dashboard" />
        <div className="flex my-2 p-4 justify-between">
          <Link href="/admin/users/addUser" className="w-fit">
            <Button className="bg-green-600 shadow-lg hover:shadow-sm">
              Add User
            </Button>
          </Link>
          <Input
            placeholder="Search by name"
            onChange={handleSearch}
            className="w-1/2 md:w-1/4"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers?.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>
                  {pagination.itemsPerPage * (pagination.currentPage - 1) +
                    index +
                    1}
                </TableCell>
                <TableCell>
                  <Image
                    src={user.profilePictureUrl || "/img/noimage.webp"}
                    alt={user.name}
                    width={100}
                    height={100}
                    className="w-8 h-8 object-cover object-center rounded-full"
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex w-full items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(
                  pagination.currentPage * pagination.itemsPerPage,
                  dataUsers?.data.length || 0
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium">{dataUsers?.data.length || 0}</span>{" "}
              results
            </p>
          </div>
          <PaginationTransaction
            currentPage={pagination.currentPage}
            totalPages={totalPage || 1}
            setPagination={setPagination}
          />
        </div>
      </LayoutDashboard>
    </>
  );
}

"use client";
import endpoints from "@/api/endpoints";
import { useFetchAllTransaction } from "@/api/hooks/Transactions/useFetchTransaction";
import {
  CanceledBadge,
  FailedBadge,
  PaidBadge,
  SuccessBadge,
  UnpaidBadge,
} from "@/components/badges/paymentBadge";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import { ColourPagination } from "@/components/pagination/pagination";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useState } from "react";

export default function TransactonPage() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  const { data: transaction, isLoading } = useFetchAllTransaction(
    endpoints.transaction
  );
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
  });
  const [filter, setFilter] = useState({
    paymentStatsus: "",
    noInvoice: "",
  });
  const filteredTransaction = transaction?.data.filter((item) => {
    const matchesPaymentStatus =
      filter.paymentStatsus === "" ||
      (filter.paymentStatsus === "unpaid" && item.proofPaymentUrl === null) ||
      (filter.paymentStatsus === "paid" && item.proofPaymentUrl !== null);
    const matchesNoInvoice =
      filter.noInvoice === "" || item.invoiceId.includes(filter.noInvoice);

    return matchesPaymentStatus && matchesNoInvoice;
  });
  const totalItems = transaction?.data.length || 0;

  const sortedTransaction = filteredTransaction?.sort((a, b) => {
    const dateA = new Date(a.orderDate).getTime();
    const dateB = new Date(b.orderDate).getTime();

    if (sortOrder === "asc") return dateA - dateB; // Terlama dulu
    if (sortOrder === "desc") return dateB - dateA; // Terbaru dulu
    return 0; // default
  });

  const dataTransaction = sortedTransaction?.slice(
    (pagination.currentPage - 1) * pagination.itemsPerPage,
    pagination.currentPage * pagination.itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };
  const handleFilterChange = (data: string) => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    setFilter((prev) => ({ ...prev, paymentStatsus: data }));
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    setFilter((prev) => ({ ...prev, noInvoice: e.target.value }));
  };
  return (
    <LayoutDashboard title="Transaction" desc="Manage transaction users!">
      <BreadCumbs title="Transaction" to="/admin" prevPage="Dashboard" />
      <div className="flex flex-col gap-3">
        <div className="w-full flex justify-between">
          <div className="w-fit">
            <Label htmlFor="search">Search</Label>
            <Input
              type="text"
              name="search"
              onChange={handleSearch}
              id="search"
              placeholder="Search by invoice number"
            />
          </div>
          <div className="w-fit">
            <label
              htmlFor="sortOrder"
              className="block text-sm font-medium text-gray-900"
            >
              Sort By Date
            </label>
            <select
              name="sortOrder"
              id="sortOrder"
              onChange={(e) => {
                setPagination((prev) => ({ ...prev, currentPage: 1 }));
                setSortOrder(e.target.value as "asc" | "desc" | "");
              }}
              className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            >
              <option value="">Default</option>
              <option value="desc">Terbaru</option>
              <option value="asc">Terlama</option>
            </select>
          </div>

          <div className="w-fit">
            <label
              htmlFor="filterData"
              className="block text-sm font-medium text-gray-900"
            >
              {" "}
              Filter Status Transaction{" "}
            </label>
            <select
              name="filterData"
              onChange={(e) => handleFilterChange(e.target.value)}
              id="filterData"
              className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            >
              <option value="">All</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>
        {isLoading ? (
          <div className="flex w-full justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataTransaction?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.invoiceId}</TableCell>
                  <TableCell>
                    {"Rp. " + item.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(item.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{item.payment_method.name}</TableCell>
                  <TableCell>
                    {item.proofPaymentUrl ? <PaidBadge /> : <UnpaidBadge />}
                  </TableCell>
                  <TableCell>
                    {item.status === "success" ? (
                      <SuccessBadge />
                    ) : item.status === "cancelled" ? (
                      <CanceledBadge />
                    ) : (
                      <FailedBadge />
                    )}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Link href={`#`}>
                      <Button className="bg-blue-600 hover:bg-blue-300 text-white">
                        Detail
                      </Button>
                    </Link>
                    <Button className="bg-green-600 hover:bg-green-300 text-white">
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="w-full flex justify-between">
          <div>
            <h1>Total Transaction: {filteredTransaction?.length}</h1>
          </div>
          <div className="w-fit">
            <ColourPagination
              totalPage={totalItems / 5}
              page={pagination.currentPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}

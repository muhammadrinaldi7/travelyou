"use client";

import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import { MyTransactionTable } from "@/components/table/MyTransactionTable";

export default function TransactionPage() {
  return (
    <>
      <div className="mx-auto container min-h-dvh bg-gray-100">
        <div className="flex flex-col gap-4 py-20 px-4">
          <div className="w-full flex flex-col p-3 justify-center items-start rounded-lg bg-white">
            <h2 className="text-3xl font-bold ">Your Transaction</h2>
            <BreadCumbs title="Transaction" to="/user/cart" prevPage="Cart" />
          </div>
          <div className="w-full flex flex-col items-center justify-center p-4 rounded-lg bg-white">
            <MyTransactionTable />
          </div>
        </div>
      </div>
    </>
  );
}

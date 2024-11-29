import { BadgeOutline } from "../badges/badgeOutoine";
import {
  faCircleCheck,
  faClock,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import Spinner from "../spinner/Spinner";
import { useState } from "react";
import { useFetchMyTransaction } from "@/api/hooks/Transactions/useFetchTransaction";
import endpoints from "@/api/endpoints";
import UploadModal from "../modals/UploadModals";
import { Transaction } from "@/stores/transactionStore";
import { PaginationTransaction } from "../pagination/transactionPagination";

const ITEMS_PER_PAGE = 5;

export const MyTransactionTable = () => {
  const { data: myTransactions, isLoading } = useFetchMyTransaction(
    endpoints.MyTransaction
  );
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
  });
  const [modalAction, setModalAction] = useState({ isOpen: false, id: "" });

  const totalItems = myTransactions?.data.length || 0;
  const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);
  const currentTransactions = myTransactions?.data.slice(
    (pagination.currentPage - 1) * ITEMS_PER_PAGE,
    pagination.currentPage * ITEMS_PER_PAGE
  );

  const handleModalToggle = (id: string) => {
    setModalAction({ isOpen: !modalAction.isOpen, id });
  };

  const renderTransactionRow = (transaction: Transaction) => (
    <tr key={transaction.id}>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        <Link
          href={`/user/transaction/${transaction.id}`}
          className="hover:underline hover:text-primary-200"
        >
          {transaction.invoiceId}
        </Link>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {new Date(transaction.orderDate).toLocaleDateString()}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {new Date(transaction.expiredDate).toLocaleDateString()}
      </td>
      <td className="flex whitespace-nowrap items-center px-4 py-2 text-gray-700">
        <p>Rp. {transaction.totalAmount.toLocaleString("id-ID")}</p>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <div className="flex gap-2">
          <BadgeOutline
            title={transaction.status}
            color={transaction.status === "Success" ? "green" : "red"}
            icon={
              transaction.status === "pending"
                ? faClock
                : transaction.status === "success"
                ? faCircleCheck
                : faXmarkCircle
            }
          />
          <BadgeOutline
            title={transaction.proofPaymentUrl ? "Paid" : "Not Paid"}
            color={transaction.proofPaymentUrl ? "green" : "red"}
            icon={transaction.proofPaymentUrl ? faCircleCheck : faXmarkCircle}
          />
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <button
          className="px-4 py-2 bg-green-500 disabled:bg-green-300 text-white rounded-md hover:bg-green-700"
          disabled={transaction.proofPaymentUrl !== null}
          onClick={() => handleModalToggle(transaction.id)}
        >
          Selesaikan Pembayaran
        </button>
        <UploadModal
          id={modalAction.id}
          isOpen={modalAction.isOpen}
          modalAction={() => handleModalToggle(modalAction.id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      {isLoading && <Spinner />}
      <div className="rounded-lg border w-full border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  No Invoice
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Order Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Expired Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Total Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentTransactions?.map(renderTransactionRow)}
            </tbody>
          </table>
        </div>
        <PaginationTransaction
          currentPage={pagination.currentPage}
          totalPages={totalPages}
          setPagination={setPagination}
        />
        <div className="flex p-3 flex-col w-full justify-start">
          <h1 className="text-sm font-desc">Total Items : {totalItems}</h1>
          <h1 className="text-sm font-desc">
            Total Sudah Dibayar :{" "}
            {
              myTransactions?.data.filter(
                (transaction) => transaction.proofPaymentUrl !== null
              ).length
            }
          </h1>
        </div>
      </div>
    </>
  );
};

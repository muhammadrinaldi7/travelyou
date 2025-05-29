import endpoints from "@/api/endpoints";
import usePostTransaction from "@/api/hooks/Transactions/usePostTransaction";
import useImageUpload, { FormData } from "@/api/hooks/useImageUpload";
import { Transaction } from "@/stores/transactionStore";
import { faCopy, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface uploadModal {
  isOpen: boolean;
  detailOpen: boolean;
  modalAction: () => void;
  transactionById: Transaction;
  id: string;
}
const UploadModal: React.FC<uploadModal> = ({
  isOpen,
  detailOpen,
  modalAction,
  id,
  transactionById,
}) => {
  const { handleImageUpload, isUploading } = useImageUpload();
  const { updateTransactionProof } = usePostTransaction(
    endpoints.updateTransactionProof + id
  );
  const [formData, setFormData] = useState<FormData>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTransactionProof({
      proofPaymentUrl: formData?.proofPaymentUrl as string,
      url: endpoints.MyTransaction,
    });
    toast.success("Payment proof uploaded!");
    modalAction();
  };
  if (!isOpen) return null;
  // console.log(detailOpen);
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white/10 bg-opacity-50 ${
        isOpen ? "animate-zoomIn" : "animate-zoomOut"
      }`}
    >
      <div className="bg-white rounded-lg flex flex-col shadow-lg p-6 w-96">
        <button
          type="button"
          className=" px-2 py-1 self-end rounded-full bg-gray-300 text-gray-700  hover:bg-gray-400"
          onClick={modalAction}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Detail Transaksi</h2>
        <div className="flex flex-col gap-2">
          <p className="text-gray-600">Pembayaran untuk:</p>
          <p className="text-gray-600 font-bold">
            {transactionById?.invoiceId}
          </p>
          <p className="text-gray-600">
            Yang harus dibayar: Rp.{" "}
            <span className="font-bold">
              {transactionById?.totalAmount.toLocaleString("id-ID")}
            </span>
          </p>
          <div className="text-gray-600 flex gap-2 flex-col">
            <p>Metode pembayaran:</p>
            <div className="flex items-center w-fit justify-center  drop-shadow-md rounded-sm bg-white/90">
              <Image
                width={1000}
                height={1000}
                src={
                  transactionById?.payment_method.imageUrl ||
                  "/img/noimage.webp"
                }
                alt="Preview"
                className="transition-all w-16 h-8 drop-shadow-lg "
              />
            </div>
            <p className="text-gray-600 font-semibold">
              Virtual Account Name:{" "}
              {transactionById?.payment_method.virtual_account_name}
            </p>
            <p className="text-gray-600 font-semibold">
              Virtual Account Number:{" "}
              {transactionById?.payment_method.virtual_account_number}{" "}
              <FontAwesomeIcon
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(
                    transactionById?.payment_method.virtual_account_number
                  );
                  toast.success("Virtual Account Number copied!");
                }}
                icon={faCopy}
              />
            </p>
            <div className="flex gap-3"></div>
          </div>
        </div>
        {formData.proofPaymentUrl && (
          <Image
            width={1000}
            height={1000}
            src={formData.proofPaymentUrl}
            alt="Preview"
            className="w-full h-40 object-cover mb-4"
          />
        )}
        {detailOpen === false && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="payment-proof"
                className="block text-sm font-medium text-gray-700"
              >
                Pilih File
              </label>
              <input
                type="file"
                id="payment-proof"
                name="payment-proof"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(e, setFormData);
                  }
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUploading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UploadModal;

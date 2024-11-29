import endpoints from "@/api/endpoints";
import usePostTransaction from "@/api/hooks/Transactions/usePostTransaction";
import useImageUpload, { FormData } from "@/api/hooks/useImageUpload";
// import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

// components/UploadModal.js
interface uploadModal {
  isOpen: boolean;
  modalAction: () => void;
  id: string;
}
const UploadModal: React.FC<uploadModal> = ({ isOpen, modalAction, id }) => {
  // const queryClient = useQueryClient();
  const { handleImageUpload, isUploading } = useImageUpload();
  const { updateTransactionProof } = usePostTransaction(
    endpoints.updateTransactionProof + id
  );
  const [formData, setFormData] = useState<FormData>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logika untuk mengupload bukti pembayaran
    // Anda dapat menambahkan logika di sini untuk menangani upload file
    updateTransactionProof({
      proofPaymentUrl: formData?.proofPaymentUrl as string,
      url: endpoints.MyTransaction,
    });
    toast.success("Payment proof uploaded!");
    console.log("File uploaded");

    modalAction();

    // Tutup modal setelah upload
  };
  if (!isOpen) return null;
  //   console.log(formData.proofPaymentUrl);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white/10 bg-opacity-50 ${
        isOpen ? "animate-zoomIn" : "animate-zoomOut"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Upload Bukti Pembayaran</h2>
        <h1>{id}</h1>
        {formData.proofPaymentUrl && (
          <Image
            width={1000}
            height={1000}
            src={formData.proofPaymentUrl}
            alt="Preview"
            className="w-full h-40 object-cover mb-4"
          />
        )}
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
              type="button"
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={modalAction}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;

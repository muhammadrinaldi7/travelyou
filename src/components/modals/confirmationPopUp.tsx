import React from "react";
import toast, { Toaster } from "react-hot-toast";

interface ConfirmationPopupProps {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const ConfirmationPopup = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmationPopupProps) => {
  const showPopup = () => {
    const toastId = toast.custom(
      (t) => (
        <div
          className={`bg-white shadow-md border border-gray-200 rounded-md p-4 flex flex-col items-center ${
            t.visible ? "animate-zoomIn" : "animate-zoomOut"
          }`}
        >
          <p className="text-gray-800 text-sm mb-4">{message}</p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                onConfirm();
                toast.dismiss(t.id); // Dismiss toast setelah Confirm
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                if (onCancel) onCancel(); // Jalankan onCancel jika ada
                toast.dismiss(t.id); // Pastikan toast di-dismiss
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000, id: "confirmation-popup" } // Pastikan ID toast tetap unik
    );

    return toastId; // Kembalikan toast ID untuk referensi
  };

  return { showPopup };
};

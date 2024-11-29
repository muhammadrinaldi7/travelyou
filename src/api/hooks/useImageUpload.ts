import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

// Definisikan tipe untuk form data
export interface FormData {
  proofPaymentUrl?: string;
}

const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
  ) => {
    const file = e.target.files?.[0];
    if (file && file.size < 999999) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
      axios.defaults.headers.common["apiKey"] = process.env.NEXT_PUBLIC_API_KEY;

      try {
        const response = await axios.post<{ url: string }>(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/upload-image",
          formData
        );

        toast.success("Image uploaded successfully!");
        const imageUrl = response.data.url;

        setFormData((prevFormData) => ({
          ...prevFormData,
          proofPaymentUrl: imageUrl,
        }));
      } catch (error) {
        console.log("Error uploading image:", error);
        toast.error("Failed to upload image.");
      } finally {
        setIsUploading(false);
      }
    } else {
      toast.error("Image size must be less than 1MB");
    }
  };

  return { isUploading, handleImageUpload };
};

export default useImageUpload;

import { useState } from "react";
import { toast } from "react-hot-toast";
import { usePostImage } from "../Image/usePostImage";
import endpoints from "@/api/endpoints";

interface UseImageUploadProps {
  onSuccess?: (imageUrl: string) => void; // Tambahkan parameter onSuccess
}

const useImageUpload = ({ onSuccess }: UseImageUploadProps) => {
  const { addImage } = usePostImage(endpoints.uploadImage);
  const [formData, setFormData] = useState<{ imageUrl?: string }>({});

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 999999) {
        toast.error("File size must be less than 1MB");
        return;
      }
      addImage(
        { image: file },
        {
          onSuccess: (imageUrl) => {
            setFormData((prev) => ({ ...prev, imageUrl }));
            toast.success("Image uploaded successfully!");
            if (onSuccess) {
              onSuccess(imageUrl);
            }
          },
          onError: (error) => {
            console.log("Image upload failed:", error);
            toast.error(error.message);
          },
        }
      );
    }
  };

  return { handleUploadImage, formData };
};

export default useImageUpload;

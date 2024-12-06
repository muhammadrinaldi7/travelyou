import { useState } from "react";
import { toast } from "react-hot-toast";
import { usePostImage } from "../Image/usePostImage";
import endpoints from "@/api/endpoints";

// interface useMultipleImageUploadProps {
//   onSuccess?: (imageUrls: string[]) => void; // Array untuk multiple URL
// }

const useMultipleImageUpload = ({
  onSuccess,
}: {
  onSuccess?: (imageUrls: string[]) => void;
}) => {
  const { addImage } = usePostImage(endpoints.uploadImage);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const files = Array.from(e.target.files); // Ambil semua file
      const uploadedUrls: string[] = [];

      files.forEach((file) => {
        if (file.size > 999999) {
          toast.error("File size must be less than 1MB");
          return;
        }

        addImage(
          { image: file },
          {
            onSuccess: (imageUrl) => {
              setUploadedImages((prev) => {
                const updatedImages = [...prev, imageUrl]; // Tambahkan URL ke state
                if (onSuccess && updatedImages.length === files.length) {
                  onSuccess(updatedImages); // Callback jika semua file selesai diunggah
                }
                return updatedImages;
              });

              uploadedUrls.push(imageUrl);
              toast.success(`Image uploaded successfully!,${imageUrl}`);
            },
            onError: (error) => {
              console.error("Image upload failed:", error);
              toast.error(error.message);
            },
          }
        );
      });
    }
  };

  return { handleUploadImage, uploadedImages };
};

export default useMultipleImageUpload;

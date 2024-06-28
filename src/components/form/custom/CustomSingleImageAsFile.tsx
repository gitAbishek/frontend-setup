import { Dispatch, SetStateAction, useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

interface Props {
  required?: boolean;
  selectedImage: File | null; // Allow selectedImage to be a File or string
  setSelectedImage: Dispatch<SetStateAction<File | null>>;
}

const UploadImageAsFile: React.FC<Props> = ({
  selectedImage,
  setSelectedImage,
  required = false,
}) => {
  const { register, formState: { errors } } = useFormContext();
  const fileInputRefs = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage instanceof File) {
      setPreviewUrl(URL.createObjectURL(selectedImage));
    } else if (typeof selectedImage === "string") {
      setPreviewUrl(selectedImage);
    }
  }, [selectedImage]);

  useEffect(() => {
    return () => {
      if (previewUrl && selectedImage instanceof File) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, selectedImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRefs.current) {
      fileInputRefs.current.click();
    }
  };

  const inputProps = register("image", {
    required: required && "Image is required",
  });

  return (
    <div className="flex flex-col gap-2">
      <div>
        <input
          type="file"
          id="image"
          className="hidden"
          {...inputProps}
          ref={fileInputRefs}
          onChange={(event) => {
            handleImageChange(event);
            inputProps.onChange(event);
          }}
        />
        <div className="flex gap-5">
          <button
            type="button"
            className="flex justify-center items-center text-xs text-white rounded-xl p-10 border border-dotted border-gray-600 h-[150px] w-[150px]"
            onClick={(e) => {
              e.stopPropagation();
              triggerFileInput();
            }}
          >
            <FaPlus className="text-black" color="gray" size={22} />
          </button>

          {previewUrl && (
            <div className="relative rounded-md">
              <img
                src={previewUrl}
                alt="image"
                className="h-[150px] w-[150px] rounded-xl object-cover"
              />
            </div>
          )}
        </div>
        {errors.image && (
          <span className="text-red-500 text-sm">
            {errors.image.message?.toString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default UploadImageAsFile;

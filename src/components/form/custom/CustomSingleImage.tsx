import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

interface Props {
  required?: boolean;
  selectedImage: string | null;
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
  setSelectImage?: Dispatch<SetStateAction<File | null>>;
}

const UploadImage: React.FC<Props> = ({
  selectedImage,
  setSelectedImage,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fileInputRefs = useRef<HTMLInputElement>(null);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRefs.current) {
      fileInputRefs.current.click();
    }
  };

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

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

          {selectedImage && (
            <div className="relative rounded-md">
              <img
                src={selectedImage}
                alt="image"
                className="rounded-xl [150px] w-[150px] object-cover"
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

export default UploadImage;

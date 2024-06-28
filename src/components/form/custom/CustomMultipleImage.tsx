import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

interface ImageObject {
  image: string;
}

interface Props {
  required?: boolean;
  selectedImages: ImageObject[];
  setSelectedImages: Dispatch<SetStateAction<ImageObject[]>>;
}

const MultipleImage: React.FC<Props> = ({
  selectedImages,
  setSelectedImages,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fileInputRefs = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const files = event.target.files;
    if (files) {
      const newSelectedFiles = Array.from(files);

      newSelectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImages((prevImages) => [
            ...prevImages,
            { image: reader.result as string }, // Wrap in an object
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const triggerFileInput = () => {
    if (fileInputRefs.current) {
      fileInputRefs.current.click();
    }
  };

  useEffect(() => {
    return () => {
      selectedImages.forEach((imageObj) => {
        URL.revokeObjectURL(imageObj.image);
      });
    };
  }, [selectedImages]);

  const inputProps = register("images", {
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
          multiple  // Allow multiple file selection
        />
        <div className="flex  flex-wrap gap-5">
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

          {selectedImages.map((imageObj, index) => (
            <div key={index} className="flex flex-wrap relative rounded-md">
              <img
                src={imageObj.image}
                alt={`image-${index}`}
                className="rounded-xl h-[150px] w-[150px] object-cover"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                onClick={() => removeImage(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        {errors.images && (
          <span className="text-red-500 text-sm">
            {errors.images.message?.toString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default MultipleImage;

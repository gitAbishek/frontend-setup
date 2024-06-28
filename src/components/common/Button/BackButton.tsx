import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <button
      className="flex items-center justify-center h-10 w-10 dark:bg-[#182235] bg-[#F1F5F9] hover:bg-[#EA8D47]   dark:hover:bg-[#EA8D47] dark:text-white text-[#64748B] hover:text-white  rounded-full"
      onClick={handleBack}
    >
      <IoIosArrowBack size={18} />
    </button>
  );
};

export default BackButton;

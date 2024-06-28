import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

interface Props {
  handlePageChange: (data: { selected: number }) => void;
  total: number;
}

const Pagination: React.FC<Props> = ({ handlePageChange, total }) => {
  return (
    <div className="flex justify-end py-5">
      <ReactPaginate
        previousLabel={
          <Link
            to="#"
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md cursor-pointer"
          >
            Previous
          </Link>
        }
        nextLabel={
          <Link
            to="#"
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md cursor-pointer"
          >
            Next
          </Link>
        }
        breakLabel={"..."}
        pageCount={Math.ceil(total / 10)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName="flex gap-5"
        pageClassName="block"
        pageLinkClassName="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md cursor-pointer"
        activeClassName="bg-gray-400 text-white"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default Pagination;

// How to use it

// const [totalPage, setTotalPage] = useState<number>(0);

// const { data: bookingList } = useGetAllBookingList({
//   offset: totalPage * 10,
//   limit: 10,
// });

// const handlePageChange = (data: any) => {
//     const currentPage = data.selected;
//     setTotalPage(currentPage);
//   };

// <Pagination
// handlePageChange={handlePageChange}
// total={bookingList && getValue(bookingList, "count")}
// />

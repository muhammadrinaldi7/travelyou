import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPagination: React.Dispatch<
    React.SetStateAction<{ currentPage: number; itemsPerPage: number }>
  >;
}
export const PaginationTransaction = ({
  currentPage,
  totalPages,
  setPagination,
}: PaginationProps) => {
  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  return (
    <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
      <ol className="flex justify-center gap-1 text-xs font-medium">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 disabled:text-gray-900/50 rtl:rotate-180"
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </li>
        <li>
          <a
            href="#"
            className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
          >
            {currentPage}
          </a>
        </li>
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex size-8 items-center disabled:text-gray-900/50 justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </li>
      </ol>
    </div>
  );
};

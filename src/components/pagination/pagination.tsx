interface ColourPaginationProps {
  page: number;
  totalPage: number;
  handlePageChange: (page: number) => void;
}
export const ColourPagination: React.FC<ColourPaginationProps> = ({
  page,
  totalPage,
  handlePageChange,
}) => {
  const handlePrevious = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      handlePageChange(page + 1);
    }
  };
  return (
    <>
      <div className="inline-flex items-center justify-center rounded bg-primary-300 py-1 text-white">
        <button
          onClick={handlePrevious}
          className="inline-flex size-8 items-center justify-center rtl:rotate-180"
          disabled={page === 1}
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill={page === 1 ? "gray" : "currentColor"}
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <span className="h-4 w-px bg-white/25" aria-hidden="true"></span>

        <div>
          <label htmlFor="PaginationPage" className="sr-only">
            Page
          </label>

          <input
            type="number"
            className="h-8 w-12 rounded border-none bg-transparent p-0 text-center text-xs font-medium [-moz-appearance:_textfield] focus:outline-none focus:ring-inset focus:ring-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            min="1"
            value={page}
            readOnly
            id="PaginationPage"
          />
        </div>

        <span className="h-4 w-px bg-white/25"></span>

        <button
          onClick={handleNext}
          className="inline-flex size-8 items-center justify-center rtl:rotate-180"
          disabled={page === totalPage}
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill={page === totalPage ? "gray" : "currentColor"}
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

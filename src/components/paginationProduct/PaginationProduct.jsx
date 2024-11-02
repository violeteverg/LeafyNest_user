import PropTypes from "prop-types"; // Import PropTypes
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { Button } from "../ui/button";

const PaginationArrow = ({
  direction,
  pageNumber,
  isDisabled,
  onPageChange,
}) => {
  const isLeft = direction === "left";

  return (
    <Button
      onClick={() => !isDisabled && onPageChange(pageNumber)}
      className={`bg-gray-200 text-black hover:bg-gray-300 ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isDisabled}
    >
      {isLeft ? "«" : "»"}
    </Button>
  );
};

PaginationArrow.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]),
  pageNumber: PropTypes.number,
  isDisabled: PropTypes.bool,
  onPageChange: PropTypes.func,
};

export function PaginationProduct({ pageCount, currentPage, onPageChange }) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= pageCount;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationArrow
            direction='left'
            pageNumber={currentPage - 1}
            isDisabled={isFirstPage}
            onPageChange={onPageChange}
          />
        </PaginationItem>
        <PaginationItem>
          <span className='p-2 font-semibold text-black'>
            Page {currentPage} of {pageCount}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationArrow
            direction='right'
            pageNumber={currentPage + 1}
            isDisabled={isLastPage}
            onPageChange={onPageChange}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
PaginationProduct.propTypes = {
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationProduct;

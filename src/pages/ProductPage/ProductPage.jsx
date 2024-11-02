import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Bodypage from "@/components/bodyPage/BodyPage";
import CardProducts from "@/components/cardProduct/CardProduct";
import { dummyProduct } from "@/lib/mock/DummyProduct";

export default function ProductPages() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get current page from URL search params
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get("page")) || 1;
  const [page, setPage] = useState(currentPage);

  // Calculate pagination
  const productsPerPage = 6;
  const totalProducts = dummyProduct.length;
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  // Slice the product list for the current page
  const product = dummyProduct.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );
  const isHasData = product.length !== 0;

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  // Update page state if the URL changes
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <Bodypage
      image='/bgProduct/bg-all_product.jpg'
      text='Plants'
      pageCount={pageCount}
      currentPage={page}
      onPageChange={handlePageChange}
      isHasData={isHasData}
    >
      {isHasData ? (
        product.map((item) => (
          <CardProducts
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
          />
        ))
      ) : (
        <div>No products available</div>
      )}
    </Bodypage>
  );
}

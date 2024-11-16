import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardProduct from "@/components/CardProduct/CardProduct";
import { useGetProductQuery } from "@/redux/product/api";
import Layoutpage from "@/layout/LayoutPage";

export default function PotsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get("page")) || 1;
  const [page, setPage] = useState(currentPage);

  const { data } = useGetProductQuery({
    page: page,
    categoryName: "pots",
  });

  const productData = data?.data;
  const pagination = data?.pagination;

  const isHasData = productData?.length !== 0;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <Layoutpage
      image='/bgProduct/bg-pots-product.jpg'
      text='Cactus'
      pageCount={pagination?.totalPages}
      currentPage={pagination?.currentPage}
      onPageChange={handlePageChange}
      isHasData={isHasData}
    >
      {isHasData ? (
        productData?.map((item) => (
          <CardProduct
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
          />
        ))
      ) : (
        <div>No cactus products available</div>
      )}
    </Layoutpage>
  );
}

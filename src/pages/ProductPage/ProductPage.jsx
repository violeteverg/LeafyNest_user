import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Bodypage from "@/components/bodyPage/BodyPage";
import CardProducts from "@/components/cardProduct/CardProduct";
import { useGetProductQuery } from "@/redux/product/api";

export default function ProductPages() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get("page")) || 1;
  const [page, setPage] = useState(currentPage);
  const { data } = useGetProductQuery({ page: page });

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
    <Bodypage
      image='/bgProduct/bg-all_product.jpg'
      text='Plants'
      pageCount={pagination?.totalPages}
      currentPage={pagination?.currentPage}
      onPageChange={handlePageChange}
      isHasData={isHasData}
    >
      {isHasData ? (
        productData?.map((item) => (
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

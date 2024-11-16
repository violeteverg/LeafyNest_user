import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardProduct from "@/components/CardProduct/CardProduct";
import { useGetProductQuery } from "@/redux/product/api";
import Layoutpage from "@/layout/LayoutPage";

export default function ProductPages() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get("page")) || 1;
  const search = queryParams.get("search") || "";
  const [page, setPage] = useState(currentPage);

  const { data } = useGetProductQuery({ page, search });

  const productData = data?.data;
  const pagination = data?.pagination;

  const isHasData = productData?.length !== 0;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}&search=${search}`);
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <Layoutpage
      image='/bgProduct/bg-all_product.jpg'
      text='Plants'
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
        <div>No products available</div>
      )}
    </Layoutpage>
  );
}

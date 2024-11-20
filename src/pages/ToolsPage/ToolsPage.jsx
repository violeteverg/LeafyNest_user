import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetProductQuery } from "@/redux/product/api";
import Layoutpage from "@/layout/LayoutPage";
import CardProduct from "@/components/CardProduct/CardProduct";
import CardLoading from "@/components/Loading/CardLoading";

export default function ToolsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get("page")) || 1;
  const [page, setPage] = useState(currentPage);

  const { data, isLoading, isFetching } = useGetProductQuery({
    page: page,
    categoryName: "utils",
  });

  const productData = data?.data;
  const pagination = data?.pagination;

  const isHasData = productData?.length !== 0;
  const loading = isLoading || isFetching;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <Layoutpage
      image='/bgProduct/bg-tools-product.jpg'
      text='Tools'
      pageCount={pagination?.totalPages}
      currentPage={pagination?.currentPage}
      onPageChange={handlePageChange}
      isHasData={isHasData}
    >
      {loading
        ? Array.from({ length: 5 }).map((_, i) => <CardLoading key={i} />)
        : productData?.map((item) => (
            <CardProduct
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
            />
          ))}
    </Layoutpage>
  );
}

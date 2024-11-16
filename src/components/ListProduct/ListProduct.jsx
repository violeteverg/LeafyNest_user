import { DummyListProduct } from "@/lib/mock/DummyListProduct";
import WidthWrapper from "../WidthWrapper";
import ListCard from "./ListCard/ListCard";

export default function ListProduct() {
  return (
    <WidthWrapper>
      <div className='flex flex-col lg:flex-row justify-center h-full items-center gap-4 mt-4'>
        {DummyListProduct.map((items, i) => (
          <ListCard
            key={i}
            title={items?.title}
            image={items?.image}
            link={items?.link}
          />
        ))}
      </div>
    </WidthWrapper>
  );
}

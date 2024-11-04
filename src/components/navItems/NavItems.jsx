import { ProductCategory } from "@/lib/mock/DummyProductCategory";
import { useEffect, useRef, useState } from "react";
import ListNavItems from "../ListNavItems/ListNavItems";
import { useOnClickOutside } from "@/hooks/useClickOutside";

export default function NavItems() {
  const [active, setActive] = useState(null);
  const isAnyOpen = active !== null;
  const ref = useRef();

  useOnClickOutside(ref, () => {
    setActive(null);
  });

  // ESC button to close navbar if it open
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setActive(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.addEventListener("keydown", handler);
    };
  }, []);

  return (
    <div className='flex gap-4 h-full' ref={ref}>
      {ProductCategory.map((category, i) => {
        const openHandler = () => {
          if (active === i) {
            setActive(null);
          } else {
            setActive(i);
          }
        };

        const isOpen = active === i;
        return (
          <ListNavItems
            category={category}
            openhandler={openHandler}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
}

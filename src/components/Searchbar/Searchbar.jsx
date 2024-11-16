import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../ui/input";

export default function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );
  const navigate = useNavigate();

  const updateSearchParams = (query) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    if (!params.has("page")) {
      params.set("page", "1");
    }
    return params;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;
      const updatedParams = updateSearchParams(query);
      setSearchParams(updatedParams);
      navigate(`/all-product?${updatedParams.toString()}`);
    }
  };

  return (
    <div className='relative w-fit md:w-[500px] lg:w-[500px]'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
      <Input
        type='text'
        placeholder='Search Product'
        className='pl-12 pr-4'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

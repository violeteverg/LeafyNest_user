import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

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
      <Search className='absolute z-10 top-0 bottom-0 w-6 h-6 my-auto text-slate-800 left-3' />
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

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import PropTypes from "prop-types";

export default function NoContent({ description }) {
  const navigate = useNavigate();

  return (
    <div className='h-[70vh] w-full flex flex-col justify-center items-center space-y-4'>
      <img src='/no_content.png' alt='nodata' width={250} height={250} />
      <div className='flex flex-col w-[90%] lg:w-[30%] space-y-2'>
        <p className='text-gray-500 text-center'>{description}</p>
        <Button onClick={() => navigate("/all-product")}>Get Product</Button>
      </div>
    </div>
  );
}

NoContent.propTypes = {
  description: PropTypes.string,
};

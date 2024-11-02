import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ListCard({ title, image, link }) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(link);
  };

  return (
    <div className='lg:w-[35vw] md:w-[45vw] h-fit mx-2 text-white justify-center items-center'>
      <div className='bg-[#bdc3c7] rounded-xl m-3 p-3 flex flex-col items-center'>
        <h1 className='text-4xl mt-4'>{title}</h1>
        <hr className='w-[200px] my-2' />
        <Button variant='secondary' className='mt-4' onClick={onClickHandler}>
          <span>Shop Collection</span>
        </Button>
        <img src={image} alt='plant' className='w-[50%]' />
      </div>
    </div>
  );
}

ListCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string,
};

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ListCard({ title, image, link }) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(link);
  };

  return (
    <div className='lg:w-[35vw] md:w-[45vw] h-fit mx-4 text-white justify-center items-center'>
      <div className='bg-white border flex flex-col justify-center items-center border-teal-200 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:border-teal-400'>
        <img src={image} alt='plant' className='w-[50%]' />

        <div className='p-4 w-full'>
          <h2 className='text-xl font-semibold text-center text-teal-900 mb-2'>
            {title}
          </h2>
          <Button
            asChild
            variant='default'
            className='w-full bg-teal-600 hover:bg-teal-700 text-white'
            onClick={onClickHandler}
          >
            <span>Shop Collection</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

ListCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string,
};

import { Button } from "@/components/ui/button";
import WidthWrapper from "../WidthWrapper";

export default function AboutUs() {
  return (
    <WidthWrapper>
      <div className='m-4 text-white flex flex-col gap-y-4'>
        {/* parent */}
        <div className='grid  md:grid-cols-[2fr_2fr] lg:grid-cols-[2fr_1fr] gap-4'>
          {/* div about */}
          <div className='md:col-span-1 text-xl bg-teal-600 p-6 rounded-xl flex flex-col items-center'>
            <h2 className='text-3xl text-center font-bold mb-4 mt-4'>
              ABOUT US
            </h2>
            <hr className='w-[200px] mb-6' />
            <div className='text-lg w-full lg:w-[70%]'>
              <p className='mt-4 leading-relaxed'>
                Welcome to our e-commerce site, your go-to destination for
                beautiful and unique houseplants. We are passionate about
                bringing the beauty of nature into your home, with a wide
                selection of plants that will brighten up any space.
              </p>
              <p className='mt-4 leading-relaxed '>
                Our mission is to provide you with high-quality plants and
                excellent customer service. Whether you are a plant enthusiast
                or just starting your indoor garden, we have something for
                everyone. Explore our collection and find the perfect plants to
                suit your style and needs.
              </p>
            </div>
          </div>
          {/* div gambar */}
          <div className='md:col-span-1'>
            <img
              src='/aboutus/bg_about_2.jpeg'
              alt='about1'
              width={600}
              height={600}
              className='object-cover h-full w-full rounded-xl'
            />
          </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-[2fr_2fr] lg:grid-cols-[2fr_1fr] gap-4'>
          {/* div gambar gede 2 */}
          <div className='md:col-span-1'>
            <img
              src='/aboutus/bg_about_1.png'
              alt='about2'
              width={400}
              height={400}
              className='object-cover h-full w-full rounded-xl'
            />
          </div>
          {/* div discount */}
          <div className='md:col-span-1 rounded-xl flex flex-col justify-center items-center bg-olive text-white p-4'>
            <h2 className='text-xl font-bold mb-2'>
              BUY ONLINE NOW & GET 10% OFF!
            </h2>
            <Button variant='secondary'>
              <span>Shop Now</span>
            </Button>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
}

import {
  DummyFooter,
  DummyHelp,
  DummyOpening,
  DummySocialMedia,
} from "@/lib/mock/DummyFooter";
import WidthWrapper from "../WidthWrapper";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <WidthWrapper>
      <footer className='bg-softblue text-slate-800 py-8'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between space-y-8 md:space-y-0'>
            <div className='md:w-1/4'>
              <h2 className='text-lg font-bold mb-4'>Our Store</h2>
              {DummyFooter.map((item, i) => (
                <div key={i} className='flex flex-row gap-2 mb-2'>
                  <p className='font-medium'>{`${item?.type}:`}</p>
                  <p>{item?.value}</p>
                </div>
              ))}
            </div>
            <div className='md:w-1/4'>
              <h2 className='text-lg font-bold mb-4'>Opening Hours</h2>
              {DummyOpening.map((item, i) => (
                <div key={i} className='flex flex-row gap-2 mb-2'>
                  <p className='font-medium'>{`${item?.type}:`}</p>
                  <p>{item?.value}</p>
                </div>
              ))}
            </div>
            <div className='md:w-1/4'>
              <h2 className='text-lg font-bold mb-4'>Help</h2>
              {DummyHelp.map((item, i) => (
                <div key={i} className='hover:underline mb-2'>
                  <Link href={item?.href}>{item?.name}</Link>
                </div>
              ))}
            </div>
            <div className='md:w-1/4'>
              <h2 className='text-lg font-bold mb-4'>Stay Connected</h2>
              <form className='mb-4'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='w-full px-2 py-1 text-gray-800'
                />
                <button
                  type='submit'
                  className='w-full bg-blue-500 hover:bg-blue-600 text-white py-1 mt-2'
                >
                  Subscribe
                </button>
              </form>
              <div className='flex space-x-4'>
                {DummySocialMedia.map((item, i) => (
                  <Link key={i} href={item?.href}>
                    <img
                      src={item?.icon}
                      alt={item?.name}
                      width={24}
                      height={24}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className='border-t border-gray-700 mt-8 pt-4'>
            <p className='text-center text-sm'>
              &copy; {new Date().getFullYear()} Lala Company. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </WidthWrapper>
  );
}

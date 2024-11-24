import {
  DummyFooter,
  DummyHelp,
  DummyOpening,
  DummySocialMedia,
} from "@/lib/mock/DummyFooter";
import WidthWrapper from "../WidthWrapper";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className='bg-teal-900 text-teal-100'>
      <WidthWrapper>
        <div className='py-12 px-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div>
              <h2 className='text-xl font-semibold mb-4 text-teal-300'>
                Our Store
              </h2>
              {DummyFooter.map((item, i) => (
                <div key={i} className='flex flex-row gap-2 mb-2'>
                  <p className='font-medium text-teal-300'>{`${item.type}:`}</p>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className='text-xl font-semibold mb-4 text-teal-300'>
                Opening Hours
              </h2>
              {DummyOpening.map((item, i) => (
                <div key={i} className='flex flex-row gap-2 mb-2'>
                  <p className='font-medium text-teal-300'>{`${item.type}:`}</p>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className='text-xl font-semibold mb-4 text-teal-300'>Help</h2>
              {DummyHelp.map((item, i) => (
                <div key={i} className='mb-2'>
                  <Link
                    href={item.href}
                    className='hover:text-teal-300 transition-colors'
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
            <div>
              <h2 className='text-xl font-semibold mb-4 text-teal-300'>
                Stay Connected
              </h2>
              <form className='mb-4 space-y-2'>
                <Input
                  type='email'
                  placeholder='Enter your email'
                  className='bg-teal-800 border-teal-700 text-teal-100 placeholder-teal-400'
                />
                <Button
                  type='submit'
                  className='w-full bg-teal-600 hover:bg-teal-700 text-white'
                >
                  Subscribe
                </Button>
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
        </div>
        <div className='border-t border-teal-800 py-4'>
          <p className='text-center text-sm text-teal-400'>
            &copy; {new Date().getFullYear()} Lala Company. All rights reserved.
          </p>
        </div>
      </WidthWrapper>
    </footer>
  );
}

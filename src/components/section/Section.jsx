"use client";
import WidthWrapper from "@/components/WidthWrapper";
import { perks } from "@/lib/mock/Perks";

export default function Section() {
  return (
    <WidthWrapper>
      <div className='grid grid-cols-1 gap-y-12 m-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
        {perks.map((perk) => (
          <div
            key={perk.name}
            className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'
          >
            <div className='md:flex-shrink-0 flex justify-center'>
              <div className='h-16 w-16 flex items-center justify-center rounded-full bg-softblue'>
                {<perk.icons className='w-1/3 h-1/3' />}
              </div>
            </div>
            <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
              <h3 className='text-base font-medium text-gray-900'>
                {perk.name}
              </h3>
              <p className=' text-sm mt-3 text-muted-foreground'>
                {perk.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </WidthWrapper>
  );
}

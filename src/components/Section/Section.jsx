import WidthWrapper from "@/components/WidthWrapper";
import { perks } from "@/lib/mock/Perks";

export default function Section() {
  return (
    <WidthWrapper>
      <div className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center space-y-4 transition-all duration-300 ease-in-out hover:transform hover:scale-105'
              >
                <div className='flex justify-center'>
                  <div className='h-20 w-20 flex items-center justify-center rounded-full bg-teal-100 shadow-inner'>
                    <perk.icons className='w-10 h-10 text-teal-600' />
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-teal-900'>
                    {perk.name}
                  </h3>
                  <p className='mt-2 text-sm text-teal-600'>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
}

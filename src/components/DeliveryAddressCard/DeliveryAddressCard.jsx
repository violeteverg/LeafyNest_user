import { Button } from "../ui/button";
import { MapPinned } from "lucide-react";

export default function DeliveryAddressCard() {
  return (
    <div className='w-full flex flex-col p-2 h-fit border border-black rounded-lg items-center overflow-y-auto my-2'>
      <div className='flex justify-between w-full items-center p-2'>
        <div className='flex flex-col  items-start justify-center gap-y-4'>
          <h1 className='text-4xl'>Delivery Address</h1>
          <div className='flex gap-2'>
            <MapPinned />
            <h2>Kost:</h2>
            <h2>udin</h2>
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero
            impedit voluptate magnam quos vitae quibusdam, atque facere odit
            dignissimos, asperiores itaque recusandae praesentium voluptatem
            ipsam. Aliquam architecto quibusdam tempore dignissimos!
          </p>
          <div>
            <Button variant={"outline"} size={"default"}>
              <p>change address</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

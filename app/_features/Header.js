import { Button } from "@/components/ui/button";
import { Logo } from "../_icons/Logo";
import { ChevronRight, MapPin, User } from "lucide-react";
import CartOrderSheet from "./CartOrderSheet"; // Import the CartOrderSheet

const Header = () => {
  return (
    <div className="w-full bg-[#18181B] h-[68px] flex items-center justify-between py-3 px-22 sticky top-0">
      {/* logo */}
      <div className="flex flex-row gap-3">
        <Logo />
        <div className="flex flex-col">
          <div className="font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px] flex flex-row">
            <p className="text-white">Nom</p>
            <p className="text-[#EF4444]">Nom</p>
          </div>
          <p className="text-center font-inter text-[12px] font-normal leading-4 text-white">
            swift delivery
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="gap-3 flex flex-row">
        {/* Location button */}
        <Button variant="default" className="bg-white rounded-full gap-1">
          <MapPin className="text-[#EF4444]" />
          <p className="text-[#EF4444] font-inter text-[12px] font-normal leading-4">
            Delivery address:
          </p>
          <p className="text-[#71717A] font-inter text-[12px] font-normal leading-4">
            Add location
          </p>
          <ChevronRight className="text-[#71717A]" />
        </Button>

        {/* Cart button - Replace with CartOrderSheet */}
        <CartOrderSheet />

        {/* User button */}
        <Button variant="default" className="bg-[#EF4444] rounded-full">
          <User />
        </Button>
      </div>
    </div>
  );
};

export default Header;
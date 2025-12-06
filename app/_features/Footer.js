import { Facebook, FacebookIcon, Instagram } from "lucide-react";
import { Logo } from "../_icons/Logo";

const Footer = () => {
  return (
    <div className="w-full bg-[#18181B] h-[755px] pt-15 flex flex-col items-center">
      {/* red cross with words */}
      <div className="w-full h-[92px] bg-[#EF4444] py-7 px-[98px]  flex overflow-hidden ">
        <div className="scroll-animation gap-[34px]">
          <h2 className="text-white font-inter text-[30px] font-semibold leading-9 tracking-[-0.75px]">
            Fresh fast delivered
          </h2>
          <h2 className="text-white font-inter text-[30px] font-semibold leading-9 tracking-[-0.75px]">
            Fresh fast delivered
          </h2>
          <h2 className="text-white font-inter text-[30px] font-semibold leading-9 tracking-[-0.75px]">
            Fresh fast delivered
          </h2>
          <h2 className="text-white font-inter text-[30px] font-semibold leading-9 tracking-[-0.75px]">
            Fresh fast delivered
          </h2>
          <h2 className="text-white font-inter text-[30px] font-semibold leading-9 tracking-[-0.75px]">
            Fresh fast delivered
          </h2>
        </div>
      </div>

      {/* main writings */}
      <div className="mx-22  w-[1264px] gap-55 flex flex-row mt-[76px] mb-[104px]">
        {/* logo */}
        <div className="flex flex-col gap-3 items-center w-22 ">
          <Logo />
          <div className="flex flex-col">
            <div className="font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px] flex flex-row">
              <p className="text-white">Nom</p>
              <p className="text-[#EF4444]">Nom</p>
            </div>
            <p className=" font-inter text-[12px] font-normal leading-4 text-white">
              swift delivery
            </p>
          </div>
        </div>
        {/* others */}
        <div className="gap-28 flex flex-row">
          <div className="flex flex-col gap-4 text-white">
            <p className="text-[#71717A] font-inter text-[16px] font-normal leading-7">
              NOMNOM
            </p>
            <p>Home</p>
            <p>Contact us</p>
            <p>Delivery zone</p>
          </div>
          {/* category */}
          <div className="flex flex-row gap-14">
            <div className="flex flex-col gap-4 text-white">
              <p className="text-[#71717A] font-inter text-[16px] font-normal leading-7">
                MENU
              </p>
              <p>Appetizers</p>
              <p>Salads</p>
              <p>Pizzas</p>
              <p>Main dishes</p>
              <p>Desserts</p>
            </div>
          </div>

          {/* Follow us */}
          <div className="flex flex-col gap-4 text-white">
            <p className="text-[#71717A] font-inter text-[16px] font-normal leading-7">
              FOLLOW US
            </p>
            <div className="flex flex-row gap-4">
              <FacebookIcon />
              <Instagram />
            </div>
          </div>
        </div>
      </div>

      {/* bottom grayish thing */}
      <div className="flex w-[1264px] py-8 items-center gap-12 border-t border-[rgba(244,244,245,0.4)] text-[#71717A] font-inter text-[14px] font-normal leading-5">
        <p>Copy right 2024 © Nomnom LLC</p>
        <p>Privacy policy </p>
        <p>Terms and conditoin</p>
      </div>
    </div>
  );
};
export default Footer;

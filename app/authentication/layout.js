export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full p-5 gap-12 justify-center items-center ">
      <div className="w-[416px]">{children} </div>
      <div className="hidden md:block w-[856px] h-[904px] relative">
        <img
          src="/deliveryGuy.jpg"
          alt="Delivery guy"
          className="absolute w-[856px] h-[904px] object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}

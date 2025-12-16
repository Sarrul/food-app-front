"use client";

import { useState } from "react";
import CategoriesList from "./categories/CategoriesList";
import FoodsList from "./foods/FoodsList";
import { Logo } from "../_icons/Logo";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Truck } from "lucide-react";
import OrderPage from "./order/orderPage";

const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("food");

  return (
    <div className="bg-[#F4F4F5] flex flex-row gap-6 justify-center">
      {/* side bar */}
      <div className="w-[205px] h-[1100px] bg-white sticky top-0  px-5 py-9 flex-col items-start">
        {/* logo */}
        <div className="flex flex-row gap-3 mb-10">
          <Logo />
          <div className="flex flex-col">
            <p className="text-[#09090B] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
              NomNom
            </p>
            <p className="text-center font-inter text-[12px] font-normal leading-4 text-[#71717A]">
              swift delivery
            </p>
          </div>
        </div>

        {/* buttons */}
        <div className="gap-6 flex flex-col">
          {/* food menu button */}
          <Button
            className={`p-6 rounded-full w-full  ${
              activeTab === "food"
                ? "bg-[#18181B] text-white"
                : "bg-white text-[#09090B]"
            }`}
            onClick={() => setActiveTab("food")}
          >
            <LayoutDashboard />
            <p className="text-sm font-medium">Food menu</p>
          </Button>
          {/* order button */}
          <Button
            className={`p-6 rounded-full w-full   ${
              activeTab === "orders"
                ? "rounded-full bg-[#18181B] text-white"
                : "bg-white text-[#09090B]"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <Truck />
            <p className="text-sm font-medium">Orders</p>
          </Button>
        </div>
      </div>
      {/* main */}
      <div className="flex flex-1">
        {activeTab === "food" ? (
          <div className="flex flex-col gap-6">
            {/* deed taliin menu */}
            <CategoriesList />
            {/* gol food section */}
            <FoodsList />
          </div>
        ) : (
          <OrderPage />
        )}
      </div>
    </div>
  );
};
export default AdminPage;

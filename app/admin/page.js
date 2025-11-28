"use client";

import { useState } from "react";
import CategoriesList from "./categories/CategoriesList";
import FoodsList from "./foods/FoodsList";

const AdminPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-[#F4F4F5] flex flex-row gap-6 justify-center">
      {/* side bar */}
      <div className="w-[205px] h-[1024px] bg-white"></div>
      {/* main */}
      <div className="flex flex-col gap-6">
        {/* deed taliin menu */}
        <CategoriesList />
        {/* gol food section */}
        <FoodsList />
      </div>
    </div>
  );
};
export default AdminPage;

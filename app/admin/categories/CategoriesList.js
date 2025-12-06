"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import AddCategoryDialog from "./AddCategoryDialog";
import { useFoodCategory } from "../../_provider/FoodCategoryProvider";

const CategoriesList = () => {
  const { categories, foods, addCategory } = useFoodCategory();

  return (
    <div>
      <div className="flex flex-col gap-6 w-full">
        <div className=" w-full flex  justify-end">
          <Image src="/Avatar.png" width={36} height={36} alt="Avatar" />
        </div>
        <div className="bg-white rounded-xl p-6 h-44 w-[1171px] gap-4 flex flex-col">
          <div className="text-(--text-text-foreground) font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
            Dishes Category
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            {console.log("Test", categories, foods)}
            <Badge className="px-4 py-2" variant="outline">
              All dishes
              <Badge variant="default" className="px-2.5 py-0.5">
                {foods.length}
              </Badge>
            </Badge>
            {categories.map((item) => {
              const foodCount = foods.filter(
                (food) => food.category === item._id
              ).length;
              return (
                <Badge
                  key={item._id}
                  className="px-4 py-2  gap-2"
                  variant="outline"
                >
                  {item.categoryName}
                  <Badge variant="default" className="px-2.5 py-0.5">
                    {foodCount}
                  </Badge>
                </Badge>
              );
            })}
            <AddCategoryDialog onAdd={addCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoriesList;

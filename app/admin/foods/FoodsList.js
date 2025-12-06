"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

import AddFoodDialog from "./AddFoodDialog";
import FoodInfoDialog from "./FoodInfoDialog";
import { useFoodCategory } from "../../_provider/FoodCategoryProvider";

const FoodsList = () => {
  const [newFood, setNewFood] = useState({
    foodName: "",
    price: "",
    image: "",
    ingredients: "",
    category: "",
  });
  const { categories, foods } = useFoodCategory();

  return (
    <div>
      {categories.map((item) => {
        return (
          <div
            key={item._id}
            className="flex flex-col  w-[1171px] h-[325px] bg-white rounded-xl p-5 mb-6 "
          >
            <div className="text-(--text-text-foreground) font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px] ">
              <p className="mb-4">{item.categoryName}</p>
              <div className="flex flex-row gap-4">
                <AddFoodDialog
                  category={item._id}
                  categoryName={item.categoryName}
                  newFood={newFood}
                  setNewFood={setNewFood}
                />
                {foods
                  .filter((food) => food.category === item._id)
                  .map((food) => (
                    <FoodInfoDialog
                      key={food._id}
                      food={food}
                      categories={categories}
                      onDelete={(deletedId) =>
                        setFoods((prevFoods) =>
                          prevFoods.filter((f) => f._id !== deletedId)
                        )
                      }
                      trigger={
                        <div className="flex p-4 flex-col items-start gap-5 self-stretch  border border-[#E4E4E7] w-[270px] h-[241px] rounded-[20px]">
                          <div className="w-[239px] h-[129px] rounded-xl overflow-hidden bg-amber-100">
                            <Image
                              src={food.image}
                              alt={food.foodName}
                              width={239}
                              height={129}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex flex-col gap-2 justify-start items-start ">
                            <div className="flex flex-row gap-2.5 w-60 ">
                              <p className="text-[#EF4444] text-sm font-medium leading-5 font-inter w-[190px] flex justify-start">
                                {food.foodName}
                              </p>
                              <p className="text-[#09090B] text-xs font-normal leading-4 font-inter">
                                {food.price}₮
                              </p>
                            </div>

                            <p className="text-[#09090B] text-xs font-normal leading-4 font-inter flex justify-start text-start">
                              {food.ingredients}
                            </p>
                          </div>
                        </div>
                      }
                    />
                  ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default FoodsList;

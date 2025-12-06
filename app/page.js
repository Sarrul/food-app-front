"use client";

import Image from "next/image";
import Footer from "./_features/Footer";
import Header from "./_features/Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);

  const getCategory = async () => {
    try {
      const res = await axios.get("http://localhost:999/foodcategory");
      // console.log("response", res);
      setCategories(res.data);
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  };

  const getFood = async () => {
    try {
      const res = await axios.get("http://localhost:999/food");
      console.log("response", res);
      setFoods(res.data);
    } catch (err) {
      console.log("Error fetching food:", err);
    }
  };

  useEffect(() => {
    getCategory();
    getFood();
  }, []);
  return (
    <div className="bg-[#404040] gap-22">
      <div className="mb-22">
        <Header />
        <Image src="/BG.png" width={1440} height={570} alt="BG" />
      </div>
      <div className="gap-13 flex flex-col">
        {categories.map((item) => {
          return (
            <div
              key={item._id}
              className="flex flex-col gap-13 text-white px-22"
            >
              <p className=" text-white font-inter text-[30px] font-semibold leading-9 tracking-[-0.75px]">
                {item.categoryName}
              </p>
              <div className="flex flex-row gap-9">
                {foods
                  .filter((food) => food.category === item._id)
                  .map((food) => {
                    return (
                      <div className="flex p-4 flex-col items-start gap-5 self-stretch  border border-[#E4E4E7] bg-white w-[270px] h-[241px] rounded-[20px]">
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
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

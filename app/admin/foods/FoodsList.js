"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

import AddFoodDialog from "./AddFoodDialog";
import FoodInfoDialog from "./FoodInfoDialog";

const UPLOAD_PRESET = "food-app";
const CLOUD_NAME = "dzkjbbs03";

const FoodsList = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [preview, setPreview] = useState("");
  const [newFood, setNewFood] = useState({
    foodName: "",
    price: "",
    image: "",
    ingredients: "",
    category: "",
  });

  const getCategory = async () => {
    try {
      const res = await axios.get("http://localhost:999/foodcategory");
      console.log("response", res);
      setCategories(res.data);
    } catch (err) {
      console.log("Error fetching food:", err);
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

  const addFood = async () => {
    if (!newFood) return;
    console.log(newFood, "newFood");

    // setLoading(true);
    try {
      const res = await axios.post("http://localhost:999/food", newFood);
      console.log(res, "response");
      setFoods((prev) => [...prev, res.data]);
      setNewFood({
        foodName: "",
        price: "",
        image: "",
        ingredients: "",
        category: "",
      });
    } catch (err) {
      console.log("Error creating food:", err);
      // } finally {
      // setLoading(false);
    }
  };

  const getFoodByCategory = async (categoryId) => {
    const res = await axios.get(`http://localhost:999/food/${categoryId}`);
    return res.data;
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      console.error("cloudinary failed", err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    {
      if (!file) return;
      try {
        const url = await uploadToCloudinary(file);
        setPreview(url);
      } catch (err) {
        console.error("failed to upload image", err.message);
      }
    }
  };

  useEffect(() => {
    getFood();
    getCategory();
  }, []);

  return (
    <div>
      {categories.map((item) => {
        {
          console.log("FOOD:", foods, "CATEGORY:", item._id);
        }
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
                  onAdd={addFood}
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

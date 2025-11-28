"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

import AddFoodDialog from "./AddFoodDialog";

const FoodsList = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
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
      console.log("Error fetching categories:", err);
    }
  };

  const getFood = async () => {
    try {
      const res = await axios.get("http://localhost:999/food");
      console.log("response", res);
      setFoods(res.data);
    } catch (err) {
      console.log("Error fetching categories:", err);
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
      console.log("Error creating category:", err);
      // } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getFood();
    getCategory();
  }, []);

  return (
    <div>
      {categories.map((item) => (
        <div
          key={item._id}
          className="flex flex-col  w-[1171px] h-[325px] bg-white rounded-xl p-5 mb-6"
        >
          <div className="text-(--text-text-foreground) font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px] ">
            <p className="mb-4">{item.categoryName}</p>
            <AddFoodDialog
              category={item._id}
              categoryName={item.categoryName}
              onAdd={addFood}
              newFood={newFood}
              setNewFood={setNewFood}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default FoodsList;

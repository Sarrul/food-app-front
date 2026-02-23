"use client";

import axios from "axios";
import { toast } from "react-toastify";

const { createContext, useContext, useEffect, useState } = require("react");

const FoodCategoryContext = createContext(null);

export const useFoodCategory = () => {
  const context = useContext(FoodCategoryContext);

  if (!context) {
    throw new Error(
      "useFoodCategory must be used inside a <FoodCategoryProvider>"
    );
  }
  return context;
};

export const FoodCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);

  // category
  const getCategory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/foodcategory");

      setCategories(res.data);
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  };

  const addCategory = async (categoryName) => {
    // setLoading(true);
    const token =
      localStorage.getItem("Token") || localStorage.getItem("token") || "";

    try {
      const res = await axios.post(
        "http://localhost:5000/foodcategory",
        {
          categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res, "response");
      setCategories((prev) => [...prev, res.data]);
    } catch (err) {
      console.log("Error creating categories:", err);
      // } finally {
      //   setLoading(false);
    }
  };

  const updateCategory = async (id, categoryName) => {
    const token =
      localStorage.getItem("Token") || localStorage.getItem("token") || "";

    try {
      const res = await axios.put(
        "http://localhost:5000/foodcategory",
        { id, categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
      toast.success("Category updated");
      return true;
    } catch (err) {
      console.log("Error updating category:", err.response?.data || err.message);
      toast.error("Failed to update category");
      return false;
    }
  };

  const deleteCategory = async (id) => {
    const token =
      localStorage.getItem("Token") || localStorage.getItem("token") || "";

    try {
      await axios.delete("http://localhost:5000/foodcategory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id },
      });

      setCategories((prev) => prev.filter((item) => item._id !== id));
      setFoods((prev) => prev.filter((food) => food.category !== id));
      toast.success("Category deleted");
      return true;
    } catch (err) {
      console.log("Error deleting category:", err.response?.data || err.message);
      toast.error("Failed to delete category");
      return false;
    }
  };

  // food
  const getFood = async () => {
    try {
      const res = await axios.get("http://localhost:5000/food");
      console.log("response", res);
      setFoods(res.data);
    } catch (err) {
      console.log("Error fetching food:", err);
    }
  };

  const addFood = async (food) => {
    console.log(food, "foodfoodfoodfood");
    if (!food) return;
    const token = localStorage.getItem("Token") || "";

    // setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/food", food, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Successfully created food");
    } catch (err) {
      console.log("Error creating food:", err.response?.data || err.message);
      // } finally {
      // setLoading(false);
    }
  };

  const updateFood = async (id, updatedFood) => {
    const token = localStorage.getItem("Token") || "";

    try {
      const res = await axios.put(
        `http://localhost:5000/food/${id}`,
        updatedFood,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Updated food:", res.data);

      setFoods((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
    } catch (err) {
      console.error("Error updating food:", err);
    }
  };

  const deleteFood = async (id) => {
    const token = localStorage.getItem("Token") || "";

    try {
      await axios.delete(`http://localhost:5000/food/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFoods((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  };

  const getFoodByCategory = async (categoryId) => {
    const res = await axios.get(`http://localhost:5000/food/${categoryId}`);
    return res.data;
  };

  useEffect(() => {
    getCategory();
    getFood();
  }, []);
  return (
    <FoodCategoryContext.Provider
      value={{
        categories,
        foods,
        addCategory,
        updateCategory,
        deleteCategory,
        addFood,
        getCategory,
        getFood,
        getFoodByCategory,
        deleteFood,
        updateFood,
      }}
    >
      {children}
    </FoodCategoryContext.Provider>
  );
};

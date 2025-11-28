"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useEffect, useState } from "react";
import AddCategoryDialog from "./AddCategoryDialog";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    try {
      const res = await axios.get("http://localhost:999/foodcategory");
      // console.log("response", res);
      setCategories(res.data);
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  };

  const handleAddCategory = async (categoryName) => {
    // setLoading(true);
    try {
      const res = await axios.post("http://localhost:999/foodcategory", {
        categoryName,
      });

      console.log(res, "response");
      setCategories((prev) => [...prev, res.data]);
    } catch (err) {
      console.log("Error creating categories:", err);
      // } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 w-full">
        <div className=" w-full flex  justify-end">
          <Image src="/Avatar.png" width={36} height={36} alt="Avatar" />
        </div>
        <div className="bg-white rounded-xl p-6 h-44 w-[1171px] gap-4">
          <p className="text-(--text-text-foreground) font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
            Dishes Category
          </p>
          <div>
            {categories.map((item) => (
              <Badge key={item._id} className="px-4 py-2 m-1" variant="outline">
                {item.categoryName}
              </Badge>
            ))}
            <AddCategoryDialog onAdd={handleAddCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoriesList;

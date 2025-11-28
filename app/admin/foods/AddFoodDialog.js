"use client";
import { useEffect, useState } from "react";
import { Plus, X, Image } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const UPLOAD_PRESET = "food-app";
const CLOUD_NAME = "dzkjbbs03";

const AddFoodDialog = ({
  category,
  categoryName,
  onAdd,
  newFood,
  setNewFood,
}) => {
  const [close, setClose] = useState(false);
  const initialState = {
    foodName: "",
    price: "",
    image: "",
    ingredients: "",
    category: "",
  };
  const [preview, setPreview] = useState("");

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
        setNewFood({ ...newFood, image: url });
      } catch (err) {
        console.error("failed to upload image", err.message);
      }
    }
  };

  const handleClose = (state) => {
    setClose(state);
    if (!state) {
      setNewFood(initialState);
      setPreview("");
    }
  };

  return (
    <Dialog open={close} onOpenChange={handleClose}>
      <DialogTrigger onClick={() => setNewFood({ ...newFood, category })}>
        <div className="flex flex-col justify-center items-center gap-6 flex-1 self-stretch p-2 px-4 rounded-[20px] border border-dashed border-[#EF4444] w-[270px] h-[241px]">
          <div className="bg-[#EF4444] w-9 h-9 rounded-full flex justify-center items-center">
            <Plus strokeWidth={1} className="text-white" />
          </div>
          <div className="text-[#18181B] text-center font-inter text-sm font-medium leading-5 flex flex-col">
            <p>Add new Dish to </p>
            {categoryName}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row gap-6">
          <DialogDescription>
            Food name
            <Input
              placeholder="Type food name..."
              value={newFood.foodName}
              onChange={(e) =>
                setNewFood({ ...newFood, foodName: e.target.value })
              }
            />
          </DialogDescription>

          {/* price */}
          <DialogDescription>
            Food price
            <Input
              placeholder="Enter price..."
              value={newFood.price}
              onChange={(e) =>
                setNewFood({ ...newFood, price: e.target.value })
              }
            />
          </DialogDescription>
        </div>

        {/* ingredients */}
        <DialogDescription>
          Ingredients
          <Input
            placeholder="List ingredients..."
            value={newFood.ingredients}
            onChange={(e) =>
              setNewFood({ ...newFood, ingredients: e.target.value })
            }
            className="h-[90px] "
          />
        </DialogDescription>

        {/* image */}
        <div className="flex flex-col gap-2 relative">
          <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-[#2563EB]/20 bg-[#2563EB]/5 rounded-md cursor-pointer ">
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview("");
                    setNewFood({ ...newFood, image: "" });
                  }}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center">
                  <Image strokeWidth={2} className="w-4 h-4" />
                </div>
                <p>Click to upload image</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="w-full flex justify-end">
          <Button
            variant="default"
            className="w-[93px] h-10"
            onClick={() => {
              onAdd();
              handleClose(false);
            }}
            // disabled={loading}
          >
            Add a dish
            {/* {loading ? "Adding..." : "Add a dish"} */}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddFoodDialog;

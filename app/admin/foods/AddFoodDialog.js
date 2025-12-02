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
import ImageUploader from "../../_components/ImageUploader";
const UPLOAD_PRESET = "food-app";
const CLOUD_NAME = "dzkjbbs03";

const AddFoodDialog = ({
  category,
  categoryName,
  onAdd,
  newFood,
  setNewFood,
}) => {
  const initialState = {
    foodName: "",
    price: "",
    image: "",
    ingredients: "",
    category: "",
  };
  const [close, setClose] = useState(false);

  const handleClose = (state) => {
    setClose(state);
    if (!state) {
      setNewFood(initialState);
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
          <ImageUploader
            value={newFood.image}
            onChange={(url) => setNewFood({ ...newFood, image: url })}
          />
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

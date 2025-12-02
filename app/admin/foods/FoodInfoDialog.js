import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import ImageUploader from "../../_components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const FoodInfoDialog = ({ trigger, food, categories, onDelete }) => {
  const category = categories.find((c) => c._id === food.category);
  const [open, setOpen] = useState(false);
  const [editableFood, setEditableFood] = useState({
    foodName: food.foodName,
    price: food.price,
    ingredients: food.ingredients,
    category: food.category,
    image: food.image,
  });

  const updateFood = async () => {
    try {
      const res = await axios.put(
        `http://localhost:999/food/${food._id}`,
        editableFood
      );
      console.log("Updated food:", res.data);

      setOpen(false);
    } catch (err) {
      console.error("Error updating food:", err);
    }
  };

  const deleteFood = async () => {
    try {
      await axios.delete(`http://localhost:999/food/${food._id}`);
      console.log("Deleted food:", food._id);

      // Call parent callback to remove food from list if provided
      if (onDelete) onDelete(food._id);

      setOpen(false);
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="w-[472px] ">
        <DialogHeader className="mb-3">
          <DialogTitle>Dishes info</DialogTitle>
        </DialogHeader>
        {/* food name */}
        <div className="flex flex-row gap-3 py-3  text-[#71717A] font-inter text-xs font-normal leading-4">
          <p className="w-30">Dish name</p>
          <Input
            value={editableFood.foodName}
            onChange={(e) =>
              setEditableFood({ ...editableFood, foodName: e.target.value })
            }
            style={{ width: "288px" }}
            className="text-black"
          />
        </div>

        {/* food category */}
        <div className="flex flex-row gap-3 py-3  text-[#71717A] font-inter text-xs font-normal leading-4">
          <p className="w-30">Dish category</p>
          <Select
            value={editableFood.category}
            onValueChange={(val) =>
              setEditableFood({ ...editableFood, category: val })
            }
          >
            <SelectTrigger className="w-[288px] text-black">
              <SelectValue placeholder={category.categoryName} />
            </SelectTrigger>

            <SelectContent>
              {categories.map((item) => (
                <SelectItem key={item._id} value={item._id}>
                  {item.categoryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ingredients */}
        <div className="flex flex-row gap-3 py-3  text-[#71717A] font-inter text-xs font-normal leading-4">
          <p className="w-30">Ingredients</p>

          <textarea
            value={editableFood.ingredients}
            onChange={(e) =>
              setEditableFood({ ...editableFood, ingredients: e.target.value })
            }
            className="border rounded-md px-2 py-1 font-inter text-sm text-black w-[288px]"
          />
        </div>

        {/* price */}
        <div className="flex flex-row gap-3 py-3  text-[#71717A] font-inter text-xs font-normal leading-4">
          <p className="w-30">Price</p>
          <Input
            value={editableFood.price}
            onChange={(e) =>
              setEditableFood({ ...editableFood, price: e.target.value })
            }
            style={{ width: "288px" }}
            className="text-[#09090B]"
          />
        </div>

        {/* image */}
        <div className="flex flex-row gap-3 py-3  text-[#71717A] font-inter text-xs font-normal leading-4">
          <p className="w-30">Image</p>
          <ImageUploader
            value={editableFood.image}
            onChange={(url) => setEditableFood({ ...editableFood, image: url })}
          />
        </div>

        <div className="flex justify-between">
          <Button
            className="w-12 h-10 border-[#EF4444]"
            variant="outline"
            onClick={deleteFood}
          >
            <Trash className="text-[#EF4444]" />
          </Button>
          <Button
            variant="default"
            className="w-[126px] h-10 "
            onClick={updateFood}
          >
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default FoodInfoDialog;

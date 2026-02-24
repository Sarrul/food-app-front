"use client";

import Image from "next/image";
import Footer from "./_features/Footer";
import Header from "./_features/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useFoodCategory } from "./_provider/FoodCategoryProvider";

export default function Home() {
  const [openDialog, setOpenDialog] = useState(null);
  const [count, setCount] = useState(1);

  const { categories, foods, getCategory, getFood } = useFoodCategory();

  const handleClickMinus = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleClickPlus = () => setCount(count + 1);

  const handleAddToCart = (food) => {
    const cart = JSON.parse(localStorage.getItem("orders") || "[]");

    const existingItemIndex = cart.findIndex(
      (item) => item.foodId === food._id
    );

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += count;
    } else {
      cart.push({ foodId: food._id, quantity: count, name: food.foodName });
    }

    localStorage.setItem("orders", JSON.stringify(cart));

    window.dispatchEvent(new CustomEvent("cartUpdate"));

    toast.success(`${food.foodName} added to cart!`);
    setOpenDialog(null);
    setCount(1);
  };

  useEffect(() => {
    getCategory();
    getFood();
  }, []);

  return (
    <div className="bg-[#404040] gap-10 flex flex-col items-center">
      <div className="mb-22 w-full">
        <Header />
        <Image
          src="/BG.png"
          width={1440}
          height={570}
          alt="BG"
          className="mx-auto"
        />
      </div>
      <div className="gap-13 flex flex-col">
        {categories.map((item) => {
          return (
            <div
              key={item._id}
              className="flex flex-col gap-13 text-white px-22"
            >
              <p className="text-white font-inter text-[30px] font-semibold leading-9 tracking-[-0.75px]">
                {item.categoryName}
              </p>
              <div className="grid gap-9 grid-cols-3 max-w-[1264px] ">
                {foods
                  .filter((food) => food.category === item._id)
                  .map((food) => {
                    return (
                      <div
                        key={food._id}
                        className="flex p-4 flex-col items-start gap-5 self-stretch border border-[#E4E4E7] bg-white w-[397px] h-[342px] rounded-[20px]"
                      >
                        <div className="w-[365px] h-[210px] rounded-xl overflow-hidden bg-amber-100 relative">
                          <Image
                            src={food.image}
                            alt={food.foodName}
                            width={365}
                            height={210}
                            className="object-cover w-full h-full"
                          />
                          {/* Plus button to open dialog */}
                          <Button
                            variant="default"
                            className="bg-white rounded-full w-11 h-11 absolute bottom-5 right-5"
                          >
                            <Dialog
                              open={openDialog === food._id}
                              onOpenChange={(open) =>
                                setOpenDialog(open ? food._id : null)
                              }
                            >
                              <DialogTrigger>
                                <Plus
                                  className="text-[#EF4444]"
                                  strokeWidth={3}
                                />
                              </DialogTrigger>
                              <DialogContent className="flex w-[calc(100vw-2rem)] max-w-[826px] flex-col gap-4 p-4 sm:gap-6 sm:p-6 md:h-auto md:max-h-[90vh] md:flex-row overflow-y-auto">
                                <Image
                                  src={food.image}
                                  alt={food.foodName}
                                  width={377}
                                  height={364}
                                  className="h-52 w-full rounded-xl object-cover sm:h-64 md:h-[364px] md:w-[377px] shrink-0"
                                />
                                <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                                  <DialogHeader>
                                    <DialogTitle className="text-[#EF4444] font-inter text-[30px] font-semibold leading-[36px] tracking-[-0.75px]">
                                      {food.foodName}
                                    </DialogTitle>
                                    <DialogDescription className="text-[#09090B] font-inter text-[16px] font-normal leading-[24px] whitespace-normal break-words">
                                      {food.ingredients}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                      <div className="flex flex-col">
                                        <p className="text-[#71717A] font-inter text-[14px]">
                                          Total price
                                        </p>
                                        <p className="text-[#09090B] font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px]">
                                          {food.price * count}₮
                                        </p>
                                      </div>
                                      {/* Quantity selector */}
                                      <div className="flex flex-row gap-3 items-center">
                                        <Button
                                          variant="outline"
                                          className="rounded-full"
                                          onClick={handleClickMinus}
                                        >
                                          <Minus />
                                        </Button>
                                        <p className="font-inter text-[18px] font-semibold">
                                          {count}
                                        </p>
                                        <Button
                                          onClick={handleClickPlus}
                                          variant="outline"
                                          className="rounded-full"
                                        >
                                          <Plus />
                                        </Button>
                                      </div>
                                    </div>

                                    <Button
                                      onClick={() => handleAddToCart(food)}
                                      variant="default"
                                      className="w-full rounded-full bg-[#EF4444] hover:bg-[#DC2626] md:max-w-[377px]"
                                    >
                                      Add to cart
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </Button>
                        </div>
                        <div className="flex flex-col gap-2 justify-start items-start">
                          <div className="flex flex-row gap-2.5 w-[365px] justify-between">
                            <p className="text-[#EF4444] font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px] flex justify-start">
                              {food.foodName}
                            </p>
                            <p className="text-[#09090B] font-inter text-[18px] font-semibold leading-7">
                              {food.price}₮
                            </p>
                          </div>

                          <p className="text-[#09090B] font-inter text-[14px] font-normal leading-5 flex justify-start text-start">
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

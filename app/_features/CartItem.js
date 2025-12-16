"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";

export const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex flex-row gap-2.5 py-5">
      <Image
        src={item.image}
        alt={item.foodName}
        width={120}
        height={124}
        className="object-cover rounded-xl w-[120px] h-[124px]"
      />
      <div className="flex flex-col justify-between flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[#EF4444] font-inter text-[16px] font-bold leading-7">
              {item.foodName}
            </p>
            <p className="text-[#09090B] font-inter text-[12px] font-normal leading-4">
              {item.ingredients}
            </p>
          </div>
          <button
            onClick={() => onRemove(item._id)}
            className="text-[#71717A] hover:text-[#EF4444] transition-colors"
            aria-label="Remove item"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-row gap-3 items-center">
            <button
              className="rounded-full hover:bg-gray-200 p-1 transition-colors cursor-pointer"
              onClick={() => onQuantityChange(item._id, -1)}
              aria-label="Decrease quantity"
            >
              <Minus strokeWidth={1} size={16} />
            </button>
            <p className="font-inter text-[14px] font-semibold min-w-[20px] text-center">
              {item.quantity}
            </p>
            <button
              onClick={() => onQuantityChange(item._id, 1)}
              className="rounded-full hover:bg-gray-200 p-1 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus strokeWidth={1} size={16} />
            </button>
          </div>
          <p className="text-[#09090B] text-right font-inter text-[16px] font-bold leading-7">
            {(item.price * item.quantity).toLocaleString()}₮
          </p>
        </div>
      </div>
    </div>
  );
};

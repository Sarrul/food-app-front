"use client";

import { ShoppingCart } from "lucide-react";

export const OrderList = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingCart className="mx-auto text-[#71717A] mb-2" size={48} />
        <p className="text-[#71717A] font-inter text-[16px]">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <div key={order._id} className="border border-[#E4E4E7] rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-[#09090B]">
              Order #{order._id.slice(-6)}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                order.status === "delivered"
                  ? "bg-green-100 text-green-800"
                  : order.status === "cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.status}
            </span>
          </div>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-[#71717A]">
                  {item.foodId?.foodName || "Item"} x{item.quantity}
                </span>
                <span className="text-[#09090B] font-semibold">
                  {(item.price * item.quantity).toLocaleString()}₮
                </span>
              </div>
            ))}
          </div>
          <div className="border-t mt-2 pt-2 flex justify-between font-bold">
            <span className="text-[#71717A]">Total:</span>
            <span className="text-[#09090B]">
              {order.totalPrice.toLocaleString()}₮
            </span>
          </div>
          <div className="text-sm text-[#71717A] mt-2">
            {new Date(order.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

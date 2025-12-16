"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AdminOrderRow = ({
  order,
  index,
  isChecked,
  onCheck,
  onStatusChange,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "delivering":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border-b border-[#E4E4E7] last:border-0">
      {/* Main Row */}
      <div className="flex items-center gap-4 p-4 hover:bg-gray-50">
        {/* Checkbox */}
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => onCheck(order._id, checked)}
        />

        {/* Order Number */}
        <div className="w-16 text-[#09090B] font-inter text-[14px] font-medium">
          #{index + 1}
        </div>

        {/* User Email */}
        <div className="w-48 text-[#09090B] font-inter text-[14px] truncate">
          {order.userId?.email || "N/A"}
        </div>

        {/* Food Items Count with Expand */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 w-32 text-[#09090B] font-inter text-[14px] hover:text-[#EF4444]"
        >
          <span>{order.items.length} items</span>
          {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* Date */}
        <div className="w-40 text-[#71717A] font-inter text-[14px]">
          {new Date(order.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        {/* Total Price */}
        <div className="w-32 text-[#09090B] font-inter text-[14px] font-semibold">
          {order.totalPrice.toLocaleString()}₮
        </div>

        {/* Address */}
        <div className="flex-1 text-[#71717A] font-inter text-[14px] truncate">
          {order.deliveryAddress}
        </div>

        {/* Status Dropdown */}
        <Select
          value={order.status}
          onValueChange={(value) => onStatusChange(order._id, value)}
        >
          <SelectTrigger
            className={`w-40 ${getStatusColor(order.status)} border-none`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="delivering">Delivering</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="bg-gray-50 px-4 py-3 ml-20">
          <p className="text-[#71717A] font-inter text-[12px] font-semibold mb-2">
            Order Items:
          </p>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-[14px]"
              >
                <span className="text-[#09090B]">
                  {item.foodId?.foodName || "Unknown Item"}
                </span>
                <span className="text-[#71717A]">x{item.quantity}</span>
                <span className="text-[#09090B] font-semibold">
                  {(item.price * item.quantity).toLocaleString()}₮
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

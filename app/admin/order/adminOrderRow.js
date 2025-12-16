"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export const AdminOrderRow = ({
  order,
  index,
  isChecked,
  onCheck,
  onStatusChange,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate popup position when opening
  useEffect(() => {
    if (showDetails && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPopupPosition({
        top: rect.bottom + 8, // 8px below the button
        left: rect.left,
      });
    }
  }, [showDetails]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDetails &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        !event.target.closest(".order-details-popup")
      ) {
        setShowDetails(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDetails]);

  return (
    <>
      {/* Main Row */}
      <div className="flex items-center gap-4 p-4 hover:bg-gray-50 border-b border-[#E4E4E7] last:border-0">
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
          ref={buttonRef}
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 w-32 text-[#09090B] font-inter text-[14px] hover:text-[#EF4444] relative"
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
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overlay Popup */}
      {showDetails && (
        <div
          className="order-details-popup fixed bg-white w-[263px] border border-[#E4E4E7] rounded-lg shadow-lg p-3 z-50"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
          }}
        >
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {/* Food Image */}
                <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  {item.foodId?.image ? (
                    <Image
                      src={item.foodId.image}
                      alt={item.foodId?.foodName || "Food"}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No img
                    </div>
                  )}
                </div>

                {/* Food Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[#09090B] font-inter text-[14px] font-medium truncate">
                    {item.foodId?.foodName || "Unknown Item"}
                  </p>
                  <p className="text-[#71717A] font-inter text-[12px]">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

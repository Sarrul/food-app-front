"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../_provider/CartProvider";
import { CartItem } from "./CartItem";
import { OrderList } from "./OrderList";
import { LoginPromptDialog } from "./LoginPromptDialog";
import { OrderSuccessDialog } from "./OrderSuccessDialog";

const CartOrderSheet = () => {
  const {
    cartItems,
    orders,
    subtotal,
    total,
    SHIPPING_COST,
    handleQuantityChange,
    handleRemoveItem,
    placeOrder,
  } = useCart();

  const [activeTab, setActiveTab] = useState("cart");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("Token");

    if (!token) {
      setShowLoginPrompt(true);
      return;
    }

    if (!deliveryAddress.trim()) {
      return; // Let the provider handle the error
    }

    setLoading(true);
    try {
      await placeOrder({ address: deliveryAddress });
      setDeliveryAddress("");
      setShowOrderSuccess(true);
    } catch (error) {
      // Error already handled in provider
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger className="bg-white rounded-full w-9 h-9 flex justify-center items-center relative">
          <ShoppingCart className="text-black" strokeWidth="2" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </SheetTrigger>

        <SheetContent className="flex w-[535px] p-8 flex-col items-start gap-6 bg-[#404040] rounded-l-[20px] rounded-r-none shadow-[0_4px_6px_-4px_rgba(0,0,0,0.10),0_10px_15px_-3px_rgba(0,0,0,0.10)] overflow-y-auto">
          <SheetHeader>
            <div className="text-[#FAFAFA] flex flex-row gap-3">
              <ShoppingCart />
              <SheetTitle className="text-[20px] font-semibold leading-7 tracking-[-0.5px] text-[#FAFAFA] font-inter">
                Order detail
              </SheetTitle>
            </div>
          </SheetHeader>

          {/* Tab Buttons */}
          <div className="flex gap-2 w-full h-11 p-1 bg-white rounded-full">
            <Button
              className={`rounded-full flex-1 transition-colors ${
                activeTab === "cart"
                  ? "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("cart")}
            >
              Cart
            </Button>
            <Button
              className={`rounded-full flex-1 transition-colors ${
                activeTab === "order"
                  ? "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("order")}
            >
              Order
            </Button>
          </div>

          {/* Cart Tab */}
          {activeTab === "cart" ? (
            <div className="w-full flex flex-col gap-6">
              <div className="bg-white p-4 rounded-[20px] flex flex-col">
                <p className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px] mb-4">
                  My cart
                </p>

                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart
                      className="mx-auto text-[#71717A] mb-2"
                      size={48}
                    />
                    <p className="text-[#71717A] font-inter text-[16px]">
                      Your cart is empty.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="flex flex-col divide-y divide-dashed divide-[#09090B]/50">
                      {cartItems.map((item) => (
                        <CartItem
                          key={item._id}
                          item={item}
                          onQuantityChange={handleQuantityChange}
                          onRemove={handleRemoveItem}
                        />
                      ))}
                    </div>

                    {/* Delivery Address */}
                    <div className="mt-6 pt-6 border-t border-dashed border-[#09090B]/50">
                      <p className="text-[#71717A] font-inter text-[16px] font-semibold mb-4">
                        Delivery location
                      </p>
                      <textarea
                        placeholder="Please share your complete address"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="flex flex-col w-full items-start flex-1 self-stretch px-3 py-2 rounded-md border border-zinc-200 bg-white shadow-sm min-h-[80px]"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Payment Info */}
              {cartItems.length > 0 && (
                <div className="bg-white w-full p-4 rounded-[20px] flex flex-col gap-4">
                  <p className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
                    Payment Info
                  </p>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-[#71717A] font-inter text-[14px]">
                        Food price:
                      </span>
                      <span className="text-[#09090B] font-inter text-[14px] font-semibold">
                        {subtotal.toLocaleString()}₮
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#71717A] font-inter text-[14px]">
                        Shipping:
                      </span>
                      <span className="text-[#09090B] font-inter text-[14px] font-semibold">
                        {SHIPPING_COST.toLocaleString()}₮
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-[#09090B]/50 pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="text-[#71717A] font-inter text-[16px] font-semibold">
                        Total:
                      </span>
                      <span className="text-[#09090B] font-inter text-[20px] font-bold">
                        {total.toLocaleString()}₮
                      </span>
                    </div>
                    <Button
                      onClick={handlePlaceOrder}
                      className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-full h-12"
                      disabled={loading}
                    >
                      {loading ? "Placing Order..." : "Proceed to Checkout"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Order Tab
            <div className="bg-white w-full p-4 rounded-[20px] flex flex-col gap-4 max-h-[600px] overflow-y-auto">
              <p className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
                My Orders
              </p>
              <OrderList orders={orders} />
            </div>
          )}
        </SheetContent>
      </Sheet>

      <LoginPromptDialog
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
      />

      <OrderSuccessDialog
        open={showOrderSuccess}
        onOpenChange={setShowOrderSuccess}
        onViewOrders={() => {
          setShowOrderSuccess(false);
          setActiveTab("order");
        }}
      />
    </>
  );
};

export default CartOrderSheet;

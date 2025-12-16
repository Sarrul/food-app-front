"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useFoodCategory } from "./FoodCategoryProvider";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { foods } = useFoodCategory();
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const SHIPPING_COST = 5000; // 5000₮

  // Fetch cart items from localStorage
  const fetchCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("orders") || "[]");

    const fullCart = cart
      .map((item) => {
        const food = foods.find((f) => f._id === item.foodId);
        if (!food) return null;
        return {
          ...food,
          quantity: item.quantity,
        };
      })
      .filter(Boolean);

    setCartItems(fullCart);
  };

  // Fetch user's orders from backend
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("Token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) return;

      const response = await fetch(
        `http://localhost:5000/api/orders/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("Token");
        localStorage.removeItem("userId");

        window.dispatchEvent(new Event("auth-expired"));
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Add item to cart
  const addToCart = (foodId, quantity = 1) => {
    const cart = JSON.parse(localStorage.getItem("orders") || "[]");
    const existingItemIndex = cart.findIndex((item) => item.foodId === foodId);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ foodId, quantity });
    }

    localStorage.setItem("orders", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cartUpdate"));
  };

  // Update quantity
  const handleQuantityChange = (foodId, delta) => {
    const cart = JSON.parse(localStorage.getItem("orders") || "[]");

    const updatedCart = cart
      .map((item) =>
        item.foodId === foodId
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0);

    localStorage.setItem("orders", JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent("cartUpdate"));
  };

  // Remove item
  const handleRemoveItem = (foodId) => {
    const cart = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedCart = cart.filter((item) => item.foodId !== foodId);

    localStorage.setItem("orders", JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent("cartUpdate"));
  };

  // Clear cart
  const clearCart = () => {
    localStorage.setItem("orders", JSON.stringify([]));
    window.dispatchEvent(new CustomEvent("cartUpdate"));
  };

  // Place order
  const placeOrder = async (deliveryInfo) => {
    console.log("Button clicked!");
    try {
      const token = localStorage.getItem("Token");
      const userId = localStorage.getItem("userId");

      if (!token) {
        throw new Error("Please login to place an order");
      }

      if (!deliveryInfo.address) {
        throw new Error("Please provide delivery address");
      }

      const orderData = {
        userId: userId,
        items: cartItems.map((item) => ({
          foodId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: subtotal,
        deliveryAddress: deliveryInfo.address,
      };

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      const result = await response.json();
      console.log("Order created successfully:", result);

      // Clear cart after successful order
      clearCart();

      // Refresh orders
      await fetchOrders();

      toast.success("Order placed successfully! 🎉");
      return result;
    } catch (error) {
      console.error("Place order error:", error);
      toast.error(error.message || "Failed to place order");
      throw error;
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );
  const total = subtotal + SHIPPING_COST;

  // Initial fetch
  useEffect(() => {
    if (foods.length > 0) {
      fetchCartItems();
    }
  }, [foods]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartItems();
    };

    window.addEventListener("cartUpdate", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdate", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, [foods]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        subtotal,
        total,
        SHIPPING_COST,
        addToCart,
        handleQuantityChange,
        handleRemoveItem,
        clearCart,
        placeOrder,
        fetchOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

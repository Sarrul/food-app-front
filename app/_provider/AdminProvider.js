"use client";

import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch ALL orders (admin only)
  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("Token");

      const response = await fetch("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAllOrders(data);
      } else {
        throw new Error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching all orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Update single order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        // Update local state
        setAllOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated");
        return true;
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
      return false;
    }
  };

  // Bulk update order statuses
  const bulkUpdateOrderStatus = async (orderIds, newStatus) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("Token");

      const updatePromises = orderIds.map((orderId) =>
        fetch(`http://localhost:5000/api/orders/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        })
      );

      await Promise.all(updatePromises);

      // Update local state
      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          orderIds.includes(order._id) ? { ...order, status: newStatus } : order
        )
      );

      toast.success(`Updated ${orderIds.length} orders`);
      return true;
    } catch (error) {
      console.error("Error bulk updating:", error);
      toast.error("Failed to update orders");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete order
  const deleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setAllOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
        toast.success("Order deleted");
        return true;
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
      return false;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        allOrders,
        loading,
        fetchAllOrders,
        updateOrderStatus,
        bulkUpdateOrderStatus,
        deleteOrder,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};

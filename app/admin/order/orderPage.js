"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAdmin } from "../../_provider/AdminProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminOrderRow } from "./adminOrderRow";

const OrderPage = () => {
  const {
    allOrders,
    loading,
    fetchAllOrders,
    updateOrderStatus,
    bulkUpdateOrderStatus,
  } = useAdmin();
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("");

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Handle checkbox selection
  const handleCheck = (orderId, checked) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    }
  };

  // Handle bulk status change
  const handleBulkStatusChange = async () => {
    if (!bulkStatus) return;

    const success = await bulkUpdateOrderStatus(selectedOrders, bulkStatus);
    if (success) {
      setSelectedOrders([]);
      setShowBulkDialog(false);
      setBulkStatus("");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full flex justify-end">
        <Image src="/Avatar.png" width={36} height={36} alt="Avatar" />
      </div>

      {/* Orders Table */}
      <div className="flex flex-col items-start gap-0 w-full rounded-lg border border-[#E4E4E7] bg-white">
        {/* Header */}
        <div className="flex p-4 justify-between items-center border-b border-[#E4E4E7] w-full">
          <div className="flex flex-col items-start">
            <p className="text-[#09090B] text-[20px] font-bold leading-[28px] tracking-[-0.5px]">
              Orders
            </p>
            <p className="text-[#71717A] text-[12px] font-medium leading-[16px]">
              {allOrders.length} total orders
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full">
              <Calendar />
              13 June 2023 - 14 July 2023
            </Button>
            <Button
              onClick={() => setShowBulkDialog(true)}
              disabled={loading || selectedOrders.length === 0}
              className="rounded-full bg-[#EF4444] hover:bg-[#DC2626]"
            >
              Change delivery state ({selectedOrders.length})
            </Button>
          </div>
        </div>

        {/* Table Header */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 border-b border-[#E4E4E7] text-[#71717A] text-[12px] font-semibold">
          <div className="w-8"></div>
          <div className="w-16">No</div>
          <div className="w-48">User Email</div>
          <div className="w-32">Items</div>
          <div className="w-40">Date</div>
          <div className="w-32">Total</div>
          <div className="flex-1">Address</div>
          <div className="w-40">Status</div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="p-8 text-center text-[#71717A]">Loading...</div>
        ) : allOrders.length === 0 ? (
          <div className="p-8 text-center text-[#71717A]">No orders found</div>
        ) : (
          allOrders.map((order, index) => (
            <AdminOrderRow
              key={order._id}
              order={order}
              index={index}
              isChecked={selectedOrders.includes(order._id)}
              onCheck={handleCheck}
              onStatusChange={updateOrderStatus}
            />
          ))
        )}
      </div>

      {/* Bulk Status Change Dialog */}
      <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Delivery State</DialogTitle>
            <DialogDescription>
              Update status for {selectedOrders.length} selected orders
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Select value={bulkStatus} onValueChange={setBulkStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="delivering">Delivering</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowBulkDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBulkStatusChange}
                disabled={!bulkStatus || loading}
                className="flex-1 bg-[#EF4444] hover:bg-[#DC2626]"
              >
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderPage;

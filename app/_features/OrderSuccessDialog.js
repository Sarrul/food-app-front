"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

export const OrderSuccessDialog = ({ open, onOpenChange, onViewOrders }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="text-green-500" size={64} />
            <DialogTitle className="text-[#09090B] text-2xl text-center">
              Order Placed Successfully!
            </DialogTitle>
            <DialogDescription className="text-base text-center">
              Your order has been placed and is being processed
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={onViewOrders}
            className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-full h-12"
          >
            View My Orders
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full rounded-full h-12 border-[#E4E4E7]"
          >
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export const LoginPromptDialog = ({ open, onOpenChange }) => {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#EF4444] text-2xl">
            Login Required
          </DialogTitle>
          <DialogDescription className="text-base">
            You need to be logged in to place an order
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={() => router.push("authentication/login")}
            className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-full h-12"
          >
            Login
          </Button>
          <Button
            onClick={() => router.push("authentication/signup")}
            variant="outline"
            className="w-full rounded-full h-12 border-[#E4E4E7]"
          >
            Sign Up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

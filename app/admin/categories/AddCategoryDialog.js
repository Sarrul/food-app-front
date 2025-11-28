"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddCategoryDialog = ({ onAdd }) => {
  const [newCategory, setNewCategory] = useState("");
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    if (!newCategory) return;
    onAdd(newCategory);
    setNewCategory("");
    setOpen(false);
  };

  const handleClose = (state) => {
    setOpen(state);
    if (!state) setNewCategory("");
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger className="bg-[#EF4444] w-9 h-9 rounded-full flex justify-center items-center">
        <Plus strokeWidth={1} className="text-white" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="text-(--text-text-foreground) text-[18px] font-inter font-semibold leading-7">
              Add new category
            </p>
          </DialogTitle>
          <DialogDescription>Category name</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Type category name..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <div className="w-full flex justify-end">
          <Button
            variant="default"
            className="w-[123px] h-10"
            onClick={handleAdd}
            // disabled={loading}
          >
            Add category
            {/* {loading ? "Adding..." : "Add category"}{" "} */}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;

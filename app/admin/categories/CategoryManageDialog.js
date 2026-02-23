"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CategoryManageDialog = ({
  category,
  foodCount,
  onUpdate,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category.categoryName);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setName(category.categoryName);
    }
  }, [open, category.categoryName]);

  const handleUpdate = async () => {
    const trimmed = name.trim();
    if (!trimmed || trimmed === category.categoryName || loading) return;

    setLoading(true);
    const success = await onUpdate(category._id, trimmed);
    setLoading(false);
    if (success) setOpen(false);
  };

  const handleDelete = async () => {
    if (loading) return;

    setLoading(true);
    const success = await onDelete(category._id);
    setLoading(false);
    if (success) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex"
          aria-label={`Manage ${category.categoryName} category`}
        >
          <Badge variant="default" className="px-2.5 py-0.5 cursor-pointer">
            {foodCount}
          </Badge>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Manage category</DialogTitle>
          <DialogDescription>
            Update the category name or delete this category.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#09090B]">
            Category name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type category name..."
          />
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-full"
          >
            {loading ? "Processing..." : "Delete"}
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={loading || !name.trim() || name.trim() === category.categoryName}
            className="rounded-full bg-[#EF4444] hover:bg-[#DC2626]"
          >
            {loading ? "Processing..." : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryManageDialog;

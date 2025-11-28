import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
const FoodInfoDialog = ({ trigger, food }) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-5">
          <DialogTitle>Dishes info</DialogTitle>
          <DialogDescription className="flex flex-row gap-4 py-3">
            <p className="w-30 text-[#71717A] font-inter text-xs font-normal leading-4">
              Dish name
            </p>
            <Input value={food.foodName} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default FoodInfoDialog;

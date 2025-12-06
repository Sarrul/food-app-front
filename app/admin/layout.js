import { FoodCategoryProvider } from "../_provider/FoodCategoryProvider";

export default function AdminPageLayout({ children }) {
  return (
    <div>
      <FoodCategoryProvider>{children}</FoodCategoryProvider>
    </div>
  );
}

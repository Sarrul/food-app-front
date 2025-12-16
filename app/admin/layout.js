import { AdminProvider } from "../_provider/AdminProvider";
import { CartProvider } from "../_provider/CartProvider";
import { FoodCategoryProvider } from "../_provider/FoodCategoryProvider";

export default function AdminPageLayout({ children }) {
  return (
    <div>
      <FoodCategoryProvider>
        <CartProvider>
          <AdminProvider>{children}</AdminProvider>
        </CartProvider>
      </FoodCategoryProvider>
    </div>
  );
}

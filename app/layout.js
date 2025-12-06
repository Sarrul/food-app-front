import { FoodCategoryProvider } from "./_provider/FoodCategoryProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <div>
      <FoodCategoryProvider>{children}</FoodCategoryProvider>
    </div>
  );
}

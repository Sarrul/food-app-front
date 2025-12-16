import { CartProvider } from "./_provider/CartProvider";
import { FoodCategoryProvider } from "./_provider/FoodCategoryProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FoodCategoryProvider>
          <CartProvider>{children}</CartProvider>
        </FoodCategoryProvider>
      </body>
    </html>
  );
}

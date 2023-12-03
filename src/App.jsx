import "antd/dist/reset.css";
import Home from "./components/Home";
import { products } from "./constants";
import Products from "./components/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import { useEffect } from "react";
import { getCartItems } from "./services/add_to_cart";
import state from "./store";
import { fetchData } from "./services/search_products";
import { useSnapshot } from "valtio";
import { message } from "antd";

function App() {
  const snapshot = useSnapshot(state);

  useEffect(() => {
    updateCartWithLatestPrices();
  }, []);
  const updateCartWithLatestPrices = async () => {
    try {
      const cartItems = await getCartItems();
      console.log(`cart items ${cartItems}`);
      const updatedCart = [];

      for (const cartItem of cartItems) {
        const items = await fetchData(cartItem.searchTag);

        const matchingItem = items.find(
          (item) => item.ASIN === cartItem.product.ASIN
        );

        if (matchingItem) {
          updatedCart.push({
            ...cartItem,
            latestPrice: parseFloat(matchingItem.price.replace("$", "")),
          });
        }
      }

      state.cart = updatedCart;
      updatedCart.map((item) => {
        if (Number(item.latestPrice) <= Number(item.lowest_price)) {
          message.success(`${item.product.title} had hit the lowest price`);
        }
      });
      console.log(`cart setted succesffuly`);
    } catch (error) {
      console.log(error);
      message.error("Error updating cart:", error);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Home />

              {products.length > 0 && <Products />}
            </div>
          }
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

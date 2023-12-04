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
        console.log(
          `there are ${items.length} under this search tag ${cartItem.product.ASIN}`
        );
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

      state.cart = cartItems;
      console.log(`updated cart have ${updatedCart.length} items`);
      updatedCart.map((item) => {
        if (Number(item.latestPrice) >= Number(item.lowest_price)) {
          console.log(`price hitted the lowest price`);
          message.success(`${item.product.title} had hit the lowest price`);
        } else {
          console.log(
            `else called ${Number(item.latestPrice)} <= ${Number(
              item.lowest_price
            )}`
          );
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

import "antd/dist/reset.css";
import Home from "./components/Home";
import { products } from "./constants";
import Products from "./components/Products";
function App() {
  return (
    <>
      <Home />
      {products.length > 0 && <Products />}
    </>
  );
}

export default App;

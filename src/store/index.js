import { proxy } from "valtio";

const state = proxy({
  products: [],
  cart: [],
});
export default state;

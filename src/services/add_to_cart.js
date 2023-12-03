import {
  addDoc,
  getDocs,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  where,
  query,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export const getCartItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "cart"));
    let cartItems = [];
    querySnapshot.forEach((doc) => {
      cartItems.push({ id: doc.id, ...doc.data() });
    });
    return cartItems;
  } catch (error) {
    throw Error(`${error}`);
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const cartRef = collection(db, "cart");
    const q = query(
      cartRef,
      where("productId", "==", productId + " " + auth.currentUser.uid)
    );
    const existingCartItem = await getDocs(q);

    if (!existingCartItem.empty) {
      const existingDoc = existingCartItem.docs[0];
      const updatedQuantity = existingDoc.data().quantity + quantity;
      await updateDoc(doc(db, "cart", existingDoc.id), {
        quantity: updatedQuantity,
      });
    } else {
      // Product not in the cart, add a new item
      await setDoc(doc(cartRef, `${productId.ASIN}T${auth.currentUser.uid}`), {
        product: productId,
        quantity,
        searchTag: localStorage.getItem("search_tag"),
        lowest_price: (Number(productId.price.replace("$", "")) / 100) * 90,
      });
    }
  } catch (error) {
    throw Error(`${error}`);
  }
};

export const updateCartItem = async (cartItemId, dataToUpdate) => {
  try {
    const cartItemRef = doc(db, "cart", cartItemId);
    await updateDoc(cartItemRef, dataToUpdate);
  } catch (error) {
    throw Error(`${error}`);
  }
};

export const deleteCartItem = async (cartItemId) => {
  try {
    const cartItemRef = doc(db, "cart", cartItemId);
    await deleteDoc(cartItemRef);
  } catch (error) {
    throw Error(`${error}`);
  }
};

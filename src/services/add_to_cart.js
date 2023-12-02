import {
  addDoc,
  getDocs,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

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
    const existingCartItem = await getDocs(
      cartRef.where("productId", "==", productId)
    );

    if (!existingCartItem.empty) {
      // Product already in the cart, update the quantity
      const existingDoc = existingCartItem.docs[0];
      const updatedQuantity = existingDoc.data().quantity + quantity;
      await updateDoc(doc(db, "cart", existingDoc.id), {
        quantity: updatedQuantity,
      });
    } else {
      // Product not in the cart, add a new item
      await addDoc(cartRef, { productId, quantity });
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

import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const authentication = async (email, password) => {
  console.log("signin called");
  return await signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      localStorage.setItem("email", email);
      return true;
    })
    .catch(async (err) => {
      throw Error("Error on authentication " + err.message);
    });
};

export const signup = async (email, password) => {
  console.log("reg called");
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      localStorage.setItem("email", email);
      return true;
    })
    .catch((err) => {
      throw Error("Error on authentication " + err.message);
    });
};

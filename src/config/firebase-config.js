import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // main firebase
  // -----------------------

  apiKey: "AIzaSyCsZ7oW9cpIJJcO_ww-aFG8ZlyvVeQ9zMU",
  authDomain: "article-fcde4.firebaseapp.com",
  projectId: "article-fcde4",
  storageBucket: "article-fcde4.appspot.com",
  messagingSenderId: "254443073699",
  appId: "1:254443073699:web:ea07bed61b91109d25cf16",

  // sub firebase
  // -----------------------

  // apiKey: "AIzaSyCdf-8SWfe7QaaAXFtdCGrxbHBKdtNVk5g",
  // authDomain: "auth-development-d7656.firebaseapp.com",
  // projectId: "auth-development-d7656",
  // storageBucket: "auth-development-d7656.appspot.com",
  // messagingSenderId: "997750014376",
  // appId: "1:997750014376:web:08511dc8c517f4150b1d9d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

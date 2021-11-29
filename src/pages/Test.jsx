import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  // doc,
  // setDoc,
  where,
  query,
} from "@firebase/firestore";

import { db } from "../config/firebase-config";

import "./Test.css";

const Test = () => {
  const [articles, setArticles] = useState([
    { name: "Loading...", id: "initial" },
  ]);
  // const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  // const [image, setImage] = useState("");

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "Article"), where("category", "==", "Apple")),
        (snapshot) =>
          setArticles(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
      ),
    []
  );

  if (articles.length > 1) {
    console.log(articles);
  }

  // // Chỉnh update dữ liệu

  // const handleUpdate = async (id) => {
  //   const docRef = doc(db, "Test", id);
  //   const payload = { name: name, age: age };

  //   setDoc(docRef, payload);
  // };

  return (
    <div>
      {articles.map((item) => (
        <div>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Test;

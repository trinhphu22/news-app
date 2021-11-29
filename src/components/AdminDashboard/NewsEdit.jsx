import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  setDoc,
} from "@firebase/firestore";

import { db } from "../../config/firebase-config";

const NewsEdit = (props) => {
  const { setActive, item, postStatus } = props;
  const [account, setAccount] = useState([]);

  //Lọc dữ liệu trong bảng Account và show lên

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "Account"), where("user", "==", item.author)),
        (snapshot) =>
          setAccount(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
      ),
    [item]
  );

  const handleUpdate = async (id) => {
    const docRef = doc(db, "Article", id);
    const payload = {
      author: item.author,
      category: item.category,
      content: item.content,
      date: item.date,
      description: item.description,
      image: item.image,
      status: true,
      title: item.title,
    };

    setDoc(docRef, payload);
  };

  const handleWithdraw = async (id) => {
    const docRef = doc(db, "Article", id);
    const payload = {
      author: item.author,
      category: item.category,
      content: item.content,
      date: item.date,
      description: item.description,
      image: item.image,
      status: false,
      title: item.title,
    };

    setDoc(docRef, payload);
  };

  return (
    <div className="edit-news">
      {/* -------------------- Trạng thái đã đăng --------------------- */}
      {postStatus && (
        <>
          <div className="edit-news__title">{item.title}</div>
          <div className="edit-news__discription">{item.description}</div>
          {account.length > 0 && (
            <div className="edit-news__author">
              <Link
                to={`/profile/?id=${account[0].id}`}
                className="edit-news__author__image"
              >
                <img src={account[0].avatar} alt="" />
              </Link>
              <p>By</p>
              <Link
                to={`/profile/?id=${account[0].id}`}
                className="edit-news__author__user"
              >
                <span>{account[0].user}</span>
              </Link>
            </div>
          )}
          <div className="edit-news__image">
            <img src={item.image} alt="" />
          </div>
          <div
            className="edit-news__content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></div>
          <div className="edit-news__button">
            <button
              onClick={() => {
                handleWithdraw(item.id);
                setActive("news");
              }}
            >
              Withdraw
            </button>
            <button
              onClick={() => {
                setActive("news");
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
      {/* -------------------- Trạng thái chưa đăng --------------------- */}
      {!postStatus && (
        <>
          <div className="edit-news__title">{item.title}</div>
          <div className="edit-news__discription">{item.description}</div>
          {account.length > 0 && (
            <div className="edit-news__author">
              <Link
                to={`/profile/?id=${account[0].id}`}
                className="edit-news__author__image"
              >
                <img src={account[0].avatar} alt="" />
              </Link>
              <p>By</p>
              <Link
                to={`/profile/?id=${account[0].id}`}
                className="edit-news__author__user"
              >
                <span>{account[0].user}</span>
              </Link>
            </div>
          )}
          <div className="edit-news__image">
            <img src={item.image} alt="" />
          </div>
          <div
            className="edit-news__content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></div>
          <div className="edit-news__button">
            <button
              onClick={() => {
                handleUpdate(item.id);
                setActive("not-posted-yet");
              }}
            >
              Post
            </button>
            <button
              onClick={() => {
                setActive("not-posted-yet");
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsEdit;

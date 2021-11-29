import React, { useState, useEffect } from "react";
import { onSnapshot, collection, query, where } from "@firebase/firestore";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { db } from "../config/firebase-config";

import Helmet from "./Helmet";

const FullNew = (props) => {
  const New = props.New;
  const [article, setArticle] = useState([]);
  const [user, setUser] = useState([]);

  // Tìm dữ liệu bài báo có id = id

  useEffect(() => {
    window.scroll(0, 0);
    onSnapshot(collection(db, "Article"), (snapshot) => {
      setArticle(
        snapshot.docs.filter((doc) => {
          if (doc.id === New) {
            const temp = doc.data();
            return {
              ...temp,
              id: doc.id,
            };
          }
          return false;
        })
      );
    });
  }, [New]);

  // Tìm user = author

  useEffect(() => {
    if (article.length > 0) {
      onSnapshot(
        query(
          collection(db, "Account"),
          where("user", "==", article[0].data().author)
        ),
        (snapshot) =>
          setUser(
            snapshot.docs.filter((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
      );
    }
  }, [article]);

  return (
    <div className="fullnew">
      {article.length > 0 && (
        <Helmet title={article[0].data().title}>
          <div>
            <div className="fullnew__title">{article[0].data().title}</div>
            <div className="fullnew__discription">
              {article[0].data().description}
            </div>
            {user.length > 0 && (
              <div className="fullnew__author">
                <Link
                  to={`/profile/?id=${user[0].id}`}
                  className="fullnew__author__image"
                >
                  <img src={user[0].data().avatar} alt="" />
                </Link>
                <p>By</p>
                <Link
                  to={`/profile/?id=${user[0].id}`}
                  className="fullnew__author__user"
                >
                  <span>{user[0].data().user}</span>
                </Link>
              </div>
            )}
            <div className="fullnew__image">
              <img src={article[0].data().image} alt="" />
            </div>
            <div
              className="fullnew__content"
              dangerouslySetInnerHTML={{ __html: article[0].data().content }}
            ></div>
          </div>
        </Helmet>
      )}
    </div>
  );
};

FullNew.propTypes = {
  New: PropTypes.object.isRequired,
};

export default FullNew;

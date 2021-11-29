import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, where } from "@firebase/firestore";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { db } from "../config/firebase-config";

const NewCard = (props) => {
  const [user, setUser] = useState([]);

  // Tìm user giống author

  useEffect(() => {
    if (props.author) {
      onSnapshot(
        query(collection(db, "Account"), where("user", "==", props.author)),
        (snapshot) =>
          setUser(
            snapshot.docs.filter((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
      );
    }
  }, [props.author]);

  return (
    <div>
      {props.status ? (
        <div className="new-card">
          <div className="new-card__image">
            <Link to={`/article/?id=${props.id}`}>
              <img src={props.image} alt="" />
            </Link>
          </div>
          <div className="new-card__info">
            <Link
              to={`/article/?id=${props.id}`}
              className="new-card__info__title"
            >
              {props.title}
            </Link>
            <div className="new-card__info__discription">
              {props.description}
            </div>
            <div className="space"></div>
            {user.length > 0 && (
              <Link
                to={`/profile/?id=${user[0].id}`}
                className="new-card__info__box"
              >
                <div className="new-card__info__box__image">
                  <img src={user[0].data().avatar} alt="" />
                </div>
                <div className="new-card__info__box__author">
                  {user[0].data().user}
                </div>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="new-card-in-depth">
          <div className="new-card-in-depth__image">
            <Link to={`/article/?id=${props.id}`}>
              <img src={props.image} alt="" />
            </Link>
            <Link
              to={`/article/?id=${props.id}`}
              className="new-card-in-depth__title"
            >
              {props.title}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

NewCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.bool,
};

export default NewCard;

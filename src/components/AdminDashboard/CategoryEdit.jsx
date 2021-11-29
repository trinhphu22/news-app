import React, { useState } from "react";

import { doc, setDoc } from "@firebase/firestore";

import { db } from "../../config/firebase-config";

const CategoryEdit = (props) => {
  const { item, setActive } = props;

  const [categoryEdit, setCategoryEdit] = useState(item.category);

  // Chỉnh sửa dữ liệu

  const handleUpdate = async (id) => {
    const docRef = doc(db, "Catolog", id);
    const payload = {
      category: categoryEdit,
      path: item.path,
    };
    setDoc(docRef, payload);
  };

  return (
    <div className="edit-category">
      <div className="edit-category__card">
        <div className="edit-category__card__title">Category Update</div>
        <div className="edit-category__card__text">
          <label>Category:</label>
          <input
            type="text"
            value={categoryEdit}
            onChange={(event) => {
              setCategoryEdit(event.target.value);
            }}
          />
        </div>
        <div className="edit-category__card__button">
          <button
            onClick={() => {
              handleUpdate(item.id);
              setActive("category");
            }}
          >
            Update
          </button>
          <button
            onClick={() => {
              setActive("category");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryEdit;

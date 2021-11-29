import React, { useEffect, useState } from "react";
import { onSnapshot, collection, doc, deleteDoc } from "@firebase/firestore";

import CategoryEdit from "./CategoryEdit";

import { db } from "../../config/firebase-config";

const Category = () => {
  const [catalog, setCatalog] = useState([
    { name: "Loading...", id: "initial" },
  ]);

  const [active, setActive] = useState("category");
  const [item, setItem] = useState("");

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  //Lọc dữ liệu trong bảng Account và show lên

  useEffect(
    () =>
      onSnapshot(collection(db, "Catolog"), (snapshot) => {
        setCatalog(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      }),
    []
  );

  // Xoá dữ liệu trong db

  const handleDelete = async (id) => {
    const docRef = doc(db, "Catolog", id);

    deleteDoc(docRef);
  };

  return (
    <>
      {active === "edit" && <CategoryEdit item={item} setActive={setActive} />}
      <div className="admin-dashboard__right__user">
        <table className="category">
          <thead>
            <tr>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {catalog.map((item) => (
              <tr>
                <td>{item.category}</td>
                <td className="action">
                  <i
                    class="bx bx-edit action__edit"
                    onClick={() => {
                      setActive("edit");
                      setItem(item);
                    }}
                  ></i>
                  &emsp;
                  <i
                    class="bx bx-trash action__delete"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Category;

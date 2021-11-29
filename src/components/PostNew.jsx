import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc, onSnapshot } from "@firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { db } from "../config/firebase-config";
import { storage } from "../config/firebase-config";

const PostNew = (props) => {
  const id = props.id;

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [catg, setCatg] = useState("");
  const [date, setDate] = useState(new Date());

  const [catalog, setCatalog] = useState([]);
  const [user, setUser] = useState([]);

  const fileInputRef = useRef();

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setImage("");
    setImagePreview("");
    setDate(new Date());
  };

  //Hiển thị image

  useEffect(() => {
    if (!image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

  //Đọc file image

  const handleImage = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  // Upload Image vào storage

  const handleUpload = () => {
    console.log("upload");
    if (image) {
      const metadata = {
        content: image.type,
      };
      const storageRef = ref(storage, `images/${image.name}`);
      const UploadTask = uploadBytesResumable(storageRef, image, metadata);

      UploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          alert("error: imaged not uploaded!");
        },
        () => {
          getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
            setImageUpload(ref(downloadURL)); // Lưu url từ storage vào imageUpload
          });
        }
      );
    }
  };

  // Thêm dữ liệu vào db

  const handleNews = async () => {
    console.log("Post");
    console.log(imageUpload);

    const newDate = new Date(date);
    const collectionRef = collection(db, "Article"); //Ghi hoặc đọc db trong collection và tạo id tự động
    const payload = {
      author: author,
      title: title,
      description: description,
      content: content,
      image: imageUpload,
      category: catg,
      date: newDate,
      status: false,
    }; //Gán giá trị mới vào db
    await addDoc(collectionRef, payload);
    clearInputs();
  };

  // Lấy dữ liệu từ db "Catolog"

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

  // tìm dữ liệu user bằng id

  useEffect(() => {
    window.scroll(0, 0);
    onSnapshot(collection(db, "Account"), (snapshot) => {
      setUser(
        snapshot.docs.filter((doc) => {
          if (doc.id === id) {
            setAuthor(doc.data().user);
            return {
              ...doc.data(),
              id: doc.id,
            };
          }
          return false;
        })
      );
    });
  }, [id]);

  return (
    <div className="postnew">
      <div className="postnew__text">
        <h1>Post up</h1>
        {user.length > 0 && (
          <div className="postnew__text__author">{author}</div>
        )}
        <div className="postnew__text__title">
          <input
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            placeholder="...Title"
          />
        </div>
        <div className="postnew__text__description">
          <textarea
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            placeholder="...Description"
          />
        </div>
        <div className="postnew__text__content">
          <textarea
            onChange={(event) => setContent(event.target.value)}
            value={content}
            placeholder="...Content"
          />
        </div>
      </div>
      <div className="postnew__box">
        <div className="postnew__box__image">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImage}
            ref={fileInputRef}
          />
          <img src={image} alt="" />
        </div>
        <div className="postnew__box__image-preview">
          {imagePreview ? (
            <img src={imagePreview} alt="" />
          ) : (
            <button
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            >
              <i class="bx bx-plus"></i>
            </button>
          )}
        </div>
      </div>
      <div className="postnew__button">
        <button onClick={handleUpload}>Upload image</button>
        <button
          onClick={() => {
            setImagePreview("");
          }}
        >
          Remove image
        </button>
      </div>
      <select
        className="postnew__select"
        onChange={(event) => {
          setCatg(event.target.value);
        }}
      >
        {catalog.slice(1, catalog.length).map((item) => (
          <option value={item.category}>{item.category}</option>
        ))}
      </select>
      <div className="postnew__date">
        <input
          type="date"
          onChange={(event) => setDate(event.target.value)}
          value={date}
        />
      </div>
      <button onClick={handleNews}>Post up</button>
    </div>
  );
};

export default PostNew;

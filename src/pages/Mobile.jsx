import React, { useState, useEffect } from "react";
import { onSnapshot, collection, where, query } from "@firebase/firestore";

import { db } from "../config/firebase-config";

import Helmet from "../components/Helmet";
import Section, {
  SectionBody,
  SectionPageTitle,
  SectionSecondTitle,
} from "../components/Section";
import NewCard from "../components/NewCard";
import Grid from "../components/Grid";

const Mobile = () => {
  const [articles, setArticles] = useState([
    { name: "Loading...", id: "initial" },
  ]);

  // Đọc dữ liệu từ Articles trên firebase v9
  useEffect(() => {
    window.scroll(0, 0);
    onSnapshot(
      query(
        collection(db, "Article"),
        where("category", "==", "Mobile"),
        where("status", "==", true)
      ), // Lọc dữ liệu có "category" là "Mobile"
      (snapshot) =>
        setArticles(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
    );
  }, []);

  return (
    <Helmet title="Mobile">
      {/* Mobile */}
      <Section>
        <SectionPageTitle>Mobile</SectionPageTitle>
        <SectionSecondTitle>
          Mobile | News, how-tos, features, reviews, and videos
        </SectionSecondTitle>
        <SectionBody>
          {/* fake */}
          <Grid col={4} mdCol={2} smCol={2} gap={20}>
            {articles.slice(0, 4).map((item, index) => (
              <NewCard
                key={index}
                image={item.image}
                author={item.author}
                title={item.title}
                id={item.id}
              />
            ))}
          </Grid>
          <Grid col={1} mdCol={1} smCol={1} gap={20}>
            {articles.slice(4, articles.length).map((item, index) => (
              <NewCard
                key={index}
                image={item.image}
                author={item.author}
                description={item.description}
                title={item.title}
                id={item.id}
                status={true}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end Mobile */}
    </Helmet>
  );
};

export default Mobile;

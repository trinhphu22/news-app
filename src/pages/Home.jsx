import React, { useState, useEffect } from "react";
import { onSnapshot, collection, query, where } from "@firebase/firestore";

import { db } from "../config/firebase-config";

import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import Section, { SectionHomeTitle, SectionBody } from "../components/Section";
import NewCard from "../components/NewCard";
import Grid from "../components/Grid";

const Home = () => {
  const [articles, setArticles] = useState([
    { name: "Loading...", id: "initial" },
  ]);

  const [plus, setPlus] = useState(10);

  // Đọc dữ liệu từ Articles trên firebase v9
  useEffect(() => {
    window.scroll(0, 0);
    onSnapshot(
      // Lọc dữ liệu có trạng thái cho phép đăng ("status" == true)
      query(collection(db, "Article"), where("status", "==", true)),
      (snapshot) =>
        setArticles(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
    );
  }, []);

  const loadMoreClick = () => {
    setPlus(plus + 10);
  };

  return (
    <Helmet title="IT News">
      {/* hero slider   */}
      <Section>
        <SectionBody>
          <Grid col={1} mdCol={1} smCol={1} gap={20}>
            <HeroSlider
              data={articles.slice(articles.length - 3, articles.length)} //lấy dữ liệu từ aritcles từ end-3 đến end
              control={true}
              auto={true}
              timeOut={5000}
            />
          </Grid>
        </SectionBody>
      </Section>

      {/* end hero slider   */}

      {/* it-in depth */}
      <Section>
        <SectionHomeTitle>it in-depth</SectionHomeTitle>
        <SectionBody>
          {/* fake */}
          <Grid col={4} mdCol={2} smCol={2} gap={20}>
            {articles.slice(0, 4).map(
              (
                item,
                index //lấy dữ liệu từ article từ start đến 4
              ) => (
                <NewCard
                  key={index}
                  image={item.image}
                  author={item.author}
                  title={item.title}
                  id={item.id}
                />
              )
            )}
          </Grid>
        </SectionBody>
      </Section>
      {/* end it-in depth */}

      {/* top story */}
      <Section>
        {/* <SectionHomeTitle>Top Stories</SectionHomeTitle> */}
        <SectionBody>
          <Grid col={1} mdCol={1} smCol={1} gap={20}>
            {articles.slice(4, 4 + plus).map(
              (
                item,
                index // lấy dữ liệu từ articles từ 4 đến end
              ) => (
                <NewCard
                  key={index}
                  image={item.image}
                  author={item.author}
                  title={item.title}
                  description={item.description}
                  id={item.id}
                  status={true}
                />
              )
            )}
          </Grid>
          {plus < articles.length && (
            <div className="button-box">
              <div
                onClick={loadMoreClick}
                class="btn btn--border btn--primary btn--animated"
              >
                Load more
              </div>
            </div>
          )}
        </SectionBody>
      </Section>
      {/* end top story */}

      {/* from our advertisers */}
      {/* hide */}
      {/* end from our advertisers */}
    </Helmet>
  );
};

export default Home;

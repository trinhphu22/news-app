import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const HeroSlider = (props) => {
  const data = props.data;

  const timeOut = props.timeOut ? props.timeOut : 3000;

  const [activeSlide, setActiveSlide] = useState(0);

  //chuyển slide

  const nextSlide = useCallback(() => {
    const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1;
    setActiveSlide(index);
  }, [activeSlide, data]);

  const prevSlide = () => {
    const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1;
    setActiveSlide(index);
  };

  //tự động chuyển slide

  useEffect(() => {
    if (props.auto) {
      const sliderAuto = setInterval(() => {
        nextSlide();
      }, timeOut);
      return () => {
        clearInterval(sliderAuto);
      };
    }
  }, [nextSlide, timeOut, props]);

  return (
    <div className="hero-slider">
      {data.map((item, index) => (
        <HeroSliderItem
          key={index}
          item={item}
          active={index === activeSlide}
        />
      ))}
      {props.control ? (
        <div className="hero-slider__control">
          <div className="hero-slider__control__item" onClick={prevSlide}>
            <i class="bx bx-chevron-left"></i>
          </div>
          <div className="hero-slider__control__item">
            <div className="index">
              {activeSlide + 1}/{data.length}
            </div>
          </div>
          <div className="hero-slider__control__item" onClick={nextSlide}>
            <i class="bx bx-chevron-right"></i>
          </div>
        </div>
      ) : null}
    </div>
  );
};

HeroSlider.propTypes = {
  data: PropTypes.array.isRequired,
  control: PropTypes.bool,
  auto: PropTypes.bool,
  time: PropTypes.number,
};

const HeroSliderItem = (props) => (
  <Link to={`/article/?id=${props.item.id}`}>
    <div className={`hero-slider__item ${props.active ? "active" : ""}`}>
      <div className="hero-slider__item__info">
        <div className="hero-slider__item__info__image">
          <img src={props.item.image} alt="" />
        </div>
        <div className="hero-slider__item__info__title">
          <span>{props.item.title}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default HeroSlider;

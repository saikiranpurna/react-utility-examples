import React, { useState } from "react";
import "../../styles/slider.css";
import img1 from "../../assets/images/1.png";
import img2 from "../../assets/images/2.webp";
import img3 from "../../assets/images/3.webp";
import img4 from "../../assets/images/4.webp";
import img5 from "../../assets/images/5.webp";
import img6 from "../../assets/images/6.webp";
import img7 from "../../assets/images/7.webp";
import img8 from "../../assets/images/8.webp";
import img9 from "../../assets/images/9.webp";
import img10 from "../../assets/images/10.webp";
import img11 from "../../assets/images/11.png";
import img12 from "../../assets/images/12.png";
import img13 from "../../assets/images/13.png";
import img14 from "../../assets/images/14.png";
import img15 from "../../assets/images/15.webp";
import slide1 from "../../assets/images/slide1.png";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";
import slide4 from "../../assets/images/slide4.jpg";

import Carousel from "../../components/Carousel";
import Slider3D from "../../components/3DSlider";
import OnScrollSlider from "../../components/OnScrollSlider";

const Sliders = () => {
  const imgArr = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
  ];
  const slideArr = [
    {
      title: "Naruto",
      name: "Itachi",
      des: "Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village's leader and strongest ninja.",
      img: slide1,
    },
    {
      title: "OnePiece",
      name: "Zoro",
      des: "Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as the 'One Piece'.",
      img: slide2,
    },
    {
      title: "Bleach",
      name: "Ichigo",
      des: "High school student Ichigo Kurosaki, who has the ability to see ghosts, gains soul reaper powers from Rukia Kuchiki and sets out to save the world from 'Hollows'.",
      img: slide3,
    },
    {
      title: "Demon Slayer",
      name: "Zenitsu",
      des: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
      img: slide4,
    },
  ];
  const sliderTypes = [
    "Carousel with Slide effect",
    "3D Slide Show",
    "Vertical Mouse Scroll Slider",
  ];
  const sliderArr2 = [...slideArr]
  const [type, setType] = useState("Carousel with Slide effect");
  const currentComponent = () => {
    switch (type) {
      case "Carousel with Slide effect":
        return <Carousel data={slideArr} auto={true} />;
      case "3D Slide Show":
        return <Slider3D data={imgArr} />;
      case "Vertical Mouse Scroll Slider":
        return (
          <OnScrollSlider auto={false}>
            {sliderArr2.map((item) => {
              return <img height={"200px"} src={item.img} />;
            })}
          </OnScrollSlider>
        );
      default:
        break;
    }
  };

  return (
    <div className="pb-12 px-12">
      <select
        name="slide"
        value={type}
        onChange={(e) => setType(e.currentTarget.value)}
        className="bg-white border-white border-b-black"
      >
        {sliderTypes.map((type) => (
          <option value={type}>{type}</option>
        ))}
      </select>
      {currentComponent()}
    </div>
  );
};

export default Sliders;

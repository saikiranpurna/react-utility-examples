import React from "react";
import "../../styles/3Dslider.css"
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

const Slider3D = () => {
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
  return (
    <div className="banner">
      <div className="slider" style={{ "--quantity": imgArr.length }}>
        {imgArr.map((img, i) => (
          <div style={{ "--position": i + 1 }} className={"item"}>
            <img src={img} alt="hashira" />
          </div>
        ))}
      </div>
      <p className="demon-slayer"></p>
    </div>
  );
};

export default Slider3D;

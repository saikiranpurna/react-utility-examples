import React from "react";

const Slider3D = ({data}) => {
    let imgArr = [...data]
  return (
    <div className="banner">
      <div className="slider" style={{ "--quantity": imgArr.length }}>
        {imgArr.map((img, i) => (
          <div style={{ "--position": i + 1 }} className={"item"}>
            {/* here we're creating the varible dynamically which is helps us to set the image position dynamically from CSS */}
            <img src={img} alt="hashira" />
          </div>
        ))}
      </div>
      {/* Below container is for holding the image by the css at the center of the slider */}
      <div className="demon-slayer"></div>
    </div>
  );
};

export default Slider3D;

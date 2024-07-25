import React, { useEffect } from "react";

const Carousel = ({ data, auto = false, autoSlideDirection = "forward" }) => {
  let slideArr = [...data];

  const actionButtonClick = (direction) => {
    let sliderEl = document.querySelector(".carousel .list");
    let sliderItemEl = document.querySelectorAll(".carousel .list .item");
    let thumbnailEl = document.querySelector(".carousel .thumbnail");
    let thumbnailItemEl = document.querySelectorAll(
      ".carousel .thumbnail .item"
    );
    let nextButtonEl = document.getElementById("next");
    let prevButtonEl = document.getElementById("prev");
    // here disabling the buttons so the animation will gets completed
    nextButtonEl.setAttribute("disabled", true);
    prevButtonEl.setAttribute("disabled", true);
    //here we're preappend or appendchild according to the prev or next
    if (direction === "prev") {
      sliderEl.prepend(sliderItemEl[slideArr.length - 1]);
      thumbnailEl.prepend(thumbnailItemEl[slideArr.length - 1]);
    } else {
      sliderEl.appendChild(sliderItemEl[0]);
      thumbnailEl.appendChild(thumbnailItemEl[0]);
    }
    // here we're adding the class prev or next so that animation gets facts
    document.getElementsByClassName("carousel")[0].classList.add(direction);

    setTimeout(() => {
      // here we're removing the added the class prev or next so that animation stops
      document
        .getElementsByClassName("carousel")[0]
        .classList.remove(direction);
      // here enabling the buttons again
      nextButtonEl.removeAttribute("disabled");
      prevButtonEl.removeAttribute("disabled");
    }, 2000);
  };

  useEffect(() => {
    let prevButtonEl = document.getElementById("prev");
    let nextButtonEl = document.getElementById("next");
    // if auto true autoslide effects by default it'll be false
    if (auto)
      setInterval(() => {
        // direct of the slide
        if (autoSlideDirection === "forward") {
          nextButtonEl.click();
        } else if (autoSlideDirection === "backward") {
          prevButtonEl.click();
        }
      }, 3000);
  }, []);

  return (
    <div className="carousel">
      <div className="list">
        {slideArr.map((item) => (
          <div className="item">
            <img src={item?.img} alt={item.name} />
            <div className="content">
              <div className="name">{item?.name}</div>
              <div className="series">{item?.title}</div>
              <div className="des">{item?.des}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="thumbnail">
        {slideArr.map((item, index) => {
          if (index !== 0)
            return (
              <div className="item">
                <img src={item?.img} alt={item.name} />
                <div className="content">
                  <div className="name">{item?.name}</div>
                  <div className="series">{item?.title}</div>
                </div>
              </div>
            );
        })}
        <div className="item">
          <img src={slideArr[0]?.img} alt={slideArr[0].name} />
          <div className="content">
            <div className="name">{slideArr[0]?.name}</div>
            <div className="series">{slideArr[0]?.title}</div>
          </div>
        </div>
      </div>
      <div id="arrow">
        <button
          onClick={() => actionButtonClick("prev")}
          id="prev"
        >{`<`}</button>
        <button
          onClick={() => actionButtonClick("next")}
          id="next"
        >{`>`}</button>
      </div>
    </div>
  );
};

export default Carousel;

import React, { useEffect } from "react";
import "../styles/slider.css";


const OnScrollSlider = ({
  children,
  containerWidth = 1000,
  slideDelay = 5000,
  stackGap = 8,
  auto = true,
}) => {
  function mouseEvent() {
    console.log("called");
    const mainContainer = document.getElementById("main-slide-container");
    const container = document.getElementById("slide-container");
    mainContainer.addEventListener("wheel", (e) => {
      if (e.deltaY < -40) {
        console.log("downscroll");
        cycleSlides(container, "down");
      } else if (e.deltaY > 40) {
        console.log("upscroll");
        cycleSlides(container, "up");
      }
    });
  }

  function updateIndices(container) {
    const slides = container.querySelectorAll(".item");
    slides.forEach((slide, index) => {
      slide.style.setProperty("--index", index);
    });
  }

  function cycleSlides(container, direction = "down") {
    const slides = container.querySelectorAll(".item");
    const actionSlide =
      direction === "down" ? slides[slides.length - 1] : slides[0];

    // Add the 'fading' class to the last slide to trigger fade-out
    console.log(slides[0], "action");
    actionSlide.classList.remove("fadein");

    actionSlide.classList.add("fadeout");

    // Use requestAnimationFrame to ensure layout is recalculated before moving the slide
    requestAnimationFrame(() => {
      actionSlide.addEventListener(
        "animationend",
        function onAnimationEnd(event) {
          if (direction === "down") {
            container.insertBefore(actionSlide, container.firstChild);
          } else if (direction === "up") {
            container.append(actionSlide);
            container.lastChild.style.opacity = 0;
            container.lastChild.classList.add("fadein");
            console.log(container.lastChild);
            setTimeout(() => (container.lastChild.style.opacity = 1), 500);
          }
          updateIndices(container);
          actionSlide.classList.remove("fadeout");
          // Remove this event listener to prevent multiple triggers
          actionSlide.removeEventListener("animationend", onAnimationEnd);
        }
      );
    });
  }

  useEffect(() => {
    const container = document.getElementById("slide-container");
    // Initial index setup
    updateIndices(container);
    // Start the cycling loop with a delay
    if (auto) {
      setInterval(() => cycleSlides(container), slideDelay);
    }
  }, []);

  return (
    <div
      id="main-slide-container"
      className="main"
      onMouseOver={() => mouseEvent()}
    >
      <div
        id="slide-container"
        className="container"
        style={{
          "--total": children?.length,
          "--width": containerWidth,
          "--stackGap": stackGap,
        }}
      >
        {children.map((child, index) => {
          return (
            <div style={{ "--index": index }} className={"item"}>
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnScrollSlider;

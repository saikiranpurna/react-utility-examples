import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
const BackToHome = ({ children }) => {
  return (
    <>
      <div className="z-10 absolute pb-0">
        <Link to={"/"}>
          <IoMdArrowRoundBack className="w-12 h-12" />
        </Link>
      </div>
      <section className="pt-12">{children}</section>
    </>
  );
};

export default BackToHome;

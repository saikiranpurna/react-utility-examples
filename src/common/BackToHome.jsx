import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
const BackToHome = ({ children }) => {
  return (
    <>
      <div className="p-12">
        <Link to={"/"}>
          <IoMdArrowRoundBack className="w-12 h-12" />
        </Link>
      </div>
      {children}
    </>
  );
};

export default BackToHome;

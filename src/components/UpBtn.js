import React from "react";

const UpBtn = () => {
  const changeBack = () => {
    if (window.scrollY >= 100) {
      document.querySelector(".up-btn").style.transform = "translate(0)";
    } else {
      document.querySelector(".up-btn").style.transform = "translate(100vw)";
    }
  };

  window.addEventListener("scroll", changeBack);
  return (
    <button
      className="up-btn"
      onClick={() => {
        window.scrollTo({
          left: 0,
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      أعلى
    </button>
  );
};

export default UpBtn;

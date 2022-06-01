import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../images/logo.png";

const Header = () => {
  const [isBack, setIsBack] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const changeBack = () => {
    if (window.scrollY >= 10) {
      setIsBack(true);
    } else {
      setIsBack(false);
    }
  };

  window.addEventListener("scroll", changeBack);

  return (
    <header
      style={
        isBack
          ? { backgroundColor: "#333333bb" }
          : { backgroundColor: "transparent" }
      }
    >
      <div className="container">
        <Link className="logo" to="/">
          <img src={Logo} alt="فرقان" />
          <span>أونلاين</span>
        </Link>

        <button
          className="burger-icon"
          onClick={() => {
            isNavOpen ? setIsNavOpen(false) : setIsNavOpen(true);
          }}
        >
          <i className={isNavOpen ? "bi bi-x" : "bi bi-list"}></i>
        </button>
        <div className={isNavOpen ? "linkes flex" : "linkes"}>
          <NavLink onClick={() => setIsNavOpen(false)} to="/">
            الرئيسية
          </NavLink>
          <NavLink onClick={() => setIsNavOpen(false)} to="/text">
            النصية
          </NavLink>
          <NavLink onClick={() => setIsNavOpen(false)} to="/audio">
            الصوتية
          </NavLink>
          <NavLink onClick={() => setIsNavOpen(false)} to="/tafsir">
            التفسير
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;

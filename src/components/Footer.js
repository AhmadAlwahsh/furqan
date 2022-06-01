import React from "react";
import Logo from '../images/logo.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <img src={Logo} width="100px" alt="Logo" />
        <p>تواصل معنا</p>
        <div className="social-icons">
          <a href="https://web.facebook.com/AhmadAlwahsh07" target='_blank'>
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://twitter.com/ahmadalwahsh07" target='_blank'>
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://www.instagram.com/ahmadalwahsh007/" target='_blank'>
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/ahmad-alwahsh-2b6508228/" target='_blank'>
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
        <p className="copyright">
          © 2022 <a href="https://ahmadalwahsh.netlify.app">أحمد الوحش</a> جميع
          الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import "./Footer.scss";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Footer() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer__wrapper">
        <div className="row">
          <div className="col-6 footer__wrapper__info">
            {/* <img src={logo} alt="" /> */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. dolor
              sit amet, consectetur adipiscing
            </p>
            <div className="footer__wrapper__info__icons">
              <BsLinkedin size={30} />
              <BsInstagram size={30} />
              <BsFacebook size={30} />
            </div>
          </div>
          <div className="col-3">
            <div className="footer__wrapper__navigation">
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Subscription</a>
                </li>
                <li>
                  <a href="#">Sourcing</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-3">
            {!user ? (
              <div className="footer__wrapper__buttons">
                <button className="footer__wrapper__buttons--create">
                  Create a Account
                </button>
                <button className="footer__wrapper__buttons--sign-in">
                  Sign In
                </button>
              </div>
            ) : (
              <button
                className="footer__wrapper__buttons--profile mx-4"
                onClick={() => {
                  navigate("/provider/" + user.userId);
                }}
              >
                Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="footer__line"></div>
      <div className="footer__after-footer">
        <ul>
          <li>
            <a href="#">Terms and conditions</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">FAQ</a>
          </li>
        </ul>
        <span>@websitename 2023</span>
      </div>
    </div>
  );
}

export default Footer;

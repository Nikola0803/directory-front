import React from "react";
import "./MiniFooter.scss";
import logo from "../../assets/logo.png";
function MiniFooter() {
  return (
    <div className="mini-footer">
      <div className="mini-footer__left">
        {/* <img src={logo} alt="" /> */}
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
      </div>
      <span>@websitename 2023</span>
    </div>
  );
}

export default MiniFooter;

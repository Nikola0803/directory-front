import React, { useState } from "react";
import "./Navbar.scss";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { updateState } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import { BiUser } from "react-icons/bi";
function Navbar({ hamburger }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.jwt);
  const userData = useSelector((state) => state.user.user);
  const userStorage = localStorage.getItem("user");
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (userStorage) {
      const { userId } = JSON.parse(userStorage);

      setUserId(userId);
    }
  }, [userStorage]);
  return (
    <div className="navbar">
      <div className="col-1 mr-5">
        {/* <Link to={"/"}>
          <img src={Logo} alt="" />
        </Link> */}
      </div>
      <div className="col-7">
        {hamburger ? (
          <GiHamburgerMenu className="mx-5" size={30} />
        ) : (
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
        )}
      </div>
      <div className="col-3 d-flex justify-content-end align-items-center">
        {user ? (
          <>
            {/* <button
              className="mx-4"
              onClick={() => {
                localStorage.removeItem("user");
                dispatch(updateState(""));

                document.cookie = "jwt=; Max-Age=0";
                toast.warning("Successfully logged out.");
              }}
            >
              Log Out
            </button> */}
            <button
              className="mx-4"
              onClick={() => {
                navigate("/provider/" + userId);
              }}
            >
              <BiUser size={25} />
              {userData.firstLastName}
            </button>
          </>
        ) : (
          <>
            <p
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </p>
            <button
              onClick={() => {
                navigate("/register");
              }}
            >
              Create a Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;

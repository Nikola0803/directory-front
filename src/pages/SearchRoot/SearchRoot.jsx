import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./SearchRoot.scss";
import chrome from "../../assets/chrome.png";
import activity from "../../assets/activity.png";
import airplay from "../../assets/airplay.png";
import grid from "../../assets/grid.png";
import MiniFooter from "../../components/MiniFooter/MiniFooter";
import { useSelector } from "react-redux";
import { BiData } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
function SearchRoot() {
  const { search, id } = useParams();
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.user.jwt);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (search) {
      if (search === "") {
        // If search is empty, navigate to the "/" route
        navigate("/");
      }
    }
    if (id) {
      if (id === "") {
        // If id is empty, navigate to the "/" route
        navigate("/");
      }
    }
  }, [id, search, navigate]);

  const userStorage = localStorage.getItem("user");

  const [userId, setUserId] = useState();

  useEffect(() => {
    if (userStorage) {
      const { userId } = JSON.parse(userStorage);

      setUserId(userId);
    }
  }, [userStorage]);
  return (
    <div>
      <Navbar hamburger />
      <div className="search-wrapper">
        <div
          className={`search-wrapper__sidebar ${
            !jwt && "search-wrapper__sidebar--non-user"
          }`}
        >
          <h3>Dashboard</h3>
          <ul>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "search-wrapper__sidebar--active"
                  : ""
              }
            >
              <p>
                {" "}
                <img src={airplay} alt="" /> Home
              </p>
            </NavLink>
            {jwt && (
              <>
                {user.selectUser === "Estate Agent / Landlord" && (
                  <NavLink
                    to="/add/property"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "search-wrapper__sidebar--active"
                        : ""
                    }
                  >
                    <p>
                      {" "}
                      <img src={grid} alt="" /> Add property
                    </p>
                  </NavLink>
                )}
                {user.selectUser === "Estate Agent / Landlord" && (
                  <NavLink
                    to="/me/properties"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "search-wrapper__sidebar--active"
                        : ""
                    }
                  >
                    {" "}
                    <p>
                      {" "}
                      <img src={chrome} alt="" /> My properties
                    </p>
                  </NavLink>
                )}

                {user.selectUser === "Care Provider" && (
                  <NavLink
                    to="/favorites"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "search-wrapper__sidebar--active"
                        : ""
                    }
                  >
                    {" "}
                    <p>
                      {" "}
                      <MdFavorite size={20} /> Favorites
                    </p>
                  </NavLink>
                )}

                {jwt && (
                  <NavLink
                    to="/me/bids"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "search-wrapper__sidebar--active"
                        : ""
                    }
                  >
                    {" "}
                    <p>
                      {" "}
                      <BiData size={20} /> My bids
                    </p>
                  </NavLink>
                )}

                <NavLink
                  to="/me/messages"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "search-wrapper__sidebar--active"
                      : ""
                  }
                >
                  {" "}
                  <p>
                    {" "}
                    <AiFillMessage size={20} /> My messages
                  </p>
                </NavLink>
              </>
            )}
          </ul>
          {jwt && user.selectUser === "Estate Agent / Landlord" && (
            <div className="search-wrapper__sidebar__line"></div>
          )}
          {jwt && user.selectUser === "Estate Agent / Landlord" && (
            <h3>Estate Agent / Landlord</h3>
          )}
          {jwt && user.selectUser === "Estate Agent / Landlord" && (
            <ul>
              <NavLink
                to={`/provider/` + userId}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "search-wrapper__sidebar--active"
                    : ""
                }
              >
                <p>
                  {" "}
                  <img src={airplay} alt="" />
                  My details
                </p>
              </NavLink>
              <NavLink
                to="123"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "search-wrapper__sidebar--active"
                    : ""
                }
              >
                <p>
                  {" "}
                  <img src={activity} alt="" />
                  Sidebar link
                </p>
              </NavLink>
              <NavLink
                to="123"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "search-wrapper__sidebar--active"
                    : ""
                }
              >
                <p>
                  {" "}
                  <img src={chrome} alt="" />
                  Sidebar link
                </p>
              </NavLink>
              <NavLink
                to="123"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "search-wrapper__sidebar--active"
                    : ""
                }
              >
                <p>
                  {" "}
                  <img src={activity} alt="" />
                  Sidebar link
                </p>
              </NavLink>
            </ul>
          )}
        </div>
        <Outlet /> {/* Renders the nested route (Search component) */}
      </div>
    </div>
  );
}

export default SearchRoot;

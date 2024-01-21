import React, { useEffect, useState } from "react";
import "./Provider.scss";
import star from "../../assets/star.png";
import logo2 from "../../assets/logo2.png";
import trello from "../../assets/trello.png";
import comment from "../../assets/comment.png";
import email from "../../assets/mail.png";
import user from "../../assets/user.png";
import phone from "../../assets/phone.png";
import review from "../../assets/review.png";
import address from "../../assets/map-pin.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MiniFooter from "../MiniFooter/MiniFooter";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-toastify";
import { updateState, updateUser } from "../../redux/features/userSlice";
import { useCookies } from "react-cookie";
function Provider() {
  const location = useLocation();
  const { article } = location.state || {};
  let { id } = useParams();
  const [provider, setProvider] = useState([]);
  const jwt = useSelector((state) => state.user.jwt);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  useEffect(() => {
    async function fetchProvider() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };

        const response = await axios.get(
          `${
            process.env.REACT_APP_API_URL
          }users?populate=*&filters[userId][$eq]=${
            !article?.attributes?.propertyOwnerId
              ? id
              : article.attributes.propertyOwnerId
          }`,
          config // Pass the config object with headers
        );

        setProvider(response.data[0]);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchProvider();
  }, [id]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="provider">
      <div className="provider__wrapper">
        <AiOutlineArrowLeft
          className="mb-4"
          size={30}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
        <div className="provider__wrapper__header">
          <button
            className="provider__wrapper__header__button"
            onClick={() => {
              localStorage.removeItem("user");
              dispatch(updateState(""));
              dispatch(updateUser(""));
              removeCookie("jwt", { path: "/" });
              // document.cookie = "jwt=; Max-Age=0";
              toast.warning("Successfully logged out.");
            }}
          >
            Log Out
          </button>
          <div className="provider__wrapper__header__holder">
            <div className="provider__wrapper__header__holder__left">
              <div id="logo"> {/* <img src={logo2} alt="" /> */}</div>

              <div className="provider__wrapper__header__holder__left__title">
                <div className="provider__wrapper__header__holder__left__title__header">
                  <h3>
                    {!provider?.firstLastName && "No provider"}
                    {provider?.firstLastName}
                  </h3>
                  <p>
                    <img src={star} alt="" />
                    4.5 - <span>20 reviews</span>
                  </p>
                </div>
                <div className="provider__wrapper__header__holder__left__title__desc">
                  <p>{provider?.description}</p>
                </div>
              </div>
            </div>

            <div className="provider__wrapper__header__holder__right">
              {!jwt && (
                <>
                  <img src={comment} alt="" />
                  <span>Send Message</span>
                </>
              )}

              <img src={trello} alt="" />
              <span>All Properties</span>
            </div>
          </div>
          <ul>
            <li className="selected">Contact Info</li>
            <li>All Reviews</li>
          </ul>
        </div>
        <div className="provider__wrapper__mid">
          <h3>Contact Information</h3>
          <div className="provider__wrapper__mid__row">
            <div className="provider__wrapper__mid__row__left">
              <div className="provider__wrapper__mid__row__left__contacts">
                <div className="provider__wrapper__mid__row__left__contacts__row">
                  <div className="provider__wrapper__mid__row__left__contacts__row__contact">
                    <img src={user} alt="" />
                    <div className="provider__wrapper__mid__row__left__contacts__row__contact__title">
                      <span>Contact Name</span>
                      <h3>{provider?.firstLastName}</h3>
                    </div>
                  </div>

                  <div className="provider__wrapper__mid__row__left__contacts__row__contact">
                    <img src={email} alt="" />
                    <div className="provider__wrapper__mid__row__left__contacts__row__contact__title">
                      <span>Contact Email</span>
                      <h3>{provider?.email}</h3>
                    </div>
                  </div>
                </div>
                <div className="provider__wrapper__mid__row__left__contacts__row">
                  <div className="provider__wrapper__mid__row__left__contacts__row__contact">
                    <img src={phone} alt="" />
                    <div className="provider__wrapper__mid__row__left__contacts__row__contact__title">
                      <span>Cell Phone</span>
                      <h3>{provider?.phone}</h3>
                    </div>
                  </div>

                  <div className="provider__wrapper__mid__row__left__contacts__row__contact">
                    <img src={address} alt="" />
                    <div className="provider__wrapper__mid__row__left__contacts__row__contact__title">
                      <span>Address</span>
                      <h3>
                        {provider?.street},{provider?.country},{provider?.city}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="provider__wrapper__mid__row__right">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2srs!4v1694605731218!5m2!1sen!2srs"
                height="358"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="provider__wrapper__footer">
          <div className="provider__wrapper__footer__top">
            <h3>Selected Reviews</h3>
            <p>
              <img src={star} alt="" />
              4.5 - <span>20 reviews</span>
            </p>
          </div>
          <div className="provider__wrapper__footer__reviews">
            <div className="provider__wrapper__footer__reviews__review">
              <img src={review} alt="" />
              <div className="provider__wrapper__footer__reviews__review__title">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                  eligendi accusamus dolorum ab placeat quisquam eaque
                  repudiandae, culpa quo! Itaque ratione quod sit mollitia
                  labore maxime provident, asperiores, vero possimus saepe
                  laboriosam temporibus exercitationem quia sapiente quam.
                  Architecto, nesciunt quaerat?
                </p>
                <h3>Care Provider</h3>
              </div>
            </div>
            <div className="provider__wrapper__footer__reviews__review">
              <img src={review} alt="" />
              <div className="provider__wrapper__footer__reviews__review__title">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                  eligendi accusamus dolorum ab placeat quisquam eaque
                  repudiandae, culpa quo! Itaque ratione quod sit mollitia
                  labore maxime provident, asperiores, vero possimus saepe
                  laboriosam temporibus exercitationem quia sapiente quam.
                  Architecto, nesciunt quaerat?
                </p>
                <h3>Care Provider</h3>
              </div>
            </div>
            <div className="provider__wrapper__footer__reviews__review">
              <img src={review} alt="" />
              <div className="provider__wrapper__footer__reviews__review__title">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                  eligendi accusamus dolorum ab placeat quisquam eaque
                  repudiandae, culpa quo! Itaque ratione quod sit mollitia
                  labore maxime provident, asperiores, vero possimus saepe
                  laboriosam temporibus exercitationem quia sapiente quam.
                  Architecto, nesciunt quaerat?
                </p>
                <h3>Care Provider</h3>
              </div>
            </div>
            <div className="provider__wrapper__footer__reviews__review">
              <img src={review} alt="" />
              <div className="provider__wrapper__footer__reviews__review__title">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                  eligendi accusamus dolorum ab placeat quisquam eaque
                  repudiandae, culpa quo! Itaque ratione quod sit mollitia
                  labore maxime provident, asperiores, vero possimus saepe
                  laboriosam temporibus exercitationem quia sapiente quam.
                  Architecto, nesciunt quaerat?
                </p>
                <h3>Care Provider</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MiniFooter />
    </div>
  );
}

export default Provider;

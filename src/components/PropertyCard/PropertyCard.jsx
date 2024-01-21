import React, { useEffect, useState } from "react";

import filter from "../../assets/filter.png";
import Loader from "../../components/Loader/Loader";
import favorite from "../../assets/favorite.png";
import comment from "../../assets/comment.png";
import star from "../../assets/star.png";
import location from "../../assets/map-pin.png";
import file from "../../assets/file-text.png";
import typeProp from "../../assets/home.png";
import size from "../../assets/maximize.png";
import shuffle from "../../assets/shuffle.png";
import arrowRight from "../../assets/arrow-right.png";
import ImageGallery from "react-image-gallery";
import { useNavigate, useParams } from "react-router-dom";
import MiniFooter from "../../components/MiniFooter/MiniFooter";
import { BiChair, BiCheck, BiLoaderAlt } from "react-icons/bi";
import axios from "axios";
import { useSelector } from "react-redux";

import "./PropertyCard.scss";
import { toast } from "react-toastify";
import { GiBunkBeds, GiDogHouse } from "react-icons/gi";
function PropertyCard({
  article,
  savePropertyValues,
  fetchArticles,
  checkBidCreated,
}) {
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.user.jwt);
  const user = useSelector((state) => state.user.user);
  const [myProperty, setMyProperty] = useState(false);
  useEffect(() => {
    if (user.userId === article.attributes.propertyOwnerId) {
      setMyProperty(true);
    }
  }, []);

  async function deleteProperty(e, id) {
    e.preventDefault();

    // Show a confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) {
      // The user clicked "Cancel" or closed the dialog, so do nothing
      return;
    }

    try {
      // Make the Axios POST request
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}property/delete`,
        {
          propertyOwnerId: user?.userId,
          id: id,
        },
        {
          headers: {
            // Add any headers needed, e.g., authentication token
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (fetchArticles) {
        fetchArticles();
      }

      // Handle the response, e.g., show a success message
      toast.success("Property deleted successfully !");
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error deleting property:", error);

      toast.error(error?.response?.data?.error?.details?.errors[0]?.message);
    }
  }

  return (
    <>
      <div
        key={article.id}
        className="my-properties__search__main__properties__property"
      >
        <div
          onClick={(e) => {
            if (e.target.tagName === "IMG") {
              navigate("/property/" + article.id, {
                state: { article: article },
              });
            }
          }}
          className="my-properties__search__main__properties__property__img"
        >
          <ImageGallery
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets
            items={article.attributes.gallery.data.map((item) => ({
              original:
                "http://localhost:1337" + item.attributes.formats.thumbnail.url,
              thumbnail:
                "http://localhost:1337" + item.attributes.formats.thumbnail.url, // You can use the same URL for thumbnails or customize as needed
            }))}
            showThumbnails={false}
          />
        </div>
        <div className="my-properties__search__main__properties__property__info">
          <div className="my-properties__search__main__properties__property__info__title">
            <h3
              onClick={() =>
                navigate("/property/" + article.id, {
                  state: { article: article },
                })
              }
            >
              {article.attributes.title}
            </h3>
            <div className="my-properties__search__main__properties__property__info__title__icons">
              {!myProperty && (
                <>
                  <div>
                    <img src={comment} alt="" />
                    <span id="msg">Send Message</span>
                  </div>
                  <div>
                    <img src={favorite} alt="" />
                    <span>Add to Favorites</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="my-properties__search__main__properties__property__info__provider-review">
            <h5>
              <p>£</p>{" "}
              {Number(article?.attributes.price).toLocaleString("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h5>
            {jwt && (
              <span
                onClick={() =>
                  navigate(
                    "/provider/" +
                      article?.attributes.propertyOwnerId.replace(/\s/g, ""),
                    {
                      state: { article },
                    }
                  )
                }
              >
                {user.selectUser === "Estate Agent / Landlord" &&
                  article?.attributes.propertyOwner}
              </span>
            )}

            <p>
              <img src={star} alt="" />
              4.5 - <span>20 reviews</span>
            </p>
          </div>
          <div className="my-properties__search__main__properties__property__info__icons">
            <span>
              <img src={location} alt="" /> {article?.attributes.Location}
            </span>
            <span>
              <img src={typeProp} alt="" />{" "}
              {article?.attributes?.TypeOfProperty}
            </span>
            <span>
              <img src={size} alt="" /> {article?.attributes?.Radius}
            </span>
            <span>
              <img src={shuffle} alt="" /> {article?.attributes?.HMOreadiness}
            </span>
          </div>
          <div className="my-properties__search__main__properties__property__info__icons">
            <span>
              <GiBunkBeds size={20} /> {article?.attributes.beds}
            </span>
            <span>
              <GiDogHouse size={20} />{" "}
              {article?.attributes?.mustHave?.split(",").join(", ")}
            </span>
            <span>
              <BiChair size={20} /> {article?.attributes?.furnishing}
            </span>
            <span>
              <BiCheck size={20} /> {article?.attributes?.availability}
            </span>
            <span>
              <img src={typeProp} alt="" />{" "}
              {article?.attributes?.TypeOfProperty2}
            </span>
          </div>
          <div className="my-properties__search__main__properties__property__info__description">
            <p> {article?.attributes?.Description}</p>
            {myProperty ? (
              <>
                <div className="my-properties__search__main__properties__property__info__description__buttons">
                  <button
                    onClick={() => navigate("/update-property/" + article.id)}
                    className="my-properties__search__main__properties__property__info__description__buttons__property-edit"
                  >
                    Edit Property
                  </button>
                  <button
                    onClick={(e) => deleteProperty(e, article.id)}
                    className="my-properties__search__main__properties__property__info__description__buttons__property-delete"
                  >
                    Delete Property
                  </button>
                </div>
              </>
            ) : (
              <>
                {user.selectUser !== "Estate Agent / Landlord" && (
                  <button
                    onClick={(e) => {
                      checkBidCreated(e, article.id);
                      savePropertyValues(article);
                    }}
                  >
                    Place a Bid
                  </button>
                )}
              </>
            )}
          </div>
          <div className="my-properties__search__main__properties__property__info__footer">
            <span
              onClick={() =>
                navigate("/property/" + article.id, {
                  state: { article: article },
                })
              }
            >
              View Property <img src={arrowRight} alt="" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyCard;

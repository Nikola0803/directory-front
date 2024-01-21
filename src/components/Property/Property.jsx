import React, { useState } from "react";
import "./Property.scss";
import comment from "../../assets/comment.png";
import favorite from "../../assets/favorite.png";
import locationPic from "../../assets/map-pin.png";
import typeProp from "../../assets/home.png";
import size from "../../assets/maximize.png";
import shuffle from "../../assets/shuffle.png";
import file from "../../assets/file-text.png";
import alert from "../../assets/alert-circle.png";
import star from "../../assets/star.png";
import MiniFooter from "../MiniFooter/MiniFooter";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GiBunkBeds, GiDogHouse } from "react-icons/gi";
import { BiChair, BiCheck } from "react-icons/bi";
function Property() {
  const location = useLocation();
  // const { article } = location.state || {};
  const { id } = useParams();
  const [loaderState, setLoaderState] = useState(false);
  const [article, setArticle] = useState("");
  const [highestBid, setHighestBid] = useState("");
  const [bid, setBid] = useState(50);
  const [bidExists, setBidExists] = useState(false);
  const user = useSelector((state) => state.user.user);
  const jwt = useSelector((state) => state.user.jwt);
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
      navigate("/me/properties");
      // Handle the response, e.g., show a success message
      toast.success("Property deleted successfully !");
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error deleting property:", error);

      toast.error(error?.response?.data?.error?.details?.errors[0]?.message);
    }
  }

  useEffect(() => {
    const handleSearch = (e) => {
      // if (searchTerm.length <= 3) {
      //   toast.error("Search value should be higher than 3");
      //   return;
      // }
      setLoaderState(true);
      const url = `${process.env.REACT_APP_API_URL}home-owner-listings/${id}?populate=*
      `;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "bearer " + process.env.REACT_APP_STRAPI_API_TOKEN,
      };

      try {
        // Make a GET request using Axios with headers
        axios
          .get(
            url,

            { headers }
          )
          .then((response) => {
            setArticle(response.data.data);
            setLoaderState(false);
          })
          .catch((error) => {
            // Handle errors here
            setLoaderState(false);
            console.error("Error:", error?.response?.data?.error?.message);
          });
      } catch (error) {
        // Handle any exceptions that might occur

        console.error("Exception:", error);
      }
    };
    handleSearch();
  }, [id]);

  function onChangeBid(e) {
    if (Number(e.target.value) + bid < Number(e.target.value)) {
      return;
    }
    const num = Number(e.target.value);
    setBid(num);
  }
  function changeBid(type) {
    if (type === "plus") {
      setBid((bid) => bid + 10);
    }
    if (type === "minus") {
      // if (bid <= 0) {
      //   return;
      // }
      setBid((bid) => {
        if (bid - 10 <= 50) {
          return 50;
        }
        return bid - 10;
      });
    }
  }

  useEffect(() => {
    function getHighestBid() {
      const url = `${process.env.REACT_APP_API_URL}bids?filters[propertyId][$eq]=${id}&populate=*
      `;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "bearer " + jwt,
      };

      try {
        // Make a GET request using Axios with headers
        axios
          .get(
            url,

            { headers }
          )
          .then((response) => {
            const bids = response.data.data.map(
              (bid) => bid.attributes.bidPrice
            );
            console.log(bids);
            if (bids.length === 0) {
              setLoaderState(false);
              return;
            } else {
              const highestBd = Math.max(...bids);
              console.log(highestBd);

              if (highestBd) {
                setHighestBid(highestBd);
              }

              setLoaderState(false);
            }
          })
          .catch((error) => {
            // Handle errors here
            setLoaderState(false);
            console.error("Error:", error?.response?.data?.error?.message);
          });
      } catch (error) {
        // Handle any exceptions that might occur

        console.error("Exception:", error);
      }
    }
    jwt && getHighestBid();
  }, []);

  useEffect(() => {
    function checkBidCreated() {
      const url = `${process.env.REACT_APP_API_URL}bids?filters[propertyId][$eq]=${id}&populate=*
      `;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "bearer " + jwt,
      };

      try {
        // Make a GET request using Axios with headers
        axios
          .get(
            url,

            { headers }
          )
          .then((response) => {
            const bidExists = response.data.data.filter((bid) => {
              return bid.attributes.bidOwnerId === user.userId;
            });

            if (bidExists[0]) {
              setBidExists(true);
            }
            setLoaderState(false);
          })
          .catch((error) => {
            // Handle errors here
            setLoaderState(false);
            console.error("Error:", error?.response?.data?.error?.message);
          });
      } catch (error) {
        // Handle any exceptions that might occur

        console.error("Exception:", error);
      }
    }
    jwt && checkBidCreated();
  }, []);

  function createBid(e, article) {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure that you want to create a bid for this property?"
      )
    ) {
      // Code to execute if the user clicks "Yes"
      setLoaderState(true);
      const url = `${process.env.REACT_APP_API_URL}bids
      `;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "bearer " + jwt,
      };
      let data = {
        bidPrice: bid + Number(article?.attributes?.price),
        propertyId: String(article.id),
        propertyOwnerId: article.attributes.propertyOwnerId,
        bidOwnerId: user.userId,
        bidOwnerEmail: user.email,
        bidOwnerName: user.firstLastName,
        // bidStatus: "pending",
        propertyPrice: Number(article?.attributes?.price),
        propertyName: article.attributes.title,
        image: article.attributes.gallery.data[0].attributes.url,
      };
      try {
        // Make a GET request using Axios with headers
        axios
          .post(url, (data = { data }), { headers })
          .then((response) => {
            setLoaderState(false);

            toast.success("Bid is successfully created");
            navigate("/me/bids");
          })
          .catch((error) => {
            // Handle errors here
            setLoaderState(false);
            toast.error(error?.response?.data?.error?.message);
            console.error("Error:", error?.response?.data?.error?.message);
          });
      } catch (error) {
        // Handle any exceptions that might occur

        console.error("Exception:", error);
      }
    } else {
      return;
    }
  }
  const navigate = useNavigate();
  return (
    <div className="property">
      <div className="property__wrapper">
        <AiOutlineArrowLeft
          className="mb-4"
          size={30}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
        {loaderState ? (
          <Loader size={100} />
        ) : article.length === 0 ? (
          <h3>There's no property by that name</h3>
        ) : (
          <>
            <div className="property__wrapper__title">
              <h3>{article?.attributes.title}</h3>
              <div className="property__wrapper__title__holder">
                <div className="property__wrapper__title__holder__provider-review">
                  <h5>
                    <p>£</p>{" "}
                    {Number(article?.attributes.price).toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </h5>
                  <span
                    onClick={() =>
                      navigate(
                        "/provider/" +
                          article?.attributes.propertyOwnerId.replace(
                            /\s/g,
                            ""
                          ),
                        {
                          state: { article },
                        }
                      )
                    }
                  >
                    {" "}
                    {user.selectUser === "Estate Agent / Landlord" &&
                      article?.attributes.propertyOwner}
                  </span>
                  <p>
                    <img src={star} alt="" />
                    4.5 - <span>20 reviews</span>
                  </p>
                </div>
                <div className="property__wrapper__title__holder__icons">
                  {user.userId !== article?.attributes.propertyOwnerId && (
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

                  {user.userId === article?.attributes.propertyOwnerId && (
                    <>
                      <button
                        onClick={() =>
                          navigate("/update-property/" + article.id)
                        }
                        className="btn-edit"
                      >
                        Edit Property
                      </button>
                      <button
                        onClick={(e) => deleteProperty(e, article.id)}
                        className="btn-delete"
                      >
                        Delete Property
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="property__wrapper__grid-container">
              <div className="property__wrapper__grid-container__col-7">
                <div>
                  {" "}
                  <img
                    className="photo"
                    src={
                      "http://localhost:1337" +
                      (article?.attributes?.gallery?.data[0]?.attributes.formats
                        .large?.url ||
                        article?.attributes?.gallery?.data[0]?.attributes
                          .formats.thumbnail.url)
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="property__wrapper__grid-container__col-5">
                <div className="property__wrapper__grid-container__col-5__row">
                  <div>
                    {" "}
                    <img
                      src={
                        "http://localhost:1337" +
                        (article?.attributes?.gallery?.data[1]?.attributes
                          .formats.large?.url ||
                          article?.attributes?.gallery?.data[1]?.attributes
                            .formats.thumbnail.url)
                      }
                      alt=""
                    />
                  </div>
                  <div>
                    {" "}
                    <img
                      src={
                        "http://localhost:1337" +
                        (article?.attributes?.gallery?.data[2]?.attributes
                          .formats.large?.url ||
                          article?.attributes?.gallery?.data[2]?.attributes
                            .formats.thumbnail.url)
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="property__wrapper__grid-container__col-5__row">
                  <div>
                    {" "}
                    <img
                      src={
                        "http://localhost:1337" +
                        (article?.attributes?.gallery?.data[3]?.attributes
                          .formats.large?.url ||
                          article?.attributes?.gallery?.data[3]?.attributes
                            .formats.thumbnail.url)
                      }
                      alt=""
                    />
                  </div>

                  <div className="property__wrapper__grid-container__col-5__row--plus">
                    {" "}
                    <div className="property__wrapper__grid-container__col-5__row--plus__overlay">
                      +24
                    </div>
                    <img
                      src={
                        "http://localhost:1337" +
                          article?.attributes?.gallery?.data[4]?.attributes
                            ?.formats?.large?.url ||
                        article?.attributes?.gallery?.data[4]?.attributes
                          .formats.thumbnail.url
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="property__wrapper__holder">
              <div className="property__wrapper__holder__docs ">
                <h3>Property Title</h3>

                <div className="property__wrapper__holder__docs__icons">
                  <span>
                    <img src={locationPic} alt="" />{" "}
                    {article?.attributes.Location}
                  </span>
                  <span>
                    <img src={typeProp} alt="" />{" "}
                    {article?.attributes.TypeOfProperty}
                  </span>
                  <span>
                    <img src={size} alt="" /> {article?.attributes.Radius}
                  </span>
                  <span>
                    <img src={shuffle} alt="" />{" "}
                    {article?.attributes.HMOreadiness}
                  </span>
                </div>
                <div className="property__wrapper__holder__docs__icons">
                  <span>
                    <GiBunkBeds size={20} /> {article?.attributes.beds}
                  </span>
                  <span>
                    <GiDogHouse size={20} />{" "}
                    {article?.attributes?.mustHave?.split(",").join(", ")}
                  </span>
                  <span>
                    <BiChair size={20} /> {article?.attributes.furnishing}
                  </span>
                  <span>
                    <BiCheck size={20} /> {article?.attributes.availability}
                  </span>
                  <span>
                    <img src={typeProp} alt="" />{" "}
                    {article?.attributes.TypeOfProperty2}
                  </span>
                </div>
                <div className="property__wrapper__holder__docs__description">
                  <p> {article?.attributes.Description}</p>
                </div>
                <div className="property__wrapper__holder__docs__titles">
                  <h3> {article?.attributes.Title3}</h3>
                  <div className="property__wrapper__holder__docs__titles__wrapper">
                    <div className="property__wrapper__holder__docs__titles__wrapper__title">
                      <h5>Text Block</h5>
                      <p>{article?.attributes.Explanation}</p>
                    </div>
                    <div className="property__wrapper__holder__docs__titles__wrapper__title">
                      <h5>Text Block</h5>
                      <p>{article?.attributes.Explanation2}</p>
                    </div>
                    <div className="property__wrapper__holder__docs__titles__wrapper__title">
                      <h5>Text Block</h5>
                      <p>{article?.attributes.Explanation3}</p>
                    </div>
                  </div>
                </div>
                <div className="property__wrapper__holder__docs__titles">
                  <h3>Section Title</h3>
                  <div className="property__wrapper__holder__docs__titles__title">
                    <h5> {article?.attributes.ExplanationTitle}</h5>
                    <p>{article?.attributes.Description3}</p>
                  </div>
                </div>
              </div>
              <div className="property__wrapper__holder__docs-right">
                <div className="property__wrapper__holder__docs-right__card property__wrapper__holder__docs-right__documents">
                  <h3>Legal Documents</h3>

                  <img src={file} alt="" />
                  <span>Document 1</span>
                  <img src={file} alt="" />
                  <span>Document 2</span>
                </div>
                {user.userId === article?.attributes.propertyOwnerId ||
                  (user.selectUser === "Estate Agent / Landlord" ? (
                    ""
                  ) : (
                    <div className="property__wrapper__holder__docs-right__card property__wrapper__holder__docs-right__bid">
                      <h3>Enter your Bid</h3>
                      {bidExists ? (
                        <span>You already created a bid.</span>
                      ) : (
                        <div className="property__wrapper__holder__docs-right__bid__wrapper">
                          <span onClick={() => changeBid("minus")}>-</span>
                          <div className="property__wrapper__holder__docs-right__bid__wrapper__input">
                            <span>£</span>
                            <input
                              onChange={onChangeBid}
                              type="number"
                              placeholder="Bid..."
                              value={
                                bid +
                                Number(
                                  highestBid
                                    ? highestBid
                                    : article?.attributes?.price
                                )
                              }
                            />
                          </div>
                          <span onClick={() => changeBid("plus")}>+</span>
                          <button onClick={(e) => createBid(e, article)}>
                            Place a Bid
                          </button>
                        </div>
                      )}

                      <div className="d-flex mt-3">
                        <img src={alert} alt="" />
                        {highestBid ? (
                          <p>Current highest Bid is: {highestBid} £ </p>
                        ) : (
                          <p>There are no bids for this property</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
      <MiniFooter />
    </div>
  );
}

export default Property;

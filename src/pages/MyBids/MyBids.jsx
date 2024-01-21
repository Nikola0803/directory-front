import React, { useEffect, useState } from "react";
import "./MyBids.scss";
import img from "../../assets/landing-bg-1.png";
import MiniFooter from "../../components/MiniFooter/MiniFooter";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
function MyBids() {
  const { user } = useSelector((state) => state.user);
  const { jwt } = useSelector((state) => state.user);

  const [loaderState, setLoaderState] = useState(false);
  const [bids, setBids] = useState("");
  const handleSearch = (e) => {
    // if (searchTerm.length <= 3) {
    //   toast.error("Search value should be higher than 3");
    //   return;
    // }
    setLoaderState(true);
    let url;
    if (user.selectUser === "Estate Agent / Landlord") {
      url = `${process.env.REACT_APP_API_URL}bids?filters[propertyOwnerId][$eq]=${user.userId}&populate=*`;
    } else {
      url = `${process.env.REACT_APP_API_URL}bids?filters[bidOwnerId][$eq]=${user.userId}&populate=*`;
    }

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
          setBids(response.data.data);
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
  function changeBidStatus(e, status, id, propertyOwnerId) {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: "bearer " + jwt,
    };
    const url = "http://localhost:1337/api/bids/update-status";
    try {
      // Make a GET request using Axios with headers
      axios
        .post(
          url,
          { status, token: jwt, id, propertyOwnerId },

          { headers }
        )
        .then((response) => {
          handleSearch();
          setLoaderState(false);
        })
        .catch((error) => {
          // Handle errors here
          setLoaderState(false);
          console.error("Error:", error?.response?.data?.error?.message);
        });
    } catch (error) {
      // Handle any exceptions that might occur
      toast.error(error);
      console.error("Exception:", error);
    }
  }
  useEffect(() => {
    jwt && handleSearch();
  }, []);
  return (
    <div className="my-bids">
      <div className="my-bids__wrapper">
        <div className="my-bids__wrapper__top">
          <h3>
            {user.selectUser === "Estate Agent / Landlord"
              ? "Bids on my properties:"
              : "Bids I created:"}
          </h3>
        </div>
        <div className="my-bids__wrapper__item-holder">
          {bids?.length === 0 && <p>There is no bids</p>}
          {loaderState ? (
            <Loader />
          ) : (
            <>
              {user.selectUser === "Estate Agent / Landlord" ? (
                <>
                  {bids &&
                    bids?.map((bid) => {
                      return (
                        <>
                          <div className="my-bids__wrapper__item-holder__item">
                            <div className="my-bids__wrapper__item-holder__item__left">
                              <img
                                src={
                                  "http://localhost:1337" + bid.attributes.image
                                }
                                alt=""
                              />
                              <div className="my-bids__wrapper__item-holder__item__left__info">
                                <h3>{bid.attributes.propertyName}</h3>
                                <span>
                                  Property Price:{" "}
                                  <p>
                                    <h5>£</h5>
                                    {Number(
                                      bid.attributes.propertyPrice
                                    ).toLocaleString("de-DE", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </p>{" "}
                                </span>
                                <span>
                                  Bid price:{" "}
                                  <p>
                                    <h5>£</h5>
                                    {Number(
                                      bid.attributes.bidPrice
                                    ).toLocaleString("de-DE", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </p>{" "}
                                </span>
                                <span>
                                  Bid Owner:{" "}
                                  <p>{bid.attributes.bidOwnerName}</p>{" "}
                                </span>
                                <span>
                                  Bid Owner Email:{" "}
                                  <p>{bid.attributes.bidOwnerEmail}</p>{" "}
                                </span>

                                <span>
                                  Date:{" "}
                                  <p>
                                    {new Date(
                                      bid.attributes.publishedAt
                                    ).toLocaleDateString()}
                                  </p>{" "}
                                </span>
                              </div>
                            </div>
                            <div className="my-bids__wrapper__item-holder__item__buttons">
                              {bid.attributes.bidStatus === "declined" ||
                              bid.attributes.bidStatus === "accepted" ? (
                                <p>
                                  You{" "}
                                  <span
                                    className={`bid-${bid.attributes.bidStatus}`}
                                  >
                                    {" "}
                                    {bid.attributes.bidStatus + " "}
                                  </span>
                                  this bid.
                                </p>
                              ) : (
                                <>
                                  <button
                                    onClick={(e) =>
                                      changeBidStatus(
                                        e,
                                        "accepted",
                                        bid.id,
                                        bid.attributes.propertyOwnerId
                                      )
                                    }
                                    className="my-bids__wrapper__item-holder__item__buttons__accept"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={(e) =>
                                      changeBidStatus(
                                        e,
                                        "declined",
                                        bid.id,
                                        bid.attributes.propertyOwnerId
                                      )
                                    }
                                    className="my-bids__wrapper__item-holder__item__buttons__decline"
                                  >
                                    Decline
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                </>
              ) : (
                <>
                  {bids &&
                    bids?.map((bid) => {
                      return (
                        <>
                          <div className="my-bids__wrapper__item-holder__item">
                            <div className="my-bids__wrapper__item-holder__item__left">
                              <img
                                src={
                                  "http://localhost:1337" + bid.attributes.image
                                }
                                alt=""
                              />
                              <div className="my-bids__wrapper__item-holder__item__left__info">
                                <h3>{bid.attributes.propertyName}</h3>
                                <span>
                                  Property Price:{" "}
                                  <p>
                                    <h5>£</h5>
                                    {Number(
                                      bid.attributes.propertyPrice
                                    ).toLocaleString("de-DE", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </p>{" "}
                                </span>
                                <span>
                                  Bid price:{" "}
                                  <p>
                                    <h5>£</h5>
                                    {Number(
                                      bid.attributes.bidPrice
                                    ).toLocaleString("de-DE", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </p>{" "}
                                </span>
                                <span>
                                  Date:{" "}
                                  <p>
                                    {new Date(
                                      bid.attributes.publishedAt
                                    ).toLocaleDateString()}
                                  </p>{" "}
                                </span>
                              </div>
                            </div>
                            <div className="my-bids__wrapper__item-holder__item__status">
                              <p>Status:</p>
                              <h3
                                className={`my-bids__wrapper__item-holder__item__status__${bid.attributes.bidStatus}`}
                              >
                                {bid.attributes.bidStatus}
                              </h3>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <MiniFooter />
    </div>
  );
}

export default MyBids;

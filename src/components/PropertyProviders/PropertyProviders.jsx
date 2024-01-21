import React, { useEffect, useState } from "react";
import "./PropertyProviders.scss";
import Slider from "react-slick";
import { AiFillStar } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineFullscreen } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { BiBox } from "react-icons/bi";
import CustomLeftArrow from "../../assets/chevron-left.png";
import CustomRightArrow from "../../assets/chevron-right.png";
import axios from "axios";
import { BsDot } from "react-icons/bs";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
function PropertyProviders({ care, careTitle }) {
  const [articles, setArticles] = useState([]);
  const jwt = useSelector((state) => state.user.jwt);
  const user = useSelector((state) => state.user.user);
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <img
        onClick={onClick}
        className={className}
        src={CustomLeftArrow}
        alt=""
        style={{ ...style, width: "75px", height: "75px", left: "-90px" }}
      />
    );
  }
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <img
        onClick={onClick}
        className={className}
        src={CustomRightArrow}
        alt=""
        style={{ ...style, width: "75px", height: "75px", right: "-90px" }}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    draggable: true,
    lazyLoad: "progressive",
    swipe: true,
  };

  useEffect(() => {
    async function fetchArticles() {
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_STRAPI_API_TOKEN}`,
        },
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}home-owner-listings?populate=*`,
          config
        );

        setArticles(response.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchArticles();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="property-providers">
      <div className="property-providers__top">
        <div className="property-providers__top__title">
          <h3>{careTitle ? careTitle : "Featured Property Providers"}</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. dolor{" "}
            <br></br>sit amet eiusmod tempor incididunt
          </p>
        </div>
        <button
          onClick={() =>
            navigate("/search/" + "all", {
              state: { all: true },
            })
          }
        >
          View All
        </button>
      </div>

      {articles?.length > 0 ? (
        <Slider {...settings}>
          {articles?.map((article, i) => (
            <div
              key={article?.id}
              style={{ height: jwt ? "auto" : "334px" }}
              className="property-providers__card "
            >
              <img
                onClick={() =>
                  navigate("/property/" + article?.id, {
                    state: { article: article },
                  })
                }
                src={
                  "http://localhost:1337" +
                  (article?.attributes?.gallery?.data[0]?.attributes?.formats
                    ?.large?.url ||
                    article?.attributes?.gallery?.data[0]?.attributes?.formats
                      ?.thumbnail?.url)
                }
                alt={article?.attributes?.title}
              />
              <h3>{article?.attributes?.title}</h3>
              <div className="property-providers__card__info">
                {jwt && (
                  <p
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
                    {user.selectUser === "Estate Agent / Landlord" &&
                      article?.attributes.propertyOwner}
                  </p>
                )}

                <span className="mb-4">
                  <AiFillStar color="orange" size={23} /> 4/5
                </span>
              </div>
              <div
                className={`property-providers__card__property ${
                  jwt && "mb-5"
                }`}
              >
                {care ? (
                  <>
                    {" "}
                    <p key={i}>
                      <BsDot size={40} color="lightgray" />
                      {article?.attributes?.TypeOfProperty}
                    </p>
                  </>
                ) : (
                  <>
                    {" "}
                    <p className={!care && "mb-3"}>
                      <CiLocationOn size={25} /> {article?.attributes?.Location}
                    </p>
                    <p className={!care && "mb-3"}>
                      <BiBox size={25} /> {article?.attributes?.TypeOfProperty}
                    </p>
                    <p className={!care && "mb-3"}>
                      <AiOutlineFullscreen size={25} />
                      {article?.attributes?.Radius}
                    </p>
                  </>
                )}
              </div>
              {jwt && (
                <button
                  onClick={() =>
                    navigate("/property/" + article?.id, {
                      state: { article: article },
                    })
                  }
                >
                  View Property
                </button>
              )}
            </div>
          ))}
        </Slider>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          {" "}
          <Loader size={100} />
        </div>
      )}
    </div>
  );
}

export default PropertyProviders;

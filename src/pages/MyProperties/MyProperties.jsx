import React, { useEffect, useState } from "react";
import "./MyProperties.scss";
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
import { BiLoaderAlt } from "react-icons/bi";
import axios from "axios";
import { useSelector } from "react-redux";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
function MyProperties() {
  const { search } = useParams();

  const [loaderState, setLoaderState] = useState("");

  const [propertyType, setPropertyType] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [sizeTerm, setSizeTerm] = useState("");
  const [filter1, setFilter1] = useState("");

  const jwt = useSelector((state) => state.user.jwt);
  const [articles, setArticles] = useState([]);
  async function fetchArticles() {
    try {
      const userData = localStorage.getItem("user");
      const { firstLastName, userId } = JSON.parse(userData);

      setLoaderState(true);
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}home-owner-listings?populate=*&filters[propertyOwnerId][$eq]=${userId}`,
        config // Pass the config object with headers
      );
      setLoaderState(false);

      setArticles(response.data.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoaderState(false);
    }
  }
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <div className="my-properties">
        <div className="my-properties__search__main__properties">
          <h3>My Properties</h3>
          {loaderState ? (
            <Loader size={100} />
          ) : articles?.length > 0 ? (
            articles.map((article) => {
              return (
                <PropertyCard article={article} fetchArticles={fetchArticles} />
              );
            })
          ) : (
            <p>You do not have any property</p>
            // <Loader size={100} />
          )}
          <div id="more">
            <button>Load More</button>
          </div>
        </div>
        <MiniFooter />
      </div>
    </>
  );
}

export default MyProperties;

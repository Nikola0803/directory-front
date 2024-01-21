import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Search.scss";
import filterIco from "../../assets/filter.png";
import navGrid from "../../assets/fontisto_nav-icon-grid.png";
import gridTwo from "../../assets/oi_grid-two-up.png";
import favorite from "../../assets/favorite.png";
import comment from "../../assets/comment.png";
import star from "../../assets/star.png";
import { toast } from "react-toastify";
import locationIcon from "../../assets/map-pin.png";
import file from "../../assets/file-text.png";
import typeProp from "../../assets/home.png";
import size from "../../assets/maximize.png";
import shuffle from "../../assets/shuffle.png";
import arrowRight from "../../assets/arrow-right.png";
import ImageGallery from "react-image-gallery";
import axios from "axios";
import { BiLoaderAlt } from "react-icons/bi";
import MiniFooter from "../../components/MiniFooter/MiniFooter";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
// import stylesheet if you're not already using CSS @import

function Search() {
  const { search } = useParams();
  const location = useLocation();
  const { all, filter } = location.state || {};
  const jwt = useSelector((state) => state.user.jwt);
  const user = useSelector((state) => state.user.user);
  const [propertyType, setPropertyType] = useState(
    filter?.selectedPropertyFilter ? filter.selectedPropertyFilter : ""
  );
  const [bedTerm, setBedTerm] = useState(filter?.bedType ? filter.bedType : "");

  const [radiusTerm, setRadiusTerm] = useState(
    filter?.radius ? filter?.radius : ""
  );
  const [hmoTerm, setHmoTerm] = useState(
    filter?.hmoType ? filter?.hmoType : ""
  );
  const [highestBid, setHighestBid] = useState("");
  const [overlay, setOverlay] = useState(false);
  const [bid, setBid] = useState(50);

  const [loaderState, setLoaderState] = useState(false);
  const [articles, setArticles] = useState([]);
  const [bidExists, setBidExists] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [locationTerm, setLocationTerm] = useState(all === true ? "" : search);
  const [radiusOptions, setRadiusOptions] = useState([]);

  const [beds, setBeds] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [houseShare, setHouseShare] = useState("Include");
  const [retirmentHome, setRetirmentHome] = useState("Include");
  const [mustHaveType, setMustHaveType] = useState("");
  const [keywords, setKeywords] = useState("");

  // const [searchTerm, setSearchTerm] = useState(search);
  const [selectedFurnishing, setSelectedFurnishing] = useState("Any");

  const handleFurnishingChange = (e) => {
    setSelectedFurnishing(e.target.value);
  };
  const [selectedAvailability, setSelectedAvailability] =
    useState("Available anytime");

  const handleAvailabilityChange = (e) => {
    setSelectedAvailability(e.target.value);
  };
  const handleKeywordsChange = (e) => {
    setKeywords(e.target.value);
  };
  const [selectedAddedToSite, setSelectedAddedToSite] = useState("Anytime");

  const handleAddedToSiteChange = (e) => {
    setSelectedAddedToSite(e.target.value);
  };
  useEffect(() => {
    const setOptions = () => {
      const url = `${process.env.REACT_APP_API_URL}home-owner-listings?populate=*`;
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
            const radiuses = response.data.data.map((rad) => {
              return rad.attributes.Radius;
            });

            // Create a Set to remove duplicates
            const uniqueRadiuses = new Set(radiuses);

            // Convert the Set back to an array
            const uniqueRadiusesArray = Array.from(uniqueRadiuses);

            // Set the uniquePropsArray as your state variable
            setRadiusOptions(uniqueRadiusesArray);

            const bdrms = response.data.data.map((bdrm) => {
              return bdrm.attributes.beds;
            });

            // Create a Set to remove duplicates
            const uniqueBeds = new Set(bdrms);

            // Convert the Set back to an array
            const uniqueBedsArray = Array.from(uniqueBeds);

            // Set the uniquePropsArray as your state variable
            setBeds(uniqueBedsArray);
          })
          .catch((error) => {
            // Handle errors here

            console.error("Error:", error?.response?.data?.error?.message);
          });
      } catch (error) {
        // Handle any exceptions that might occur

        console.error("Exception:", error);
      }
    };

    setOptions();
  }, []);

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
  const navigate = useNavigate();
  function onChangeBid(e) {
    if (Number(e.target.value) + bid < Number(e.target.value)) {
      return;
    }
    const num = Number(e.target.value);
    setBid(num);
  }
  function resetFilter() {
    setPropertyType(
      filter?.selectedPropertyFilter ? filter.selectedPropertyFilter : ""
    );
    setBedTerm(filter?.bedType ? filter.bedType : "");

    setRadiusTerm(filter?.radius ? filter?.radius : "");
    setHmoTerm(filter?.hmoType ? filter?.hmoType : "");
    setHighestBid("");
    setOverlay(false);
    setBid(50);

    setArticles([]);

    setSelectedProperty(null);
    setSelectedAddedToSite("Anytime");
    setSelectedAvailability("Available anytime");
    setLocationTerm(all === true ? "" : search);
    // setRadiusOptions([]);

    // setBeds([]);
    setMinPrice("");
    setMaxPrice("");
    setHouseShare("Include");
    setRetirmentHome("Include");
    setMustHaveType("");
    setKeywords("");

    setSelectedFurnishing("Any");
  }
  const handleSearch = (e) => {
    setLoaderState(true);
    let url = `${process.env.REACT_APP_API_URL}home-owner-listings?filters[Location][$contains]=${locationTerm}&populate=*`;

    if (propertyType.length !== 0) {
      // Map the propertyType array to a string of parameters
      console.log(propertyType);
      const propertyTypeParams = propertyType
        .map((type) => `filters[TypeOfProperty][$eq]=${type.value}`)
        .join("&");

      // Add the propertyTypeParams to the URL
      url += `&${propertyTypeParams}`;
    }

    if (hmoTerm) {
      url += `&filters[HMOreadiness][$eq]=${hmoTerm}`;
    }
    if (radiusTerm) {
      url += `&filters[Radius][$eq]=${radiusTerm}`;
    }

    if (bedTerm) {
      url += `&filters[beds][$eq]=${bedTerm}`;
    }
    if (houseShare === "Include") {
      url += `&filters[TypeOfProperty2][$eq]=House share`;
    }
    if (retirmentHome === "Include") {
      url += `&filters[TypeOfProperty2][$eq]=Retirement homes`;
    }
    if (retirmentHome === "Exclude" && houseShare === "Exclude") {
      url += `&filters[TypeOfProperty2][$eq]=`;
    }
    if (mustHaveType) {
      let ar = mustHaveType
        .map((option) => option.value)
        .join(",")
        .split(",");
      ar.map((a) => {
        url += `&filters[mustHave][$contains]=${a}`;
      });
      // url += `&filters[mustHave][$contains]=${mustHaveType
      //   .map((option) => option.value)
      //   .join(",")}`;
    }
    if (selectedFurnishing !== "Any") {
      url += `&filters[furnishing][$eq]=${selectedFurnishing}`;
    }
    if (selectedAvailability !== "Available anytime") {
      url += `&filters[availability][$eq]=${selectedAvailability}`;
    }
    if (keywords) {
      url += `&filters[$or][0][title][$contains]=${keywords}&filters[$or][1][Explanation][$contains]=${keywords}&filters[$or][2][Explanation2][$contains]=${keywords}&filters[$or][3][Explanation3][$contains]=${keywords}&filters[$or][4][Description3][$contains]=${keywords}&filters[$or][5][ExplanationTitle][$contains]=${keywords}&filters[$or][6][Title3][$contains]=${keywords}&filters[$or][7][Description][$contains]=${keywords}`;
    }
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
          let article = response.data.data;
          console.log(article);
          // if (selectedAvailability === "Anytime") {
          //   article = response.data.data;
          // }
          if (minPrice) {
            // Only minPrice exists, filter articles with price greater than or equal to minPrice
            const filteredArticles = response.data.data.filter((article) => {
              const articlePrice = article.attributes.price; // Replace 'price' with the actual property name in your data
              return articlePrice >= Number(minPrice);
            });

            // Now, filteredArticles contains articles with price above minPrice, set it as your new list
            article = filteredArticles;
            // setArticles(filteredArticles);
          }
          if (maxPrice) {
            // Only maxPrice exists, filter articles with price less than or equal to maxPrice
            const filteredArticles = response.data.data.filter((article) => {
              const articlePrice = article.attributes.price; // Replace 'price' with the actual property name in your data
              return articlePrice <= Number(maxPrice);
            });

            // Now, filteredArticles contains articles with price below maxPrice, set it as your new list
            article = filteredArticles;
            // setArticles(filteredArticles);
          }
          if (minPrice && maxPrice) {
            // Both minPrice and maxPrice exist, sort by price range
            const sortedArticles = response.data.data.filter((article) => {
              const articlePrice = article.attributes.price; // Replace 'price' with the actual property name in your data
              return (
                articlePrice >= Number(minPrice) &&
                articlePrice <= Number(maxPrice)
              );
            });

            // Now, sortedArticles contains articles within the price range, you can set it as your new list
            article = sortedArticles;
            // setArticles(sortedArticles);
          }

          if (selectedAddedToSite === "Last 3 days") {
            const today = new Date(); // Current date
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(today.getDate() - 3); // Calculate date 3 days ago

            const propertiesFromLast3Days = article.filter((property) => {
              // Convert createdAt to a Date object
              const createdAtDate = new Date(property.attributes.createdAt);

              // Check if createdAtDate is greater than or equal to three days ago
              return createdAtDate >= threeDaysAgo;
            });
            article = propertiesFromLast3Days;
          }
          if (selectedAddedToSite === "Last 24 hours") {
            const today = new Date(); // Current date
            const twentyFourHoursAgo = new Date(
              today.getTime() - 24 * 60 * 60 * 1000
            ); // 24 hours ago

            const propertiesFromLast24Hours = article.filter((property) => {
              // Convert createdAt to a Date object
              const createdAtDate = new Date(property.attributes.createdAt);

              // Check if createdAtDate is greater than or equal to 24 hours ago
              return createdAtDate >= twentyFourHoursAgo;
            });
            article = propertiesFromLast24Hours;
          }

          if (selectedAddedToSite === "Last 14 days") {
            const today = new Date(); // Current date
            const fourteenDaysAgo = new Date(
              today.getTime() - 14 * 24 * 60 * 60 * 1000
            ); // 14 days ago

            const propertiesFromLast14Days = article.filter((property) => {
              // Convert createdAt to a Date object
              const createdAtDate = new Date(property.attributes.createdAt);

              // Check if createdAtDate is greater than or equal to 14 days ago
              return createdAtDate >= fourteenDaysAgo;
            });
            article = propertiesFromLast14Days;
          }

          if (selectedAddedToSite === "Last 7 days") {
            const today = new Date(); // Current date
            const sevenDaysAgo = new Date(
              today.getTime() - 7 * 24 * 60 * 60 * 1000
            ); // 7 days ago

            const propertiesFromLast7Days = article.filter((property) => {
              // Convert createdAt to a Date object
              const createdAtDate = new Date(property.attributes.createdAt);

              // Check if createdAtDate is greater than or equal to 7 days ago
              return createdAtDate >= sevenDaysAgo;
            });
            article = propertiesFromLast7Days;
          }

          if (selectedAddedToSite === "Last 30 days") {
            const today = new Date(); // Current date
            const thirtyDaysAgo = new Date(
              today.getTime() - 30 * 24 * 60 * 60 * 1000
            ); // 30 days ago

            const propertiesFromLast30Days = article.filter((property) => {
              // Convert createdAt to a Date object
              const createdAtDate = new Date(property.attributes.createdAt);

              // Check if createdAtDate is greater than or equal to 30 days ago
              return createdAtDate >= thirtyDaysAgo;
            });
            article = propertiesFromLast30Days;
          }
          // Neither minPrice nor maxPrice exists, no filtering needed
          setArticles(article ? article : response.data.data);

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
  useEffect(() => {
    handleSearch();
  }, [
    propertyType,
    radiusTerm,
    locationTerm,
    hmoTerm,
    bedTerm,
    minPrice,
    maxPrice,
    houseShare,
    retirmentHome,
    mustHaveType,
    selectedFurnishing,
    selectedAvailability,
    selectedAddedToSite,
    keywords,
  ]);

  const handlePropertyTypeChange = (selectedOptions) => {
    setPropertyType(selectedOptions);
  };

  const handleMustHaveTypeChange = (mustHave) => {
    setMustHaveType(mustHave);
  };

  const handleLocationChange = (event) => {
    const inputValue = event.target.value;

    // Define a regular expression to match the characters you want to check
    const regex = /[!@#\$%\^&*()_+{}\[\]:;"'<>,.?\/\\|`~\-=]/;

    console.log("tes");
    if (regex.test(inputValue)) {
      // Display a toast error if any of the specified characters are found
      toast.error("Invalid character found in location");
      return;
    } else {
      // Update the location term if no invalid characters are found
      setLocationTerm(inputValue);
    }
  };

  const handleHmoChange = (event) => {
    setHmoTerm(event.target.value);
  };

  const handleRadiusChange = (event) => {
    setRadiusTerm(event.target.value);
  };

  const handleBedChange = (event) => {
    setBedTerm(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  function savePropertyValues(article) {
    if (!jwt) {
      navigate("/login");
      return;
    }
    setOverlay(true);
    setSelectedProperty(article);
  }
  useEffect(() => {
    document.body.style.overflow = overlay ? "hidden" : "auto";
    setBidExists(false);
  }, [overlay]);
  const handleOverlayClick = (e) => {
    // Check if the clicked element is the overlay itself
    if (e.target.classList.contains("search-popup-overlay")) {
      // Close the overlay
      setOverlay(false);
    }
  };

  function checkBidCreated(e, id) {
    e.preventDefault();
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
  useEffect(() => {
    function getHighestBid() {
      setHighestBid("");
      const url = `${process.env.REACT_APP_API_URL}bids?filters[propertyId][$eq]=${selectedProperty.id}&populate=*
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
    selectedProperty && getHighestBid();
  }, [selectedProperty]);
  function createBid(e, article) {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure that you want to create a bid for this property?"
      )
    ) {
      document.body.style.overflow = "auto";
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
  return (
    <>
      {overlay && selectedProperty && (
        <>
          <div
            className="search-popup-overlay"
            onClick={(e) => handleOverlayClick(e)}
          >
            <div className="search-popup-overlay__wrapper">
              <div className="search-popup-overlay__wrapper__img col-4">
                <ImageGallery
                  showPlayButton={false}
                  showFullscreenButton={false}
                  showBullets
                  items={selectedProperty?.attributes.gallery.data.map(
                    (item) => ({
                      original:
                        "http://localhost:1337" +
                        item.attributes.formats.thumbnail.url,
                      thumbnail:
                        "http://localhost:1337" +
                        item.attributes.formats.thumbnail.url, // You can use the same URL for thumbnails or customize as needed
                    })
                  )}
                  showThumbnails={false}
                />
              </div>
              <div className="search-popup-overlay__wrapper__info col-7">
                <div>
                  <div className="search-popup-overlay__wrapper__info__title">
                    <h3>{selectedProperty?.attributes.title}</h3>
                    <div className="search-popup-overlay__wrapper__info__title__icons">
                      <div>
                        <img src={comment} alt="" />
                      </div>
                      <div>
                        <img src={favorite} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="search-popup-overlay__wrapper__info__provider-review">
                    {jwt && user.selectUser === "Estate Agent / Landlord" && (
                      <span>{selectedProperty?.attributes.propertyOwner}</span>
                    )}

                    <p>
                      <img src={star} alt="" />
                      4.5 - <span>20 reviews</span>
                    </p>
                  </div>
                  <div className="search-popup-overlay__wrapper__info__icons">
                    <span>
                      <img src={locationIcon} alt="" />{" "}
                      {selectedProperty?.attributes?.Location}
                    </span>
                    <span>
                      <img src={typeProp} alt="" />{" "}
                      {selectedProperty?.attributes?.propertyType}
                    </span>
                    <span>
                      <img src={size} alt="" />{" "}
                      {selectedProperty?.attributes?.Radius}
                    </span>
                    <span>
                      <img src={shuffle} alt="" />{" "}
                      {selectedProperty?.attributes?.HMOreadiness}
                    </span>
                  </div>
                  <div className="search-popup-overlay__wrapper__info__description">
                    <p>
                      {selectedProperty?.attributes?.Description}
                      <br></br>
                      <br></br>
                      {selectedProperty?.attributes?.Description3}
                    </p>
                  </div>
                  <div className="search-popup-overlay__wrapper__info__bid">
                    <h5>Enter your Bid</h5>
                    <div className="search-popup-overlay__wrapper__info__bid__wrapper">
                      {bidExists ? (
                        <p>You already created a bid for this property.</p>
                      ) : (
                        <>
                          <span onClick={() => changeBid("minus")}>-</span>
                          <div className="search-popup-overlay__wrapper__info__bid__wrapper__input">
                            <span>£</span>
                            <input
                              onChange={onChangeBid}
                              type="text"
                              placeholder="Bid..."
                              value={
                                bid +
                                Number(
                                  highestBid
                                    ? highestBid
                                    : selectedProperty?.attributes?.price
                                )
                              }
                            />
                          </div>
                          <span onClick={() => changeBid("plus")}>+</span>
                          <button
                            onClick={(e) => createBid(e, selectedProperty)}
                          >
                            Place a Bid
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="search-popup-overlay__wrapper__info__footer">
                    <span
                      onClick={() => {
                        document.body.style.overflow = "auto";
                        navigate("/property/" + selectedProperty?.id);
                      }}
                    >
                      View Property <img src={arrowRight} alt="" />
                    </span>
                    {highestBid ? (
                      <p>Current highest Bid is: {highestBid} £ </p>
                    ) : (
                      <p>There are no bids for this property</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="search">
        <SearchFilter
          propertyType={propertyType}
          handlePropertyTypeChange={handlePropertyTypeChange}
          locationTerm={locationTerm}
          handleLocationChange={handleLocationChange}
          radiusTerm={radiusTerm}
          handleRadiusChange={handleRadiusChange}
          handleHmoChange={handleHmoChange}
          hmoTerm={hmoTerm}
          radiusesOptions={radiusOptions}
          bedTerm={bedTerm}
          handleBedChange={handleBedChange}
          beds={beds}
          minPrice={minPrice}
          maxPrice={maxPrice}
          handleMaxPriceChange={handleMaxPriceChange}
          handleMinPriceChange={handleMinPriceChange}
          handleMustHaveTypeChange={handleMustHaveTypeChange}
          mustHaveType={mustHaveType}
          houseShare={houseShare}
          retirmentHome={retirmentHome}
          setHouseShare={setHouseShare}
          setRetirmentHome={setRetirmentHome}
          selectedFurnishing={selectedFurnishing}
          handleFurnishingChange={handleFurnishingChange}
          selectedAvailability={selectedAvailability}
          handleAvailabilityChange={handleAvailabilityChange}
          selectedAddedToSite={selectedAddedToSite}
          handleAddedToSiteChange={handleAddedToSiteChange}
          handleKeywordsChange={handleKeywordsChange}
          keywords={keywords}
          resetFilter={resetFilter}
        />
        <div className="search__main">
          <div className="search__main__top">
            <div className="search__main__top__left">
              <span>DEFAULT</span>
              <p>&nbsp;-&nbsp;</p>
              <span className="search__main__top__left__active">
                POPULARITY
              </span>
              <p>&nbsp;-&nbsp;</p>
              <span>NEWNESS</span>
              <p>&nbsp;-&nbsp;</p>
              <span>BEST RATING</span>
            </div>
            <div className="search__main__top__right">
              <img src={gridTwo} alt="" />
              <img src={navGrid} alt="" />
            </div>
          </div>
          <div className="search__main__properties">
            {!loaderState ? (
              articles?.length > 0 ? (
                articles.map((article) => (
                  <PropertyCard
                    article={article}
                    savePropertyValues={savePropertyValues}
                    fetchArticles={handleSearch}
                    checkBidCreated={checkBidCreated}
                  />
                ))
              ) : (
                <p>No results found.</p>
              )
            ) : (
              <Loader size={100} />
            )}

            <div id="more">
              <button>Load More</button>
            </div>
          </div>
        </div>
        <MiniFooter />
      </div>
    </>
  );
}

export default Search;

import React, { useState } from "react";
import "./LandingSearch.scss";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Select from "react-select";

function LandingSearch() {
  const [locationTerm, setLocationTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const [hmoType, setHmoType] = useState("");
  const [bedType, setBedType] = useState("");

  const [radius, setRadius] = useState("");
  const [beds, setBeds] = useState([]);
  const [radiuses, setRadiuses] = useState([]);
  const properties = [
    { value: "Detached", label: "Detached" },
    { value: "Semi-detached", label: "Semi-detached" },
    { value: "Terraced", label: "Terraced" },
    { value: "Flats", label: "Flats" },
    { value: "Bungalows", label: "Bungalows" },
    { value: "Farms/land", label: "Farms/land" },
    { value: "Park homes", label: "Park homes" },
  ];
  const handlePropertyTypeChange = (selectedOptions) => {
    setPropertyType(selectedOptions);
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
  const handleBedChange = (event) => {
    setBedType(event.target.value);
  };

  const handleHmoChange = (event) => {
    setHmoType(event.target.value);
  };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
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
            const radiuses = response.data.data.map((size) => {
              return size.attributes.Radius;
            });

            // Create a Set to remove duplicates
            const uniqueRadiuses = new Set(radiuses);

            // Convert the Set back to an array
            const uniqueRadiusesArray = Array.from(uniqueRadiuses);

            // Set the uniquePropsArray as your state variable
            setRadiuses(uniqueRadiusesArray);

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

  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (locationTerm.length <= 3) {
      toast.error("Search value should be higher than 3");
      return;
    }
    console.log(propertyType);
    navigate("/search/" + locationTerm, {
      state: {
        filter: {
          radius,
          hmoType,
          selectedPropertyFilter: propertyType,
          bedType,
        },
      },
    });
  };

  return (
    <div className="landing-search">
      <div className="landing-search__wrapper">
        <div className="landing-search__wrapper__top">
          <h3>Your Care Property Solutions, Simplified.</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut <br></br>labore et dolore magna aliqua.
            dolor sit amet eiusmod tempor incididunt
          </p>
        </div>
        <div className="landing-search__wrapper__search d-flex">
          <div className="landing-search__wrapper__search__holder landing-search__wrapper__search__holder--line col-3">
            <label htmlFor="search">Search Location</label>
            <input
              type="text"
              name="search"
              placeholder="Location term"
              value={locationTerm}
              onChange={handleLocationChange}
            />
          </div>
          <div className="landing-search__wrapper__search__holder col-2 landing-search__wrapper__search__holder--line">
            <label htmlFor="propertyType">Type of Property</label>
            <Select
              isMulti
              value={propertyType}
              name="colors"
              onChange={handlePropertyTypeChange}
              options={properties}
              closeMenuOnSelect={false}
              isClearable={true}
              placeholder={`Please select...`}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="landing-search__wrapper__search__holder col-2 landing-search__wrapper__search__holder--line">
            <label htmlFor="size">Radius</label>
            <select
              name="radius"
              id="radius"
              value={radius}
              onChange={handleRadiusChange}
            >
              <option value="">Please select...</option>
              {radiuses?.map((size) => {
                return <option value={size}>{size}</option>;
              })}
            </select>
          </div>
          <div className="landing-search__wrapper__search__holder col-2 landing-search__wrapper__search__holder--line">
            <label htmlFor="hmo">HMO</label>
            <select
              name="hmo"
              id="hmo"
              value={hmoType}
              onChange={handleHmoChange}
            >
              <option value="">Please select...</option>
              <option value="Licensed">Licensed</option>
              <option value="Compliant">Compliant</option>
            </select>
          </div>

          <div className="landing-search__wrapper__search__holder col-2 ">
            <label htmlFor="bedroom">Bedrooms</label>
            <select
              name="bedroom"
              id="bedroom"
              value={bedType}
              onChange={handleBedChange}
            >
              <option value="">Please select...</option>
              {beds?.map((bedroom) => {
                return <option value={bedroom}>{bedroom}</option>;
              })}
            </select>
          </div>

          <div className="col-1 d-flex justify-content-end  align-items-center">
            <button onClick={handleSearch}>
              <BsSearch size={20} />
            </button>
          </div>
        </div>
        <div className="landing-search__wrapper__options">
          <ul>
            <li>
              <a href="#">Newest</a>
            </li>
            <li>
              <a href="#">Popular</a>
            </li>
            <li>
              <a href="#">Best Rating</a>
            </li>
            <li>
              <a href="#">Quick Filter #1</a>
            </li>
            <li>
              <a href="#">Quick Filter #1</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LandingSearch;

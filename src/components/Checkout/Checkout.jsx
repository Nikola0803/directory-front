import "./Checkout.scss";
import React, { useEffect, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { BiShow } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { BiHide } from "react-icons/bi";
import axios from "axios";
import logo from "../../assets/logo.png";
import Select from "react-select";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-toastify";

function Checkout() {
  const locations = useLocation();
  const subId = locations.state?.subId;
  const email = locations.state?.email;
  const firstLastName = locations.state?.firstLastName;
  const password = locations.state?.password;
  const selectUser = locations.state?.selectUser;

  const navigate = useNavigate();

  // Define state variables for each input field
  const [street, setStreet] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false); // Assuming it's a checkbox
  const [location, setLocation] = useState(""); // State for the first select field
  const [selectedLocations, setSelectedLocations] = useState([]); // State for selected locations in the second select field
  const [description, setDescription] = useState("");
  // Define options for the first select field
  const locationOptions = ["London", "Others"];

  // Define options for the second select field based on the first select field's choice
  const londonOptions = [
    {
      value: "City of London Corporation",
      label: "City of London Corporation",
    },
    { value: "Westminster City Council", label: "Westminster City Council" },
    {
      value: "Kensington and Chelsea Borough Council",
      label: "Kensington and Chelsea Borough Council",
    },
    {
      value: "Hammersmith and Fulham Borough Council",
      label: "Hammersmith and Fulham Borough Council",
    },
    {
      value: "Wandsworth Borough Council",
      label: "Wandsworth Borough Council",
    },
    { value: "Lambeth Borough Council", label: "Lambeth Borough Council" },
    { value: "Southwark Borough Council", label: "Southwark Borough Council" },
    {
      value: "Tower Hamlets Borough Council",
      label: "Tower Hamlets Borough Council",
    },
    { value: "Hackney Borough Council", label: "Hackney Borough Council" },
    { value: "Islington Borough Council", label: "Islington Borough Council" },
    { value: "Camden Borough Council", label: "Camden Borough Council" },
    { value: "Brent Borough Council", label: "Brent Borough Council" },
    { value: "Ealing Borough Council", label: "Ealing Borough Council" },
    { value: "Hounslow Borough Council", label: "Hounslow Borough Council" },
    {
      value: "Richmond upon Thames Borough Council",
      label: "Richmond upon Thames Borough Council",
    },
    {
      value: "Kingston upon Thames Borough Council",
      label: "Kingston upon Thames Borough Council",
    },
    { value: "Merton Borough Council", label: "Merton Borough Council" },
    { value: "Sutton Borough Council", label: "Sutton Borough Council" },
    { value: "Croydon Borough Council", label: "Croydon Borough Council" },
    { value: "Bromley Borough Council", label: "Bromley Borough Council" },
    { value: "Lewisham Borough Council", label: "Lewisham Borough Council" },
    { value: "Greenwich Borough Council", label: "Greenwich Borough Council" },
    { value: "Bexley Borough Council", label: "Bexley Borough Council" },
    { value: "Havering Borough Council", label: "Havering Borough Council" },
    {
      value: "Barking and Dagenham Borough Council",
      label: "Barking and Dagenham Borough Council",
    },
    { value: "Redbridge Borough Council", label: "Redbridge Borough Council" },
    { value: "Newham Borough Council", label: "Newham Borough Council" },
    {
      value: "Waltham Forest Borough Council",
      label: "Waltham Forest Borough Council",
    },
    { value: "Haringey Borough Council", label: "Haringey Borough Council" },
    { value: "Enfield Borough Council", label: "Enfield Borough Council" },
    { value: "Barnet Borough Council", label: "Barnet Borough Council" },
    { value: "Harrow Borough Council", label: "Harrow Borough Council" },
    {
      value: "Hillingdon Borough Council",
      label: "Hillingdon Borough Council",
    },
    // Add more London options as needed
  ];

  const otherOptions = [
    { value: "Birmingham City Council", label: "Birmingham City Council" },
    { value: "Manchester City Council", label: "Manchester City Council" },
    { value: "Leeds City Council", label: "Leeds City Council" },
    { value: "Glasgow City Council", label: "Glasgow City Council" },
    { value: "Liverpool City Council", label: "Liverpool City Council" },
    { value: "Sheffield City Council", label: "Sheffield City Council" },
    { value: "Bristol City Council", label: "Bristol City Council" },
    { value: "Edinburgh City Council", label: "Edinburgh City Council" },
    { value: "Nottingham City Council", label: "Nottingham City Council" },
    { value: "Newcastle City Council", label: "Newcastle City Council" },
    { value: "Cardiff City Council", label: "Cardiff City Council" },
    { value: "Southampton City Council", label: "Southampton City Council" },
    { value: "Coventry City Council", label: "Coventry City Council" },
    { value: "Leicester City Council", label: "Leicester City Council" },
    { value: "Bradford City Council", label: "Bradford City Council" },
    {
      value: "Kingston upon Hull City Council",
      label: "Kingston upon Hull City Council",
    },
    {
      value: "Wolverhampton City Council",
      label: "Wolverhampton City Council",
    },
    {
      value: "Stoke-on-Trent City Council",
      label: "Stoke-on-Trent City Council",
    },
    { value: "Plymouth City Council", label: "Plymouth City Council" },
    { value: "Derby City Council", label: "Derby City Council" },
    { value: "Kirklees Council", label: "Kirklees Council" },
    { value: "North Lanarkshire Council", label: "North Lanarkshire Council" },
    { value: "Wigan Council", label: "Wigan Council" },
    { value: "Doncaster Council", label: "Doncaster Council" },
    {
      value: "Stockport Metropolitan Borough Council",
      label: "Stockport Metropolitan Borough Council",
    },
    {
      value: "Sandwell Metropolitan Borough Council",
      label: "Sandwell Metropolitan Borough Council",
    },
    { value: "Wakefield Council", label: "Wakefield Council" },
    { value: "Sefton Council", label: "Sefton Council" },
    { value: "South Lanarkshire Council", label: "South Lanarkshire Council" },
    {
      value: "Barnsley Metropolitan Borough Council",
      label: "Barnsley Metropolitan Borough Council",
    },
    {
      value: "Staffordshire County Council",
      label: "Staffordshire County Council",
    },
    { value: "Devon County Council", label: "Devon County Council" },
    { value: "Essex County Council", label: "Essex County Council" },
    { value: "Norfolk County Council", label: "Norfolk County Council" },
    { value: "Suffolk County Council", label: "Suffolk County Council" },
    {
      value: "Hertfordshire County Council",
      label: "Hertfordshire County Council",
    },
    { value: "Kent County Council", label: "Kent County Council" },
    { value: "Hampshire County Council", label: "Hampshire County Council" },
    {
      value: "West Sussex County Council",
      label: "West Sussex County Council",
    },
    { value: "Surrey County Council", label: "Surrey County Council" },
    {
      value: "Oxfordshire County Council",
      label: "Oxfordshire County Council",
    },
    {
      value: "Buckinghamshire County Council",
      label: "Buckinghamshire County Council",
    },
    {
      value: "Cambridgeshire County Council",
      label: "Cambridgeshire County Council",
    },
    {
      value: "Northamptonshire County Council",
      label: "Northamptonshire County Council",
    },
    {
      value: "Lincolnshire County Council",
      label: "Lincolnshire County Council",
    },
    { value: "Dorset County Council", label: "Dorset County Council" },
    { value: "Somerset County Council", label: "Somerset County Council" },
    {
      value: "Gloucestershire County Council",
      label: "Gloucestershire County Council",
    },
    {
      value: "Warwickshire County Council",
      label: "Warwickshire County Council",
    },
    {
      value: "Worcestershire County Council",
      label: "Worcestershire County Council",
    },
    { value: "Shropshire County Council", label: "Shropshire County Council" },
    {
      value: "Herefordshire County Council",
      label: "Herefordshire County Council",
    },
    { value: "Cheshire East Council", label: "Cheshire East Council" },
    { value: "Lancashire County Council", label: "Lancashire County Council" },
    { value: "Cumbria County Council", label: "Cumbria County Council" },
    {
      value: "North Yorkshire County Council",
      label: "North Yorkshire County Council",
    },
    {
      value: "East Riding of Yorkshire Council",
      label: "East Riding of Yorkshire Council",
    },
    { value: "Durham County Council", label: "Durham County Council" },
    {
      value: "Tyne and Wear County Council",
      label: "Tyne and Wear County Council",
    },
    { value: "Scottish Borders Council", label: "Scottish Borders Council" },
    { value: "Fife Council", label: "Fife Council" },
    { value: "Renfrewshire Council", label: "Renfrewshire Council" },
    { value: "East Ayrshire Council", label: "East Ayrshire Council" },
    {
      value: "West Dunbartonshire Council",
      label: "West Dunbartonshire Council",
    },
    {
      value: "Carmarthenshire County Council",
      label: "Carmarthenshire County Council",
    },
    {
      value: "Pembrokeshire County Council",
      label: "Pembrokeshire County Council",
    },
    { value: "Gwynedd Council", label: "Gwynedd Council" },
    {
      value: "Conwy County Borough Council",
      label: "Conwy County Borough Council",
    },
    {
      value: "Isle of Anglesey County Council",
      label: "Isle of Anglesey County Council",
    },
    {
      value: "Rhondda Cynon Taf County Borough Council",
      label: "Rhondda Cynon Taf County Borough Council",
    },
    {
      value: "Swansea City and County Council",
      label: "Swansea City and County Council",
    },
    // Add more options as needed
  ];
  // Function to handle the change in the first select field
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setSelectedLocations([]); // Clear selected locations when the first select changes
  };
  const maxSelections = 3;
  // Function to handle the change in the second select field

  const handleSelectedLocationsChange = (selectedOptions) => {
    if (selectedOptions.length <= maxSelections) {
      setSelectedLocations(selectedOptions);
    }
  };
  // Create handleChange functions for each input field
  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleBirthDate = (e) => {
    setBirthDate(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handlePostalChange = (e) => {
    setPostal(e.target.value);
  };

  const handleCountryChange = (value) => {
    setCountry(value);
  };

  const handleRegionChange = (value) => {
    setRegion(value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAgreeTermsChange = (e) => {
    setAgreeTerms(e.target.checked);
  };

  function errorHandling() {
    if (!agreeTerms) {
      toast.error("You haven't accepted the terms !");
      return;
    }
    if (!street) {
      toast.error("Please enter a street name !");
      return;
    }
    if (!postal) {
      toast.error("Please enter a postal code !");
      return;
    }
    if (!country) {
      toast.error("Please select a country !");
      return;
    }
    if (!region) {
      toast.error("Please select a region !");
      return;
    }
    if (!city) {
      toast.error("Please enter a city !");
      return;
    }
    if (selectUser === "Care Provider") {
      if (!location || !selectedLocations) {
        toast.error("Please enter a location !");
        return;
      }
    }

    if (!phone) {
      toast.error("Please enter a phone number !");
      return;
    }
    if (!birthDate) {
      toast.error("Please enter a birth date !");
      return;
    }
    if (!description) {
      toast.error("Please enter a description !");
      return;
    }
  }

  function draftUserApi(e) {
    e.preventDefault();
    errorHandling();
    const selectedLocationValues = selectedLocations.map(
      (location) => location.value
    );
    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        firstLastName,
        password,
        street,
        postal,
        country,
        region,
        phone,
        city,
        birthDate,
        location,
        selectedLocations: selectedLocationValues,
        description,
        selectUser,
      })
    );
    const url = `${process.env.REACT_APP_API_URL}order/stripe-webhook`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "bearer " + process.env.REACT_APP_STRAPI_API_TOKEN,
    };

    try {
      // Make a GET request using Axios with headers
      axios
        .post(
          url,
          {
            email,
            firstLastName,
            password,
            street,
            postal,
            country,
            region,
            phone,
            city,
            birthDate,
            location,
            selectedLocations: selectedLocationValues,
            selectUser,
          },
          { headers }
        )
        .then((response) => {
          // Handle the response data here
          // setUrl(response.data.url);
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error:", error);
        });
    } catch (error) {
      // Handle any exceptions that might occur
      console.error("Exception:", error);
    }
  }

  function stripeApi(e) {
    e.preventDefault();
    errorHandling();

    const url = `http://localhost:1337/strapi-stripe/getRedirectUrl/${subId}/${email}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "bearer " + process.env.REACT_APP_STRAPI_API_TOKEN,
    };

    try {
      // Make a GET request using Axios with headers
      axios
        .get(url, { headers })
        .then((response) => {
          // Handle the response data here
          // setUrl(response.data.url);
          window.location.href = response.data.url;
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error:", error);
        });
    } catch (error) {
      // Handle any exceptions that might occur
      console.error("Exception:", error);
    }
  }

  useEffect(() => {
    if (!email || !password || !firstLastName || !subId) {
      navigate("/register");
    }
  }, [email, password, firstLastName, subId]);

  return (
    <div className="checkout">
      <div className="checkout__back">
        <AiOutlineArrowLeft size={30} onClick={() => navigate("/register")} />
      </div>
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-5 m-4 checkout__wrapper">
            {/* <img src={logo} alt="" /> */}
            <h3>Finishing Registration</h3>
            <p>Enter your info to continue</p>
            <div className="checkout__wrapper__form">
              <form action="" method="post">
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={street}
                  onChange={handleStreetChange}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
                <div className="checkout__wrapper__form__half">
                  <input
                    type={"number"}
                    name="postal"
                    placeholder="Postal Code"
                    value={postal}
                    onChange={handlePostalChange}
                  />
                  <CountryDropdown
                    value={country}
                    onChange={handleCountryChange}
                  />
                </div>
                <div className="checkout__wrapper__form__half">
                  <RegionDropdown
                    country={country}
                    value={region}
                    onChange={handleRegionChange}
                  />
                  <input
                    type={"text"}
                    name="city"
                    placeholder="City"
                    value={city}
                    onChange={handleCity}
                  />
                </div>

                {selectUser === "Care Provider" && (
                  <div>
                    <select
                      id="location"
                      value={location}
                      onChange={handleLocationChange}
                    >
                      <option value="">
                        Which councils are you working with or interested in
                      </option>
                      {locationOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {location === "London" && (
                      <Select
                        isMulti
                        value={selectedLocations}
                        name="colors"
                        onChange={handleSelectedLocationsChange}
                        options={londonOptions}
                        closeMenuOnSelect={false}
                        isClearable={true}
                        placeholder={`Select up to ${maxSelections} options...`}
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    )}

                    {location === "Others" && (
                      <Select
                        isMulti
                        value={selectedLocations}
                        name="colors"
                        onChange={handleSelectedLocationsChange}
                        options={otherOptions}
                        closeMenuOnSelect={false}
                        isClearable={true}
                        placeholder={`Select up to ${maxSelections} options...`}
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    )}
                  </div>
                )}

                <input
                  type={"text"}
                  name="phone"
                  placeholder="Phone number (start with +)"
                  value={phone}
                  onChange={handlePhoneChange}
                />

                <input
                  type={"date"}
                  name="birthday"
                  placeholder="Birth day"
                  value={birthDate}
                  onChange={handleBirthDate}
                />

                <div className="checkout__wrapper__form__checkbox">
                  <input
                    id="custom-checkbox"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={handleAgreeTermsChange}
                  />
                  <label for="custom-checkbox"></label>
                  <span htmlFor="custom-checkbox">
                    {" "}
                    Agree with Terms & Condition.
                  </span>
                </div>
                <button
                  className="css style SS_ProductCheckout mb-3"
                  data-id={subId}
                  data-email={email}
                  data-url="http://localhost:1337"
                  onClick={(e) => {
                    // localStorage.setItem("password", password);
                    // pushObject(e);
                    errorHandling();
                    stripeApi(e);
                    draftUserApi(e);
                  }}
                >
                  {" "}
                  Checkout
                </button>
                {/* <div onClick={draftUserApi}>
                  {" "}
                  <button
                    type="button"
                    className="css style SS_ProductCheckout"
                    data-id={subId}
                    data-email={email}
                    data-url="http://localhost:1337"
                  >
                    {" "}
                    Checkout{" "}
                  </button>
                </div> */}
              </form>
            </div>
            {/* <div className="checkout__wrapper__have">
              <h5>
                <a href="#">Don't have an account ?</a>
              </h5>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

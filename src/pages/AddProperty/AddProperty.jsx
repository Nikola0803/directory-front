import React, { useState } from "react";
import axios from "axios"; // Import Axios for making API requests
import "./AddProperty.scss";
import MiniFooter from "../../components/MiniFooter/MiniFooter";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { ThreeDots } from "react-loader-spinner";
import Select from "react-select";

function AddProperty() {
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
  const [explanation, setExplanation] = useState("");
  const [explanation2, setExplanation2] = useState("");
  const [explanation3, setExplanation3] = useState("");
  const [explanationTitle, setExplanationTitle] = useState("");
  const [HMOreadiness, setHMOreadiness] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [radius, setRadius] = useState("");
  const [title3, setTitle3] = useState("");
  const [typeOfProperty, setTypeOfProperty] = useState("");
  const [typeOfProperty2, setTypeOfProperty2] = useState("");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [mustHave, setMustHave] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [availability, setAvailability] = useState("");

  const [title, setTitle] = useState("");
  const [images, setImages] = useState(""); // To store selected images
  const jwt = useSelector((state) => state.user.jwt);
  const user = useSelector((state) => state.user.user);
  // Handlers for input field changes
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleAvailabilityChange = (e) => setAvailability(e.target.value);
  const handleFurnishingChange = (e) => setFurnishing(e.target.value);
  const handleDescription2Change = (e) => setDescription2(e.target.value);
  const handleExplanationChange = (e) => setExplanation(e.target.value);
  const handleExplanation2Change = (e) => setExplanation2(e.target.value);
  const handleExplanation3Change = (e) => setExplanation3(e.target.value);
  const handleExplanationTitleChange = (e) =>
    setExplanationTitle(e.target.value);
  const handleHMOreadinessChange = (e) => setHMOreadiness(e.target.value);
  const handleLocationCityChange = (e) => setLocationCity(e.target.value);
  const handleRadiusChange = (e) => setRadius(e.target.value);
  const handleTitle3Change = (e) => setTitle3(e.target.value);
  const handleTypeOfPropertyChange = (e) => setTypeOfProperty(e.target.value);
  const handleBedsChange = (e) => setBeds(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleTypeOfProperty2Change = (e) => setTypeOfProperty2(e.target.value);
  const handleMustHaveChange = (options) => setMustHave(options);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const [loader, setLoader] = useState(false);
  // Handler for image selection
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    setImages(selectedImages);
  };

  const propertiesOptions = [
    { value: "Detached", label: "Detached" },
    { value: "Semi-detached", label: "Semi-detached" },
    { value: "Terraced", label: "Terraced" },
    { value: "Flats", label: "Flats" },
    { value: "Bungalows", label: "Bungalows" },
    { value: "Farms/land", label: "Farms/land" },
    { value: "Park homes", label: "Park homes" },
  ];
  const mustHaveOptions = [
    { value: "Garden", label: "Garden" },
    { value: "Balcony/terrace", label: "Balcony/terrace" },
    { value: "Bills included", label: "Bills included" },
    { value: "Parking/garage", label: "Parking/garage" },
    { value: "Pets allowed", label: "Pets allowed" },
  ];
  const addPropertyAPI = async (e) => {
    e.preventDefault();

    if (!images || images.length === 0) {
      toast.error("Please select a photo or photos ");
      return;
    }
    if (isNaN(price)) {
      toast.error("Price must be a valid number");
      return;
    }
    if (!price || price.length === 0) {
      toast.error("Please enter a price ");
      return;
    }
    if (!beds || beds.length === 0) {
      toast.error("Please enter a bed ");
      return;
    }

    // Create a FormData object to send form data
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("files.gallery", images[i]);
    }
    formData.append(
      "data",
      JSON.stringify({
        title: title,
        Description: description,
        Description3: description2,
        Explanation: explanation,
        Explanation2: explanation2,
        Explanation3: explanation3,
        ExplanationTitle: explanationTitle,
        HMOreadiness: HMOreadiness,
        Location: locationCity,
        Radius: radius,
        Title3: title3,
        TypeOfProperty: typeOfProperty,
        price: price,
        propertyOwner: user.firstLastName,
        propertyOwnerId: user?.userId,
        beds: beds,
        TypeOfProperty2: typeOfProperty2,
        mustHave: mustHave.map((option) => option.value).join(","),
        furnishing: furnishing,
        availability: availability,
      })
    );

    // Append selected images to the formData

    try {
      // Make the Axios POST request
      setLoader(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}home-owner-listings`,
        formData,
        {
          headers: {
            // Add any headers needed, e.g., authentication token
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      // Handle the response, e.g., show a success message
      toast.success("Property added successfully !");
      setLoader(false);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error adding property:", error);
      setLoader(false);
      toast.error(error?.response?.data?.error?.details?.errors[0]?.message);
    }
  };

  //TREBA POSLATI I PROPERTYOWNER ID  KADA BUDEM PRAVIO PROPERTY !
  return (
    <div className="add-property">
      <div className="add-property__wrapper">
        <div className="add-property__wrapper__top">
          <h3>Add a Property:</h3>
        </div>
        <form
          onSubmit={(e) => addPropertyAPI(e)}
          className="add-property__wrapper__form"
        >
          {/* Description */}
          {/* Description */}
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          />

          {/* Description 2 */}
          <label htmlFor="description2">Description 2:</label>
          <input
            type="text"
            id="description2"
            name="description2"
            placeholder="Description 2"
            value={description2}
            onChange={handleDescription2Change}
          />

          {/* Explanation */}
          <label htmlFor="explanation">Explanation:</label>
          <input
            type="text"
            id="explanation"
            name="explanation"
            placeholder="Explanation"
            value={explanation}
            onChange={handleExplanationChange}
          />

          {/* Explanation 2 */}
          <label htmlFor="explanation2">Explanation 2:</label>
          <input
            type="text"
            id="explanation2"
            name="explanation2"
            placeholder="Explanation 2"
            value={explanation2}
            onChange={handleExplanation2Change}
          />

          {/* Explanation 3 */}
          <label htmlFor="explanation3">Explanation 3:</label>
          <input
            type="text"
            id="explanation3"
            name="explanation3"
            placeholder="Explanation 3"
            value={explanation3}
            onChange={handleExplanation3Change}
          />

          {/* Explanation Title */}
          <label htmlFor="explanationTitle">Explanation Title:</label>
          <input
            type="text"
            id="explanationTitle"
            name="explanationTitle"
            placeholder="Explanation Title"
            value={explanationTitle}
            onChange={handleExplanationTitleChange}
          />

          {/* HMO Readiness */}
          <label htmlFor="HMOreadiness">HMO Readiness:</label>
          <select
            id="HMOreadiness"
            value={HMOreadiness}
            onChange={handleHMOreadinessChange}
          >
            <option value="">HMO readiness</option>
            <option value="Licensed">Licensed</option>
            <option value="Compliant">Compliant</option>
          </select>

          {/* Location City */}
          <label htmlFor="locationCity">Location City:</label>
          <input
            type="text"
            id="locationCity"
            name="locationCity"
            placeholder="City"
            value={locationCity}
            onChange={handleLocationCityChange}
          />

          <label htmlFor="radius">Radius:</label>

          <select id="radius" value={radius} onChange={handleRadiusChange}>
            <option value="">Select a radius</option>
            <option value="0.25 miles">0.25 miles</option>
            <option value="0.5 miles">0.5 miles</option>
            <option value="1 miles">1 miles</option>
            <option value="3 miles">3 miles</option>
            <option value="5 miles">5 miles</option>
            <option value="10 miles">10 miles</option>
            <option value="15 miles">15 miles</option>
            <option value="20 miles">20 miles</option>
            <option value="30 miles">30 miles</option>
            <option value="40 miles">40 miles</option>
            <option value="50 miles">50 miles</option>
            <option value="60 miles">60 miles</option>
            <option value="70 miles">70 miles</option>
            <option value="80 miles">80 miles</option>
            <option value="90 miles">90 miles</option>
          </select>

          <label htmlFor="beds">Beds:</label>

          <select id="beds" value={beds} onChange={handleBedsChange}>
            <option value="">Select the number of beds</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>

          {/* Title 3 */}
          <label htmlFor="title3">Title 3:</label>
          <input
            type="text"
            id="title3"
            name="title3"
            placeholder="Title 3"
            value={title3}
            onChange={handleTitle3Change}
          />

          {/* Type of Property */}
          <label htmlFor="typeOfProperty">Type of Property:</label>

          <select
            id="typeOfProperty"
            value={typeOfProperty}
            onChange={handleTypeOfPropertyChange}
          >
            <option value="">Select the type of property</option>

            {propertiesOptions.map((property) => {
              return <option value={property.label}>{property.label}</option>;
            })}
          </select>
          {/* Price */}
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
          />

          {/* Title */}
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <label htmlFor="typeOfProperty2">Type of Property 2:</label>

          <select
            id="typeOfProperty2"
            value={typeOfProperty2}
            onChange={handleTypeOfProperty2Change}
          >
            <option value="">Select the type of property</option>

            <option value="House share">House share</option>
            <option value="Retirement homes">Retirement homes</option>
          </select>

          <label htmlFor="mustHave">Must have:</label>
          <Select
            isMulti
            value={mustHave}
            name="colors"
            onChange={handleMustHaveChange}
            options={mustHaveOptions}
            closeMenuOnSelect={false}
            isClearable={true}
            placeholder={`Please select...`}
            className="basic-multi-select"
            classNamePrefix="select"
          />

          <label htmlFor="furnishing">Furnishing:</label>

          <select
            id="furnishing"
            value={furnishing}
            onChange={handleFurnishingChange}
          >
            <option value="">Select the furnishing</option>

            <option value="Furnished">Furnished</option>
            <option value="Part furnished">Part furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>

          <label htmlFor="availability">Availability:</label>

          <select
            id="availability"
            value={availability}
            onChange={handleAvailabilityChange}
          >
            <option value="">Select the availability</option>

            <option value="Immediately">Immediately</option>
            <option value="Within 1 month">Within 1 month</option>
            <option value="Within 3 months">Within 3 months</option>
            <option value="Within 6 months">Within 6 months</option>
            <option value="Within 1 year">Within 1 year</option>
          </select>

          {/* Image Upload */}
          <label htmlFor="files">Images Upload:</label>
          <input
            type="file"
            id="files"
            name="files"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />

          <button disabled={loader}>
            {" "}
            {loader ? (
              <ThreeDots
                height="20"
                width="20"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{ display: "block" }}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              "Add a Property"
            )}
          </button>
        </form>
      </div>
      <MiniFooter />
    </div>
  );
}

export default AddProperty;

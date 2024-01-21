import React, { useEffect, useState } from "react";
import "./SearchFilter.scss";

import filterIco from "../../assets/filter.png";
import Select from "react-select";
import { BiFilter } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

function SearchFilter({
  propertyType,
  handlePropertyTypeChange,
  locationTerm,
  handleLocationChange,
  radiusTerm,
  handleRadiusChange,
  handleHmoChange,
  hmoTerm,
  radiusesOptions,
  bedTerm,
  handleBedChange,
  beds,
  minPrice,
  handleMinPriceChange,
  maxPrice,
  handleMaxPriceChange,
  mustHaveType,
  handleMustHaveTypeChange,
  retirmentHome,
  houseShare,
  setHouseShare,
  setRetirmentHome,
  handleFurnishingChange,
  selectedFurnishing,
  handleAvailabilityChange,
  selectedAvailability,
  handleAddedToSiteChange,
  selectedAddedToSite,
  keywords,
  handleKeywordsChange,
  resetFilter,
}) {
  const [filter, setFilter] = useState(false);
  useEffect(() => {
    document.body.style.overflow = filter ? "hidden" : "auto";
  }, [filter]);
  console.log(selectedFurnishing);
  const handleOverlayClick = (e) => {
    // Check if the clicked element is the overlay itself
    if (e.target.classList.contains("search-filter__overlay--true")) {
      // Close the overlay
      setFilter(false);
    }
  };
  console.log(retirmentHome, houseShare);
  const mustHaveOptions = [
    { value: "Garden", label: "Garden" },
    { value: "Balcony/terrace", label: "Balcony/terrace" },
    { value: "Bills included", label: "Bills included" },
    { value: "Parking/garage", label: "Parking/garage" },
    { value: "Pets allowed", label: "Pets allowed" },
  ];

  const propertiesOptions = [
    { value: "Detached", label: "Detached" },
    { value: "Semi-detached", label: "Semi-detached" },
    { value: "Terraced", label: "Terraced" },
    { value: "Flats", label: "Flats" },
    { value: "Bungalows", label: "Bungalows" },
    { value: "Farms/land", label: "Farms/land" },
    { value: "Park homes", label: "Park homes" },
  ];
  return (
    <>
      <div
        onClick={handleOverlayClick}
        className={`search-filter__overlay ${
          filter ? "search-filter__overlay--true" : ""
        }`}
      ></div>
      <div
        className={`search-filter__wrapper ${
          filter ? "search-filter__wrapper--true" : ""
        }`}
      >
        <div
          className={
            filter
              ? "search-filter__wrapper__bottom-active"
              : "search-filter__wrapper__bottom"
          }
        >
          <h3 onClick={resetFilter}>Reset Filters</h3>
        </div>
        <div
          className={
            filter
              ? "search-filter__wrapper__header search-filter__wrapper__header--active"
              : "search-filter__wrapper__header"
          }
        >
          <h3>Filter your results</h3>
          <span onClick={() => setFilter(false)}>
            <AiOutlineClose size={25} />
          </span>
        </div>
        <div className="search-filter__wrapper__body">
          <div className="search-filter__wrapper__body__card">
            <h3>Radius</h3>
            <select
              name="radius"
              id="radius"
              value={radiusTerm}
              onChange={handleRadiusChange}
            >
              <option value="">Please select...</option>
              {radiusesOptions?.map((rad) => {
                return <option value={rad}>{rad}</option>;
              })}
            </select>
          </div>

          <div className="search-filter__wrapper__body__card">
            <h3>HMO</h3>
            <select
              name="hmo"
              id="hmo"
              value={hmoTerm}
              onChange={handleHmoChange}
            >
              <option value="">Please select...</option>
              <option value="Licensed">Licensed</option>
              <option value="Compliant">Compliant</option>
            </select>
          </div>

          <div className="search-filter__wrapper__body__card">
            <h3>Beds</h3>
            <select
              name="beds"
              id="beds"
              value={bedTerm}
              onChange={handleBedChange}
            >
              <option value="">Please select...</option>
              {beds?.map((bedroom) => {
                return <option value={bedroom}>{bedroom}</option>;
              })}
            </select>
          </div>

          <div className="search-filter__wrapper__body__card">
            <h3>Price</h3>
            <div className="search-filter__wrapper__body__card__holder">
              <div className="search-filter__wrapper__body__card__holder__input">
                {" "}
                <label htmlFor="minPrice">Min Price</label>
                <select
                  name="minPrice"
                  id="minPrice"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                >
                  <option value="">Please select...</option>
                  {[...Array(40)].map((_, index) => (
                    <option key={index} value={(index + 1) * 9000}>
                      {`${(index + 1) * 9000}$`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-filter__wrapper__body__card__holder__input">
                {" "}
                <label htmlFor="maxPrice">Max Price</label>
                <select
                  name="maxPrice"
                  id="maxPrice"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                >
                  <option value="">Please select...</option>
                  {[...Array(40)].map((_, index) => (
                    <option key={index} value={(index + 1) * 9000}>
                      {`${(index + 1) * 9000}$`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="search-filter__wrapper__body__card">
            <h3>Type of Property</h3>

            <Select
              isMulti
              value={propertyType}
              name="colors"
              onChange={handlePropertyTypeChange}
              options={propertiesOptions}
              closeMenuOnSelect={false}
              isClearable={true}
              placeholder={`Please select...`}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          <div className="search-filter__wrapper__body__card">
            <h3>Include, exclude</h3>

            <div className="search-filter__wrapper__body__card__holder">
              <p>House Share</p>
              <div className="search-filter__wrapper__body__card__holder__buttons">
                <button
                  onClick={(e) => setHouseShare(e.target.innerText)}
                  className={
                    houseShare === "Include" &&
                    "search-filter__wrapper__body__card__holder__buttons__active"
                  }
                >
                  Include
                </button>
                <button
                  className={
                    houseShare === "Exclude" &&
                    "search-filter__wrapper__body__card__holder__buttons__active"
                  }
                  onClick={(e) => setHouseShare(e.target.innerText)}
                >
                  Exclude
                </button>
              </div>
            </div>

            <div className="search-filter__wrapper__body__card__holder">
              <p>Retirement homes</p>
              <div className="search-filter__wrapper__body__card__holder__buttons">
                <button
                  onClick={(e) => setRetirmentHome(e.target.innerText)}
                  className={
                    retirmentHome === "Include" &&
                    "search-filter__wrapper__body__card__holder__buttons__active"
                  }
                >
                  Include
                </button>
                <button
                  className={
                    retirmentHome === "Exclude" &&
                    "search-filter__wrapper__body__card__holder__buttons__active"
                  }
                  onClick={(e) => setRetirmentHome(e.target.innerText)}
                >
                  Exclude
                </button>
              </div>
            </div>
          </div>
          <div className="search-filter__wrapper__body__card">
            <h3>Must-haves</h3>

            <Select
              isMulti
              value={mustHaveType}
              name="colors"
              onChange={handleMustHaveTypeChange}
              options={mustHaveOptions}
              closeMenuOnSelect={false}
              isClearable={true}
              placeholder={`Please select...`}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          <div className="search-filter__wrapper__body__card">
            <h3>Furnishing</h3>

            <div className="search-filter__wrapper__body__card__holder">
              <div className="search-filter__wrapper__body__card__holder__left">
                <label className="search-filter__wrapper__body__card__holder__left__option">
                  <input
                    type="radio"
                    name="Furnishing"
                    value="Any"
                    id="any"
                    checked={selectedFurnishing === "Any"}
                    onChange={handleFurnishingChange}
                  />
                  <div className="custom-radio"></div>
                  Any
                </label>

                <label className="search-filter__wrapper__body__card__holder__left__option">
                  <input
                    type="radio"
                    name="Furnishing"
                    value="Part furnished"
                    id="PartFurnished"
                    checked={selectedFurnishing === "Part furnished"}
                    onChange={handleFurnishingChange}
                  />
                  <div className="custom-radio"></div>
                  Part furnished
                </label>
              </div>
              <div className="search-filter__wrapper__body__card__holder__right">
                <label className="search-filter__wrapper__body__card__holder__right__option">
                  <input
                    type="radio"
                    name="Furnishing"
                    value="Furnished"
                    id="Furnished"
                    checked={selectedFurnishing === "Furnished"}
                    onChange={handleFurnishingChange}
                  />
                  <div className="custom-radio"></div>
                  Furnished
                </label>

                <label className="search-filter__wrapper__body__card__holder__right__option">
                  <input
                    type="radio"
                    name="Furnishing"
                    value="Unfurnished"
                    id="Unfurnished"
                    checked={selectedFurnishing === "Unfurnished"}
                    onChange={handleFurnishingChange}
                  />
                  <div className="custom-radio"></div>
                  Unfurnished
                </label>
              </div>
            </div>
          </div>

          <div className="search-filter__wrapper__body__card">
            <h3>Availability</h3>

            <div className="search-filter__wrapper__body__card__holder">
              <div className="search-filter__wrapper__body__card__holder__left">
                <label className="search-filter__wrapper__body__card__holder__left__option">
                  <input
                    type="radio"
                    name="Availability"
                    value="Available anytime"
                    id="Availableanytime"
                    checked={selectedAvailability === "Available anytime"}
                    onChange={handleAvailabilityChange}
                  />
                  <div className="custom-radio"></div>
                  Available anytime
                </label>

                <label className="search-filter__wrapper__body__card__holder__left__option">
                  <input
                    type="radio"
                    name="Availability"
                    value="Within 1 month"
                    id="Within1month"
                    checked={selectedAvailability === "Within 1 month"}
                    onChange={handleAvailabilityChange}
                  />
                  <div className="custom-radio"></div>
                  Within 1 month
                </label>

                <label className="search-filter__wrapper__body__card__holder__left__option">
                  <input
                    type="radio"
                    name="Availability"
                    value="Within 6 months"
                    id="Within6months"
                    checked={selectedAvailability === "Within 6 months"}
                    onChange={handleAvailabilityChange}
                  />
                  <div className="custom-radio"></div>
                  Within 6 months
                </label>
              </div>
              <div className="search-filter__wrapper__body__card__holder__right">
                <label className="search-filter__wrapper__body__card__holder__right__option">
                  <input
                    type="radio"
                    name="Availability"
                    value="Immediately"
                    id="Immediately"
                    checked={selectedAvailability === "Immediately"}
                    onChange={handleAvailabilityChange}
                  />
                  <div className="custom-radio"></div>
                  Immediately
                </label>

                <label className="search-filter__wrapper__body__card__holder__right__option">
                  <input
                    type="radio"
                    name="Availability"
                    value="Within 3 months"
                    id="Within3months"
                    checked={selectedAvailability === "Within 3 months"}
                    onChange={handleAvailabilityChange}
                  />
                  <div className="custom-radio"></div>
                  Within 3 months
                </label>

                <label className="search-filter__wrapper__body__card__holder__right__option">
                  <input
                    type="radio"
                    name="Availability"
                    value="Within 1 year"
                    id="Within1year"
                    checked={selectedAvailability === "Within 1 year"}
                    onChange={handleAvailabilityChange}
                  />
                  <div className="custom-radio"></div>
                  Within 1 year
                </label>
              </div>
            </div>
          </div>

          <div className="search-filter__wrapper__body__card">
            <h3>Added to site</h3>

            <div className="search-filter__wrapper__body__card__holder">
              <div className="search-filter__wrapper__body__card__holder__left">
                <label className="search-filter__wrapper__body__card__holder__left__option">
                  <input
                    type="radio"
                    name="Addedtosite"
                    value="Anytime"
                    id="Anytime"
                    checked={selectedAddedToSite === "Anytime"}
                    onChange={handleAddedToSiteChange}
                  />
                  <div className="custom-radio"></div>
                  Anytime
                </label>

                <label className="search-filter__wrapper__body__card__holder__left__option">
                  <input
                    type="radio"
                    name="Addedtosite"
                    value="Last 3 days"
                    id="Last3days"
                    checked={selectedAddedToSite === "Last 3 days"}
                    onChange={handleAddedToSiteChange}
                  />
                  <div className="custom-radio"></div>
                  Last 3 days
                </label>
                <label className="search-filter__wrapper__body__card__holder__left__option">
                  <input
                    type="radio"
                    name="Addedtosite"
                    value="Last 14 days"
                    id="Last14days"
                    checked={selectedAddedToSite === "Last 14 days"}
                    onChange={handleAddedToSiteChange}
                  />
                  <div className="custom-radio"></div>
                  Last 14 days
                </label>
              </div>
              <div className="search-filter__wrapper__body__card__holder__right">
                <label className="search-filter__wrapper__body__card__holder__right__option">
                  <input
                    type="radio"
                    name="Addedtosite"
                    value="Last 24 hours"
                    id="Last24hours"
                    checked={selectedAddedToSite === "Last 24 hours"}
                    onChange={handleAddedToSiteChange}
                  />
                  <div className="custom-radio"></div>
                  Last 24 hours
                </label>

                <label className="search-filter__wrapper__body__card__holder__right__option">
                  <input
                    type="radio"
                    name="Addedtosite"
                    value="Last 7 days"
                    id="Last7days"
                    checked={selectedAddedToSite === "Last 7 days"}
                    onChange={handleAddedToSiteChange}
                  />
                  <div className="custom-radio"></div>
                  Last 7 days
                </label>
                <label className="search-filter__wrapper__body__card__holder__right__option">
                  <input
                    type="radio"
                    name="Addedtosite"
                    value="Last 30 days"
                    id="Last30days"
                    checked={selectedAddedToSite === "Last 30 days"}
                    onChange={handleAddedToSiteChange}
                  />
                  <div className="custom-radio"></div>
                  Last 30 days
                </label>
              </div>
            </div>
          </div>

          <div className="search-filter__wrapper__body__card">
            <h3>Keywords</h3>

            <input
              type="text"
              name="keyword"
              value={keywords}
              id="keyword"
              placeholder='e.g. conservatory or "double garage"'
              onChange={handleKeywordsChange}
            />
          </div>
        </div>
      </div>

      <div className="search__header">
        <div className="search__header__wrapper">
          <h3>Property providers listing</h3>
          <div className="search__header__wrapper__search-field">
            <div className="search__header__wrapper__search-field__field search__header__wrapper__search-field__field--line col-3">
              <img src={filterIco} alt="" />
              <div className="search__header__wrapper__search-field__field__wrapper">
                <label htmlFor={"term"}>Location Term</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Oxford or NW3"
                  value={locationTerm}
                  onChange={handleLocationChange}
                />
              </div>
            </div>

            <div className="search__header__wrapper__search-field__field search__header__wrapper__search-field__field--line col-2">
              <label htmlFor={"term"}>Type of Property</label>

              <Select
                isMulti
                value={propertyType}
                name="colors"
                onChange={handlePropertyTypeChange}
                options={propertiesOptions}
                closeMenuOnSelect={false}
                isClearable={true}
                placeholder={`Please select...`}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>

            <div className="search__header__wrapper__search-field__field search__header__wrapper__search-field__field--line col-2">
              <label htmlFor={"term"}>Radius</label>
              <select
                name="radius"
                id="radius"
                value={radiusTerm}
                onChange={handleRadiusChange}
              >
                <option value="">Please select...</option>
                {radiusesOptions?.map((rad) => {
                  return <option value={rad}>{rad}</option>;
                })}
              </select>
            </div>

            <div className="search__header__wrapper__search-field__field search__header__wrapper__search-field__field--line col-2">
              <label htmlFor={"term"}>HMO</label>
              <select
                name="hmo"
                id="hmo"
                value={hmoTerm}
                onChange={handleHmoChange}
              >
                <option value="">Please select...</option>
                <option value="Licensed">Licensed</option>
                <option value="Compliant">Compliant</option>
              </select>
            </div>

            <div className="search__header__wrapper__search-field__field col-2">
              <label htmlFor="bedroom">Beds</label>
              <select
                name="bedroom"
                id="bedroom"
                value={bedTerm}
                onChange={handleBedChange}
              >
                <option value="">Please select...</option>
                {beds?.map((bedroom) => {
                  return <option value={bedroom}>{bedroom}</option>;
                })}
              </select>
            </div>

            <div className="search__header__wrapper__search-field__field col-1">
              <p onClick={() => setFilter(true)}>
                <span>
                  <BiFilter size={20} />
                </span>
                Filters
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchFilter;

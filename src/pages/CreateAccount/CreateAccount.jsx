import React, { useCallback, useEffect, useState } from "react";
import "./CreateAccount.scss";
import logo from "../../assets/logo.png";
import { BiShow } from "react-icons/bi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiHide } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter/PasswordStrengthMeter";
import Loader from "../../components/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import SelectUser from "../SelectUser/SelectUser";
function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [selectUser, setSelectUser] = useState("");

  const changePassword = useCallback(() => {
    setShowPassword((last) => !last);
  }, [showPassword]);
  const [subId, setSubId] = useState("");
  useEffect(() => {
    if (selectUser === "Care Provider") {
      setSubId("9");
    }
    if (selectUser === "Estate Agent / Landlord") {
      setSubId("6");
    }
  }, [selectUser]);
  // Create an array of state variables to track the open/close state of each subscription
  const [subscriptionStates, setSubscriptionStates] = useState(
    Array(3).fill(false)
  );

  // Function to toggle the state of a specific subscription
  const toggleSubscription = (index) => {
    const updatedStates = [...subscriptionStates];
    updatedStates[index] = !updatedStates[index];
    setSubscriptionStates(updatedStates);
  };
  const [subscriptionData, setSubscriptionData] = useState([]);
  function handleFirstStepButton(e) {
    e.preventDefault();
    if (!firstName || !lastName) {
      toast.error("Please write your name !");
      return;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // Standard email regex pattern

    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address !");
      return;
    }
    if (!password) {
      toast.error("Please enter a password !");
      return;
    }
    if (password.length <= 6) {
      toast.error("Password must be at least 7 characters long !");
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}users?filters[$and][0][email][$eq]=${email}`;
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

          if (response.data[0]) {
            toast.error("That email exists in database !");
            return;
          } else {
            navigate("checkout", {
              state: {
                subId: subId,
                email,
                password,
                firstLastName: firstName + " " + lastName,
                selectUser,
              },
            });
          }
          // window.location.href = response.data.url;
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
    const url = `${process.env.REACT_APP_API_URL}${
      selectUser === "Care Provider"
        ? "care-provider-subscriptions"
        : "service-provider-subscriptions"
    }`;

    // Define headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: "bearer " + process.env.REACT_APP_STRAPI_API_TOKEN,
    };

    // Make a GET request using Axios with headers
    axios
      .get(url, { headers })
      .then((response) => {
        // Handle the response data here
        setSubscriptionData(response.data.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, [selectUser]);
  const navigate = useNavigate();
  // Create an array of state variables to track the checked state of each radio button
  const [radioStates, setRadioStates] = useState(() => {
    const initialStates = Array(subscriptionData.length).fill(false);
    initialStates[0] = true; // Set the first radio button as checked
    return initialStates;
  });

  // Function to handle radio button click for a specific subscription
  const handleRadioClick = (index, subId) => {
    setSubId(subId);
    const updatedStates = Array(subscriptionData.length).fill(false); // Reset all radio states
    updatedStates[index] = true; // Set the clicked radio to true
    setRadioStates(updatedStates);
  };
  return (
    <div className="create-account">
      {!selectUser ? (
        <div className="create-account__select-user">
          <div className="create-account__back">
            <AiOutlineArrowLeft size={30} onClick={() => navigate("/")} />
          </div>
          <SelectUser selectUser={selectUser} setSelectUser={setSelectUser} />
        </div>
      ) : (
        <>
          <div className="create-account__back">
            <AiOutlineArrowLeft size={30} onClick={() => navigate("/")} />
          </div>
          {/* <div className="create-account__button">
            <div>
              <h3
                className={subscription === "careProvider" ? "highlight" : ""}
              >
                Care Provider
              </h3>
            </div>
            <BootstrapSwitchButton
              onlabel=""
              onstyle="warning"
              offlabel=""
              onChange={(checked) => {
                if (checked) {
                  setSubscription("serviceProvider");
                } else if (!checked) {
                  setSubscription("careProvider");
                }
              }}
            />
            <div>
              <h3 className={subscription === "serviceProvider" && "highlight"}>
                Service Provider
              </h3>
            </div>
          </div> */}
          <div className="container">
            <div className="row justify-content-center ">
              <div className="col-5 m-4 create-account__left">
                <h3>Select Subscription Plan</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  dolor sit amet eiusmod tempor incididunt
                </p>

                {/* Render subscription divs dynamically */}
                {subscriptionData.length > 0 ? (
                  <>
                    {subscriptionData?.map((subscription, index) => (
                      <div
                        className={`create-account__left__subscription ${
                          radioStates[index]
                            ? "create-account__left__subscription--check"
                            : ""
                        }`}
                        key={index}
                      >
                        <div className="create-account__left__subscription__title">
                          <h3>{subscription.attributes.name}</h3>
                          <button onClick={() => toggleSubscription(index)}>
                            {subscriptionStates[index] ? (
                              <>
                                Hide Details <MdKeyboardArrowUp size={22} />
                              </>
                            ) : (
                              <>
                                Show Details <MdKeyboardArrowDown size={22} />
                              </>
                            )}
                          </button>
                          <ul
                            className={`animated-list ${
                              subscriptionStates[index] ? "show" : ""
                            }`}
                          >
                            {subscription.attributes.details.map(
                              (feature, featureIndex) => (
                                <li key={featureIndex}>
                                  {feature} <BsCheck size={25} color="0FBA3F" />
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        <div className="create-account__left__subscription__price">
                          <span>
                            £{" "}
                            {Number(
                              subscription.attributes.price
                            ).toLocaleString("de-DE", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>

                          <label
                            htmlFor={`myRadiobox${index}`}
                            className="custom-radiobox"
                          >
                            <input
                              checked={radioStates[index]}
                              name={`myRadiobox${index}`}
                              type="radio"
                            />
                            <span
                              onClick={() =>
                                handleRadioClick(
                                  index,
                                  subscription.attributes.subId
                                )
                              }
                              className={`checkmark ${
                                radioStates[index] ? "checked" : ""
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <Loader />
                )}
              </div>
              <div className="col-5 m-4 create-account__right">
                {/* <img src={logo} alt="" /> */}
                <h3>Sign Up</h3>
                <p>Enter your credentials to continue</p>
                <div className="create-account__right__form">
                  <p>Sign up with Email address</p>
                  <form>
                    <div className="create-account__right__form__name">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address / Username"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <div className="create-account__right__form__password">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                      <div className="create-account__right__form__password__icons">
                        {!showPassword ? (
                          <BiHide size={25} onClick={changePassword} />
                        ) : (
                          <BiShow size={25} onClick={changePassword} />
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        display: password?.length > 0 ? "block" : "none",
                      }}
                      className="create-account__right__form__canvas "
                    >
                      <PasswordStrengthMeter password={password} />
                    </div>

                    {/* <button>Sign Up</button> */}
                    <button onClick={handleFirstStepButton}>Next Step</button>
                  </form>
                </div>
                <div className="create-account__right__have">
                  <h5>
                    <Link to="/login">Already have an account ?</Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CreateAccount;

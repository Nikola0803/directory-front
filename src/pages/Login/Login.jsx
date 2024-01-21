import React, { useCallback, useEffect, useState } from "react";
import "./Login.scss";
import { BiShow } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiHide } from "react-icons/bi";
import axios from "axios";
import logo from "../../assets/logo.png";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { updateState } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
function Login() {
  const [responseData, setResponseData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState({ isChecked: false });
  const [password, setPassword] = useState("");
  const changePassword = useCallback(() => {
    setShowPassword((last) => !last);
  }, [showPassword]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("sessionId");
  const [cookies, setCookie] = useCookies(["cookieName"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function authLogin(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}auth/local`;
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      // Make a GET request using Axios with headers
      axios
        .post(
          url,
          {
            identifier: email,
            password: password,
          },
          { headers }
        )
        .then((response) => {
          // Handle the response data here
          // setUrl(response.data.url);

          localStorage.setItem("user", JSON.stringify(response.data.user));
          const jwtToken = response.data.jwt;
          if (remember.isChecked) {
            // localStorage.setItem("jwt", response.data.jwt);
            const expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 28); // Add 28 years

            // Convert years to milliseconds (1 year ≈ 31,536,000,000 milliseconds)
            const expirationTimeInMilliseconds =
              expirationDate.getTime() + 28 * 31536000000; // 28 years in milliseconds

            setCookie("jwt", jwtToken, {
              path: "/",
              expires: new Date(expirationTimeInMilliseconds),
            });
            toast.success("Successfully logged in.");
            dispatch(updateState(response.data.jwt));
            navigate("/");
            return;
          }

          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours in milliseconds

          setCookie("jwt", jwtToken, {
            path: "/",
            expires: expirationDate,
          });

          dispatch(updateState(response.data.jwt));
          navigate("/");
        })
        .catch((error) => {
          // Handle errors here
          toast.error(
            error?.response?.data?.error?.message &&
              "Invalid email or password !"
          );
          console.error("Error:", error?.response?.data?.error?.message);
        });
    } catch (error) {
      // Handle any exceptions that might occur

      console.error("Exception:", error);
    }
  }
  function handleCheck(e) {
    setRemember((prevState) => ({
      isChecked: !prevState.isChecked,
    }));
  }
  useEffect(() => {
    if (sessionId?.length > 0) {
      // Define the URL for the GET request
      const url = `${process.env.REACT_APP_API_URL}order/stripe-webhook`;

      // Define headers
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const userJSON = localStorage.getItem("user");

      // Parse the JSON string into a JavaScript object
      const user = JSON.parse(userJSON);

      // Make a GET request using Axios with headers
      axios
        .post(url, { sessionId, ...user }, { headers })
        .then((response) => {
          // Handle the response data here
          setResponseData(response.data);
        })
        .catch((error) => {
          // Handle errors here

          console.error("Error:", error);
        });
    }
  }, [sessionId]);

  return (
    <div className="login">
      <div className="login__back">
        <AiOutlineArrowLeft size={30} onClick={() => navigate("/")} />
      </div>
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-5 m-4 login__wrapper">
            {/* <img src={logo} alt="" /> */}
            <h3>Hi, Welcome Back</h3>
            <p>Enter your credentials to continue</p>
            <div className="login__wrapper__form">
              <form action="" method="post">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address / Username"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <div className="login__wrapper__form__password">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <div className="login__wrapper__form__password__icons">
                    {!showPassword ? (
                      <BiHide size={25} onClick={changePassword} />
                    ) : (
                      <BiShow size={25} onClick={changePassword} />
                    )}
                  </div>
                </div>

                <div className="login__wrapper__form__checkbox">
                  <input
                    id="custom-checkbox"
                    type="checkbox"
                    onChange={(e) => handleCheck(e)}
                  />
                  <label for="custom-checkbox"></label>
                  <span htmlFor="custom-checkbox"> Keep me logged in</span>
                </div>
                <button onClick={(e) => authLogin(e)}>Sign In</button>
              </form>
            </div>
            <div className="login__wrapper__have">
              <h5>
                <Link to="/register">Don't have an account ?</Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

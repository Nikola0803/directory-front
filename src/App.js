import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import SearchRoot from "./pages/SearchRoot/SearchRoot";
import MyProperties from "./pages/MyProperties/MyProperties";
import AddProperty from "./pages/AddProperty/AddProperty";
import Search from "./pages/Search/Search";
// css

// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import Property from "./components/Property/Property";
import Provider from "./components/Provider/Provider";
import Checkout from "./components/Checkout/Checkout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateState, updateUser } from "./redux/features/userSlice";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import MyMessages from "./pages/MyMessages/MyMessages";
import MyBids from "./pages/MyBids/MyBids";
import UpdateProperty from "./pages/UpdateProperty/UpdateProperty";
import Favorites from "./pages/Favorites/Favorites";
function App() {
  const [cookies] = useCookies(["jwt"]);
  const userData = localStorage.getItem("user");
  const userDataJSON = JSON.parse(userData);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const userJwt = cookies.jwt;

  useEffect(() => {
    if (userJwt && userData) {
      // const userJwtJSON = JSON.parse(userJwt);

      dispatch(updateState(userJwt));
      dispatch(updateUser(userDataJSON));
    }
  }, [userJwt, dispatch]);
  const ProtectedR = () => {
    return userJwt && userData ? <Outlet /> : <Navigate to={"/login"} />;
  };

  const AgentRoutes = () => {
    return user.selectUser === "Estate Agent / Landlord" ? (
      <Outlet />
    ) : (
      <Navigate to={"/"} />
    );
  };

  const CareRoutes = () => {
    return user.selectUser === "Care Provider" ? (
      <Outlet />
    ) : (
      <Navigate to={"/"} />
    );
  };

  const CheckLogged = () => {
    return userJwt ? <Navigate to={"/"} /> : <Outlet />;
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<CheckLogged />}>
            <Route path="register" element={<CreateAccount />} />
            <Route path="register/checkout" element={<Checkout />} />

            <Route path="login" element={<Login />} />
          </Route>
          <Route element={<SearchRoot />}>
            <Route path="search/:search" element={<Search />} />
            <Route element={<ProtectedR />}>
              <Route path="property/:id" element={<Property />} />
              <Route path="provider/:id" element={<Provider />} />
              <Route path="me/bids" element={<MyBids />} />
              <Route path="me/messages" element={<MyMessages />} />
              <Route element={<CareRoutes />}>
                <Route path="favorites" element={<Favorites />} />
              </Route>
              <Route element={<AgentRoutes />}>
                <Route path="add/property" element={<AddProperty />} />
                <Route path="me/properties" element={<MyProperties />} />
                <Route
                  path="update-property/:id"
                  element={<UpdateProperty />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

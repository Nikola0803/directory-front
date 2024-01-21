import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import LandingSearch from "../../components/LandingSearch/LandingSearch";
import PropertyProviders from "../../components/PropertyProviders/PropertyProviders";
import "./LandingPage.scss";
import Ad from "../../components/Ad/Ad";
import Footer from "../../components/Footer/Footer";
function LandingPage() {
  return (
    <>
      <Navbar />
      <LandingSearch />
      <div className="wrapper">
        <PropertyProviders />
        <Ad />
        <PropertyProviders care careTitle={"Featured Care Providers"} />
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;

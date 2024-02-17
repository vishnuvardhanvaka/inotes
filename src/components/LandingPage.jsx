import React from "react";
import Navbar from "./Landing_page_molecules/Navbar";
import Hero from "./Landing_page_molecules/Hero";
import Introduction from "./Landing_page_molecules/Introduction";
import HowItWorks from "./Landing_page_molecules/HowItWorks";
import Testimonials from "./Landing_page_molecules/Testimonials";
import OurServices from "./Landing_page_molecules/OurServices";
import AboutUs from "./Landing_page_molecules/AboutUs";
import JoinUs from "./Landing_page_molecules/JoinUs";
import Footer from "./Landing_page_molecules/Footer";
import "./Scrollbar.css";


function LandingPage(){
  return (
    <div id="scrollbar-chat" className="">
      {/* <Navbar /> */}
      <Hero />
      <Introduction />
      <OurServices />
      <Footer />
      
    </div>
  )
}
export default LandingPage;

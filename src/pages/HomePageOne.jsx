import React, { useEffect, useState } from "react";
import HeaderOne from "../components/HeaderOne";
import HeroOne from "../components/HeroOne";
import CounterOne from "../components/CounterOne";
import AboutOne from "../components/AboutOne";
import ServiceAreaOne from "../components/ServiceAreaOne";
import MarqueeOne from "../components/MarqueeOne";
import PortfolioOne from "../components/PortfolioOne";
import ClientAreaOne from "../components/ClientAreaOne";
import PricingPlanOne from "../components/PricingPlanOne";
import TeamAreaOne from "../components/TeamAreaOne";
import CTAAreaOne from "../components/CTAAreaOne";
import TestimonialOne from "../components/TestimonialOne";
import ProcessAreaOne from "../components/ProcessAreaOne";
import FaqAreaOne from "../components/FaqAreaOne";
import BlogAreaOne from "../components/BlogAreaOne";
import FooterAreaOne from "../components/FooterAreaOne";
import SubscribeOne from "../components/SubscribeOne";
import Preloader from "../helper/Preloader";
import Breadcrumb from "../components/Breadcrumb";
import ShopArea from "../components/ShopArea";

const HomePageOne = () => {
  let [active, setActive] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setActive(false);
    }, 2000);
  }, []);
  return (
    <>
      {/* Preloader */}
      {active === true && <Preloader />}

      <HeaderOne />
      <ShopArea />


      

      {/* 

      <HeroOne />

      <CounterOne />

      <AboutOne />

      <ServiceAreaOne />

      <MarqueeOne />

      <PortfolioOne />

      <ClientAreaOne />

      <PricingPlanOne />

      <TeamAreaOne />

      <CTAAreaOne />

      <TestimonialOne />

      <ProcessAreaOne />

      <FaqAreaOne />

      <BlogAreaOne />

      <SubscribeOne />

      <FooterAreaOne /> */}
    </>
  );
};

export default HomePageOne;

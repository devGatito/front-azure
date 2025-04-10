import React, { useEffect, useState } from "react";
import HeaderOne from "../components/HeaderOne";
import Preloader from "../helper/Preloader";

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


      

    </>
  );
};

export default HomePageOne;

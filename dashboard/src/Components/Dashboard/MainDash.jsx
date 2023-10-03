import React, { Fragment } from "react";
import Cards from "../Layout/Cards/Cards";

import Tables from "../Layout/Tables/Tables";


const MainDash = () => {
  

  return (
    <Fragment>
      <div className='MainDash'>
      <h1>Dashboard</h1>
      <Cards/>
      
      <Tables/>

    </div>
    </Fragment>
  );
};

export default MainDash;



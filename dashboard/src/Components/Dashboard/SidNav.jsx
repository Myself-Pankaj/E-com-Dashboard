import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsClipboardCheckFill } from "react-icons/bs";
import { BiSolidUserPin,BiSolidVideos } from "react-icons/bi";
import { CiDeliveryTruck } from "react-icons/ci";

const SidNav = () => {
  return (
    <Fragment>
      <section className="sideBarContainer">
        <div>
          <h2>M -Attar Plazaa</h2>
        </div>

        <div>
          <Link to="/dashboard">
            <LuLayoutDashboard /> Dashboard
          </Link>
          <Link to="/products">
            <BsClipboardCheckFill /> Product
          </Link>
          <Link to="/user">
            <BiSolidUserPin /> User
          </Link>
          <Link to="/orders">
            <CiDeliveryTruck /> Order
          </Link>
          <Link to="/media">
            <BiSolidVideos /> Featured Video
          </Link>
        </div>
      </section>
    </Fragment>
  );
};

export default SidNav;

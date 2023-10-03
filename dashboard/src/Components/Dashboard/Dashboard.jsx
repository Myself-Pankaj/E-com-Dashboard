import React from "react";
import Sidebar from "./Sidebar";
import MainDash from "./MainDash";
import RightSide from "./RightSide";



const Dashboard = () => {
  return (
    <div className="App">
    <div className='AppGlass'>
      <Sidebar/>
      <MainDash/>
      <RightSide/>
     
    </div>
    </div>
  );
};

export default Dashboard;

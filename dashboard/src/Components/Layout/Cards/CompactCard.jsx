import React from 'react'
import { CircularProgressbar } from "react-circular-progressbar";
import { motion } from "framer-motion";
const CompactCard = ({ title, color, barValue, Png }) => {
    return (
   
        <motion.div
          className="CompactCard"
          style={{
            background: color.backGround, 
            boxShadow: color.boxShadow, 
          }}
        >
          <div className="radialBar">
            <CircularProgressbar value={barValue} text={`${barValue}%`} />
            <span>{title}</span> 
          </div>
  
          <div className="detail">
            <Png />
            <span>{barValue}</span> 
            <span>Last 24 Hours</span>
          </div>
        </motion.div>
   
    );
  };
  

export default CompactCard
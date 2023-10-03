import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { processOrder } from "../../Redux/Order/orderAction";

const OrderCard = ({
  orderStatus,
  totalAmount,
  paymentMethod,
  name,
  orderId,
}) => {
  const dispatch = useDispatch();
  const { loading} = useSelector((state) => state.process);

  const handleProcessOrder = () => {
    dispatch(processOrder(orderId));
    
  };
  return (
    <motion.div
      className="orderCard"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/order/${orderId}`}>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontWeight: 300,
            fontSize: "1.4rem",
            padding: "1rem",
            borderLeft: "1px dashed $black",
            width: "25vw",
          }}
        >
          {name}
          <p
            style={{
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "1px",
              color: "$color1",
            }}
          >
            Order Id: {orderId}
          </p>
        </motion.h3>
      </Link>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          padding: "2rem",
          borderLeft: "1px dashed $black",
          width: "10vw",
        }}
      >
        <span style={{ fontSize: "larger", color: "$black" }}>
          {" "}
          {totalAmount}
        </span>
      </motion.p>

      <motion.h5
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          padding: "2rem",
          fontSize: "larger",
          borderLeft: "1px dashed $black",
          borderRight: "1px dashed $black",
          width: "10vw",
        }}
      >
        {paymentMethod}
      </motion.h5>
      <motion.h5
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          padding: "2rem",
          fontSize: "larger",
          borderLeft: "1px dashed $black",
          borderRight: "1px dashed $black",
          width: "10vw",
        }}
      >
        {orderStatus}
      </motion.h5>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{ display: "flex" }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button
            onClick={handleProcessOrder}
            isDisabled={loading}
            isLoading={loading}
          >
            Process Order
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OrderCard;

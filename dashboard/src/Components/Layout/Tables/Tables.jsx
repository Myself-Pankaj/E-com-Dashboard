import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getOrders } from "../../../Redux/Order/orderAction";
import { useState } from "react";
import { Button } from "@chakra-ui/react";

const Tables = () => {
  const dispatch = useDispatch();
  const { orders, totalPages } = useSelector((state) => state.orders);
  const { error, message } = useSelector((state) => state.process);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch]);

  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getOrders(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
    <p>Recent Order</p>
    <table className="smaller-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Username</th>
          <th>Payment Method</th>
          <th>Total Amount</th>
          <th>Order Status</th>
        </tr>
      </thead>
      <tbody>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.totalAmount}</td>
              <td>{order.orderStatus}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">Loading</td>
          </tr>
        )}
      </tbody>
    </table>
    <div className="smaller-pagination">
      <Button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  </div>
  
  );
};

export default Tables;

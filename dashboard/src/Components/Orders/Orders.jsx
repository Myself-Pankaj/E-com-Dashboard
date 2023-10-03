import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, processOrder } from "../../Redux/Order/orderAction";

import SearchOrder from "./SearchOrder";
import toast from "react-hot-toast";

import { Button } from "@chakra-ui/react";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, totalPages } = useSelector((state) => state.orders);
  // console.log(orders)
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
    setPage(newPage);
  };
  const handleSearch = (query) => {};

  const { loading } = useSelector((state) => state.process);
  const handleActionClick = async (orderId) => {
    try {
      await dispatch(processOrder(orderId));
      await dispatch(getOrders());
    } catch (error) {
      
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="orderItemContainer">
      <h1>Orders</h1>
      <div className="search-bar">
        <SearchOrder onSearch={handleSearch} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Method</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.totalAmount}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.orderStatus}</td>
                <td>
                  <Button
                    isDisabled={loading}
                    isLoading={loading}
                    onClick={() => handleActionClick(order._id)}
                  >
                    ProcessOrder
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
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

export default Orders;

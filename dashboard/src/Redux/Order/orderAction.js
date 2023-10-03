import axios from "axios";

export const getOrders = (page) => async (dispatch) => {
  try {
    dispatch({
      type: "allOrderRequest",
    });

    const { data } = await axios.get(`/attar/v1/get-all-order?page=${page}`);

    dispatch({
      type: "allOrderSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "allOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const searchOrder =
  (field, value) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "searchOrderRequest",
      });
      const { data } = await axios.get(
        `/attar/v1/seach-order?field=${field}&value=${value}`
      );

      dispatch({
        type: "searchOrderSuccess",
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: "searchOrderFail",
        payload: error.response.data.message,
      });
    }
  };

  export const processOrder = (id) => async (dispatch) => {
    try {
      dispatch({ type: 'processOrderRequest' });
  
      const { data } = await axios.get(
        `/attar/v1/processing-order/${id}`      
      );
      dispatch({
        type: 'processOrderSuccess',
        payload: data.message,
      });
    console.log(data)
    } catch (error) {
      dispatch({
        type: 'processOrderFail',
        payload: error.response.data.message,
      });
    }
  };
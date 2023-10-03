import axios from "axios";
import { serverUrl } from "../store";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `/attar/v1/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFailure", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${serverUrl}/me`);
    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFailure", payload: error.response.data.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });

    await axios.get(`/attar/v1/logout`);

    dispatch({
      type: "logoutSuccess",
    });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUser = (page) => async (dispatch) => {
  try {
    dispatch({
      type: "allUserRequest",
    });

    const { data } = await axios.get(`/attar/v1/get-all-user?page=${page}`);

    dispatch({
      type: "allUserSuccess",
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: "allUserFail",
      payload: error.response.data.message,
    });
  }
};


export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "userDetailRequest" });

    const { data } = await axios.get(`/attar/v1/user/${id}`);
    dispatch({
      type: "userDetailSuccess",
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: "userDetailFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateUser = (email, role) => async (dispatch) => {
  try {
    dispatch({ type: "updateUserRequest" });
    console.log("Updating user with email:", email);
    console.log("New role:", role);

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/attar/v1/changerole`,
      { email, role }, // Send email and role as an object
      config
    );
    

    console.log("Response data:", data);
    dispatch({
      type: "updateUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateUserFail",
      payload: error.response.data.message,
    });
  }
};

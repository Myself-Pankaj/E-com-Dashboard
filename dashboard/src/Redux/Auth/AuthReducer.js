import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {},
  {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loadUserFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);


export const getUserReducer = createReducer(
  {},
  {
    allUserRequest: (state) => {
      state.loading = true;
      state.users = [];
    },
    allUserSuccess: (state = { users: [] }, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.totalPages= action.payload.totalPages;
      state.totalUser= action.payload.totalUser;
    },
    allUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);
const initialState = {
  loading: false,
  user:[],
  error: null,
};

export const userDetailReducer = createReducer(
  { initialState },
  {
    userDetailRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userDetailSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    },
    userDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);

export const updateUserReducer = createReducer(
  {},
  {
  
    updateUserRequest(state) {
      state.loading = true;
    },
    updateUserSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
      state.message = action.payload;
    },
    updateUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);
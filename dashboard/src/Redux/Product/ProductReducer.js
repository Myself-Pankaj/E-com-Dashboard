import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    loading: false,
    product:[],
    error: null,
  };

  
export const itemReducer = createReducer(
  {},
  {
    allProductRequest: (state) => {
      state.loading = true;
      state.products = [];
    },
    allProductSuccess: (state = { products: [] }, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.totalPages = action.payload.totalPages;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    allProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  }
);

export const addItemReducer = createReducer(
  {},
  {
    newProductRequest(state) {
      state.loading = true;
    },
    newProductSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
      state.message = action.payload;
      state.product = action.payload.product;
    },
    newProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    newProductReset(state) {
      state.success = false;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);

export const itemDetailReducer = createReducer(
  { initialState },
  {
    detailRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    detailSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    },
    detailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);
export const productReviewsReducer = createReducer(
  { reviews: [] },
  {
    allReviewRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    allReviewSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
      state.message = action.payload.message;
    },
    allReviewFail: (state, action) => {
      state.loading = false;
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
export const deleteItemReducer = createReducer(
  {},
  {
  
    deleteProductRequest(state) {
      state.loading = true;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
      state.message = action.payload;
    },
    deleteProductFail(state, action) {
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
export const updateItemReducer = createReducer(
  {},
  {
  
    updateProductRequest(state) {
      state.loading = true;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
      state.message = action.payload;
    },
    updateProductFail(state, action) {
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

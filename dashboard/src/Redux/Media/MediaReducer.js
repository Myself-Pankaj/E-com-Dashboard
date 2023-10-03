import { createReducer } from "@reduxjs/toolkit";

export const addVideoReducer = createReducer(
  {},
  {
    newVideoRequest(state) {
      state.loading = true;
    },
    newVideoSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
      state.message = action.message;
      state.featuredVideo = action.payload.featuredVideo;
      state.error = null;
    },
    newVideoFail(state, action) {
      state.loading = false;
      state.success = false;
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


const initialState = {
  loading: false,
  videos: null,
  error: null,
};
// export const videoReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'allVideoRequest':
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case 'allVideoSuccess':
//       return {
//         ...state,
//         loading: false,
//         videos: action.payload.videos,
//       };
  
//     case 'allVideoFail':
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case 'clearErrors':
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };
export const videoReducer = createReducer(
  {initialState},
  {
    allVideoRequest: (state) => {
      state.loading = true;
      state.videos = [];
    },
    allVideoSuccess: (state = { vedios: [] }, action) => {
      state.loading = false;
      state.videos = action.payload.videos;
      
    },
    allVideoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  }
);
import axios from "axios";


export const getAllVideos = () => async (dispatch) => {
  try {
    dispatch({
      type: "allVideoRequest",
    });

    const { data } = await axios.get(`/attar/v1/all-feature-vedios`);
    dispatch({
      type: "allVideoSuccess",
      payload: data,
    });
    console.log(data)
  } catch (error) {
    dispatch({
      type: "allVideoFail",
      payload: error.response.data.message,
    });
  }
};

export const createNewVideo = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "newVideoRequest",
    });


    const response = await axios.post(`/attar/v1/feature-vedio`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = response.data;

 

    dispatch({
      type: "newVideoSuccess",
      payload: data.message,
    });
  } catch (error) {
    console.log("Error:", error);

    dispatch({
      type: "newVideoFail",
      payload: error.response.data.message,
    });
  }
};

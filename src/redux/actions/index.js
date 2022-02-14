import axios from "axios";
const server = "https://thumb-generator-server.herokuapp.com"

export function sendVideo(payload) {
  return function (dispatch) {
    return axios
      .post(`${server}/video`, payload)
      // .post("http://localhost:3001/video", payload)
      .then((response) => {
        dispatch({
          type: "GET_THUMBNAIL",
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function sendImage(payload) {
  return function (dispatch) {
    return axios
      .post(`${server}/image`, payload.data)
      .then((response) => {
        dispatch({
          type: "GET_THUMBNAIL",
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function resetState() {
  return function (dispatch) {
    return dispatch({
      type: "RESET_STATE",
    });
  };
}

export function setLoading(payload) {
  return function (dispatch) {
    return dispatch({
      type: "SET_LOADING",
      payload,
    });
  };
}

export function reloadThumbnail (payload) {
  return function (dispatch) {
    return axios
      .get(`${server}/thumbnail`)
      .then((response) => {
        dispatch({
          type: "GET_THUMBNAIL",
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

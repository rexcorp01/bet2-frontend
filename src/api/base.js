import { url } from "./urls";
import axios from "axios";

const getAuthToken = () => {
  return JSON.parse(window.sessionStorage.getItem("authtoken"));
};

export const get = async (path) => {
  try {
    const res = await axios.get(url(path), {
      headers: { crossorigin: true, authorization: getAuthToken() },
    });
    return res;
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      return {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      };
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      return {
        request:
          error.request || "The request was made but no response was received",
      };
    } else {
      // Something happened in setting up the request and triggered an Error
      return {
        message:
          (error.response && error.response.message) ||
          "Something happened in setting up the request and triggered an Error",
      };
    }
  }
};

export const post = async (path, data = {}) => {
  try {
    const res = await axios.post(url(path), data, {
      headers: { crossorigin: true, authorization: getAuthToken() },
    });
    return res;
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      return {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      };
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      return {
        request:
          error.request || "The request was made but no response was received",
      };
    } else {
      // Something happened in setting up the request and triggered an Error
      return {
        message:
          (error.response && error.response.message) ||
          "Something happened in setting up the request and triggered an Error",
      };
    }
  }
};

export const postWithAuth = async (path, data = {}) => {
  try {
    const res = await axios.post(url(path), data, {
      headers: { crossorigin: true, authorization: "wizow" }
    });
    return res;
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      return {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers
      };
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      return {
        request:
          error.request || "The request was made but no response was received"
      };
    } else {
      // Something happened in setting up the request and triggered an Error
      return {
        message:
          (error.response && error.response.message) ||
          "Something happened in setting up the request and triggered an Error"
      };
    }
  }
};



export const put = async (path, data) => {
  try {
    const res = await axios.put(url(path), data, {
      headers: { crossorigin: true, authorization: getAuthToken() },
    });
    return res;
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      return {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      };
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      return {
        request:
          error.request || "The request was made but no response was received",
      };
    } else {
      // Something happened in setting up the request and triggered an Error
      return {
        message:
          (error.response && error.response.message) ||
          "Something happened in setting up the request and triggered an Error",
      };
    }
  }
};

export const deleteRequest = async (path, data) => {
  console.log(data)
  try {
    const res = await axios.delete(url(path), data, {
      headers: { crossorigin: true, authorization: getAuthToken() }
    });
    return res;
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      return {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers
      };
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      return {
        request:
          error.request || "The request was made but no response was received"
      };
    } else {
      // Something happened in setting up the request and triggered an Error
      return {
        message:
          (error.response && error.response.message) ||
          "Something happened in setting up the request and triggered an Error"
      };
    }
  }
};










export const postWithFormData = async (path, data) => {
  try {
    const res = await axios.post(url(path), data, {
      headers: {
        crossorigin: true,
        authorization: getAuthToken(),
        "Content-Type": "multipart/form-data"
      }
    });
    return res;
  } catch (error) {
    if (!error.response) {
      return {
        message: "An ERROR occurred please try again later"
      };
    } else if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      return {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers
      };
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      return {
        request:
          error.request || "The request was made but no response was received"
      };
    } else {
      // Something happened in setting up the request and triggered an Error
      return {
        message:
          (error.response && error.response.message) ||
          "Something happened in setting up the request and triggered an Error"
      };
    }
  }
};

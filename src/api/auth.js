import { post, postWithAuth, put } from "./base";

export const login = async (obj) => {
  const resp = await post("auth/admin/login", obj);
  return resp;
};

export const forgotPassword = async (obj) => {
  const resp = await post("auth/forgot/password", obj);
  return resp.data;
};


export const resetPassword = async (obj, userId) => {
  const resp = await postWithAuth (`auth/reset/password/${userId}`, obj)
  return resp.data;
}

export const logout = async () => {
  window.sessionStorage.removeItem("authtoken");
  return {
    message: "Successfully logged out."
  };
};


export const changePassword = async(obj) => {
  const resp = await post("auth/change/password", obj);
  return resp.data
}

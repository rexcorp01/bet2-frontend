import { get, put } from "./base";

export const getSelf = async () => {
  const resp = await get("user/self", {}, true);
  return resp.data;
};

export const updateSelf = async (obj) => {
  const resp = await put("user/self/", obj, true);
  return resp.data;
};

export const postAvatar = async (obj) => {
  const resp = await put(`user/avatar`, obj, true);
  return resp.data;
};

export const getAllUsers = async (obj) => {
  const resp = await get("user/all", obj, true);
  return resp.data
}

export const getUserDetails = async (id) => {
  const resp = await get(`admin/users/by/${id}`, {}, true);
  return resp.data
}

export const getAllDeactivated = async (obj) => {
  const resp = await get("admin/users/deactivated/all", obj, true);
  return resp.data
}

export const getAllCustomers = async (obj) => {
  const resp = await get("admin/users/customers/all", obj, true);
  return resp.data;
};

export const deactivateUserById = async (id) => {
   const resp = await put(`admin/users/deactivate/by/${id}`)
   return resp.data;
}

export const reactivateUserById = async (id) => {
  const resp = await put(`admin/users/reactivate/by/${id}`)
   return resp.data;
}

export const getAllWizards = async (obj) => {
  const resp = await get("admin/users/wizards/all", obj, true);
  return resp.data;
};

export const updateUserById = async (obj) => {
  const resp = await put(`user/update`, obj, true)
  return resp.data;
}

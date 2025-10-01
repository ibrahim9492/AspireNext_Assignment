import axios from "./axios";

// register -> POST /api/users/register
export const registerUser = async (payload) => {
  const resp = await axios.post("/users/register", payload);
  // Expect resp.data to contain token and user in either shape:
  // { data: { token, ...user } } or { token, user }
  return resp.data.data || resp.data;
};

// login -> POST /api/users/login
export const loginUser = async (payload) => {
  const resp = await axios.post("/users/login", payload);
  return resp.data.data || resp.data;
};

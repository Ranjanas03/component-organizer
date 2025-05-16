import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//Get all components
export const fetchComponents = () => API.get("/components");

//Add new component
export const createComponent = (data) => API.post("/components", data);

//Update a component
export const updateComponent = (id, data) => API.put(`/components/${id}`, data);

export const deleteComponent = (id) => API.delete(`/components/${id}`);

export default API;
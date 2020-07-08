import config from "./config.js";

const instance = axios.create({
  baseURL: config.url,
});

const create = (data) => instance.post("/projects", data);

const get = () => instance.get("/projects");

const getById = (id) => instance.get(`/projects/${id}`);

const update = (data) => instance.put(`/projects/${data.id}`, data);

const remove = (id) => instance.delete(`/projects/${id}`);

const uploadPhoto = (photos) => instance.post("/files/upload", photos);

export { create, get, getById, update, remove, uploadPhoto };

import TYPES from "./types";
import { axiosInstance } from "../../boot/axios";

export default {
  async [TYPES.GET_PROJECTS]() {
    const data = await axiosInstance.get("/projects");
  },

  async [TYPES.GET_PROJECT]() {}
};

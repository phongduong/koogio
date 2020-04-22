import TYPES from "./types";
import { axiosInstance } from "../../boot/axios";
import { Loading, LocalStorage } from "quasar";

export default {
  async [TYPES.GET_PROJECTS]({ commit, dispatch }) {
    try {
      Loading.show();
      const {
        data: { data: projects = [] }
      } = await axiosInstance.get("/projects");

      commit(TYPES.SET_PROJECTS, projects);
      dispatch(TYPES.SAVE_PROJECTS_LOCAL, projects);
    } catch (error) {
    } finally {
      Loading.hide();
    }
  },

  async [TYPES.GET_PROJECT]({ commit, dispatch }, id) {
    try {
      Loading.show();
      const {
        data: { data: project = {} }
      } = await axiosInstance.get(`/projects/${id}`);

      commit(TYPES.SET_PROJECT, project);
    } catch (error) {
    } finally {
      Loading.hide();
    }
  },

  [TYPES.SAVE_PROJECTS_LOCAL](_, projects) {
    LocalStorage.set("projects", projects);
  }
};

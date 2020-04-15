import TYPES from "./types";

export default {
  [TYPES.SET_PROJECTS](state, projects) {
    state.projects = projects;
  },
  [TYPES.SET_PROJECT](state, project) {
    state.project = project;
  }
};

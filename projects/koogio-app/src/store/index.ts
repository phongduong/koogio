import Vue from "vue";
import Vuex from "vuex";
import projects from "./projects";

Vue.use(Vuex);

export default function() {
  const Store = new Vuex.Store({
    modules: {
      projects
    },
    strict: <any>process.env.DEV
  });

  return Store;
}

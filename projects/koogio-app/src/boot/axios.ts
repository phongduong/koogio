import Vue from "vue";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://koogio-admin-cms.herokuapp.com/api/v1"
});

Vue.prototype.$axios = axiosInstance;

/// <reference path="./project.d.ts"/>
import { LocalStorage } from "quasar";

export default function(): StateInterface {
  return {
    projects: LocalStorage.has("projects")
      ? LocalStorage.getItem("projects")
      : [],
    project: {
      id: "",
      title: "",
      googleLink: "",
      description: "",
      icon: "",
      screenshots: [],
      createTime: 0
    }
  };
}

/// <reference path="./project.d.ts"/>

export default function(): StateInterface {
  return {
    projects: [],
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

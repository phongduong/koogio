import { reduceTypes } from "../utils";

const TYPES = [
  "SET_PROJECTS",
  "SET_PROJECT",
  "GET_PROJECTS",
  "GET_PROJECT",
  "SAVE_PROJECTS_LOCAL"
];

const actions: { [type: string]: string } = reduceTypes(TYPES);

export default actions;

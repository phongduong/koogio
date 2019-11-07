import { HTMLInputEvent } from "./interfaces";

export const getFieldValue = (id: string) =>
  ((document.getElementById(id) as unknown) as HTMLInputEvent).value;

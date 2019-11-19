import { getFieldValue } from "./helpers";
import { PUT } from "./request";
import { IImgElement, HTMLInputEvent } from "./interfaces";

let screenshotURLs: string[] = [];
let iconURL: string = "";

document.addEventListener("DOMContentLoaded", () => {
  iconURL = (document.querySelector(".icon img") as IImgElement).src;
  document
    .querySelectorAll("#screenshots__list img")
    .forEach((screenshot: IImgElement) => screenshotURLs.push(screenshot.src));
  console.log(iconURL, screenshotURLs);
});

document
  .querySelector(".edit-form")
  .addEventListener("submit", async (e: HTMLInputEvent) => {
    e.preventDefault();
    console.log(e);
    // try {
    //   const data: string = JSON.stringify({
    //     title: getFieldValue("title"),
    //     description: getFieldValue("description"),
    //     googleLink: getFieldValue("google-link"),
    //     icon: iconURL,
    //     screenshots: screenshotURLs
    //   });
    //   await POST("/projects", data);

    //   location.href = "/";
    // } catch (error) {
    //   console.log(error);
    // }
  });

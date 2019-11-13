import { POST, UPLOAD } from "./request";
import { HTMLInputEvent } from "./interfaces";
import {
  getFieldValue,
  drawIcon,
  drawScreenshotList,
} from "./helpers";

const screenshotsParentNode: Element = document.querySelector(
  "#screenshots__list"
);
const iconParentNode: Element = document.querySelector(".icon");
let iconURL: string = "";
let screenshotURLs: string[] = [];

document
  .querySelector("#screenshots")
  .addEventListener("change", async (e: HTMLInputEvent) => {
    const {
      target: { files }
    } = e;
    const formData = new FormData();

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await UPLOAD(formData);
      const { urls } = await response;
      screenshotURLs = urls;

      drawScreenshotList(screenshotsParentNode, screenshotURLs);
    } catch (error) {
      console.error(error);
    }
  });

document
  .querySelector("#icon")
  .addEventListener("change", async (e: HTMLInputEvent) => {
    const {
      target: { files }
    } = e;
    const formData = new FormData();
    formData.append("files", files[0]);

    try {
      const data = await UPLOAD(formData);
      const {
        urls: [url]
      } = data;

      iconURL = url;
      drawIcon(iconParentNode, url);
    } catch (error) {
      console.error(error);
    }
  });

document.querySelector(".new-form").addEventListener("submit", async e => {
  e.preventDefault();

  try {
    const data: string = JSON.stringify({
      title: getFieldValue("title"),
      description: getFieldValue("description"),
      googleLink: getFieldValue("google-link"),
      icon: iconURL,
      screenshots: screenshotURLs
    });
    await POST("/projects", data);

    location.href = "/";
  } catch (error) {
    console.log(error);
  }
});

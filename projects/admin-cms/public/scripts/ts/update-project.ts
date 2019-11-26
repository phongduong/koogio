import { PUT, UPLOAD } from "./_request";
import {
  IImgElement,
  HTMLInputEvent,
  IButtonElement,
  Data
} from "./_interfaces";
import {
  getFieldValue,
  drawIcon,
  drawScreenshotList,
  drag,
  drop
} from "./_helpers";

const screenshotsParentNode: Element = document.querySelector(
  "#screenshots__list"
);
const iconParentNode: Element = document.querySelector(".icon");
const saveButton: IButtonElement = document.querySelector(".save-button");
const screenshotURLs: string[] = [];
const updateData = new Data();

document.addEventListener("DOMContentLoaded", () => {
  updateData.setIconURL(
    (document.querySelector(".icon img") as IImgElement).src
  );
  document
    .querySelectorAll("#screenshots__list img")
    .forEach((screenshot: IImgElement) => screenshotURLs.push(screenshot.src));
  updateData.setScreenshotURLs(screenshotURLs);
  updateData.getScreenshotURLs().forEach((url, index) => {
    const node = document.querySelector(`.screenshots__list__item__${index}`);

    node.addEventListener("dragstart", (e: HTMLInputEvent) =>
      drag(e, { index, url })
    );

    node.addEventListener("drop", (e: HTMLInputEvent) =>
      drop(e, { index, url }, screenshotsParentNode, updateData)
    );

    node.addEventListener("dragover", (e: HTMLInputEvent) =>
      e.preventDefault()
    );
  });
});

document
  .querySelector(".edit-form")
  .addEventListener("submit", async (e: HTMLInputEvent) => {
    e.preventDefault();
    const {
      target: {
        dataset: { id }
      }
    } = e;
    saveButton.disabled = true;

    try {
      const data: string = JSON.stringify({
        title: getFieldValue("title"),
        description: getFieldValue("description"),
        googleLink: getFieldValue("google-link"),
        icon: updateData.getIconURL(),
        screenshots: updateData.getScreenshotURLs()
      });

      await PUT(`/projects/${id}`, data);
      saveButton.disabled = false;

      location.href = "/";
    } catch (error) {
      saveButton.disabled = false;
      console.log(error);
    }
  });

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
      updateData.setScreenshotURLs(urls);

      drawScreenshotList(screenshotsParentNode, updateData);
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

      updateData.setIconURL(url);
      drawIcon(iconParentNode, url);
    } catch (error) {
      console.error(error);
    }
  });

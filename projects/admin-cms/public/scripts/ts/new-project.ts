import { POST, UPLOAD } from "./request";
import { HTMLInputEvent, IScreenshot } from "./interfaces";
import { getFieldValue } from "./helpers";

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

  const data: FormData = new FormData();
  data.append("title", getFieldValue("title"));
  data.append("description", getFieldValue("description"));
  data.append("google-link", getFieldValue("google-link"));
  data.append("icon", iconURL);
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < screenshotURLs.length; i++) {
    data.append("screenshots", screenshotURLs[i]);
  }

  try {
    const response = await POST("/projects", data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

const drag = (e: HTMLInputEvent, url: IScreenshot) =>
  e.dataTransfer.setData("text", JSON.stringify(url));

const drop = (e: HTMLInputEvent, currentURL: IScreenshot) => {
  e.preventDefault();
  const newURL = JSON.parse(e.dataTransfer.getData("text"));
  const newScreenshotURLS = screenshotURLs.map((url, index) => {
    if (index === newURL.index) {
      return currentURL.url;
    }

    if (index === currentURL.index) {
      return newURL.url;
    }

    return url;
  });
  screenshotURLs = [...newScreenshotURLS];

  drawScreenshotList(screenshotsParentNode, newScreenshotURLS);
};

const drawScreenshotList = (screenshotsNode: Element, urls: string[]) => {
  while (screenshotsNode.firstChild) {
    screenshotsNode.removeChild(screenshotsNode.firstChild);
  }

  urls.forEach((url, index) => {
    const node = document.createElement("div");
    const imgNode = document.createElement("img");

    node.classList.add(
      "col-6",
      "col-md-3",
      "screenshots__list__item",
      `screenshots__list__item__${index}`
    );
    node.draggable = true;
    imgNode.src = url;
    imgNode.alt = "screenshot";

    node.appendChild(imgNode);
    screenshotsNode.appendChild(node);

    document
      .querySelector(`.screenshots__list__item__${index}`)
      .addEventListener("dragstart", (e: HTMLInputEvent) =>
        drag(e, { index, url })
      );

    document
      .querySelector(`.screenshots__list__item__${index}`)
      .addEventListener("drop", (e: HTMLInputEvent) => drop(e, { index, url }));

    document
      .querySelector(`.screenshots__list__item__${index}`)
      .addEventListener("dragover", (e: HTMLInputEvent) => e.preventDefault());
  });
};

const drawIcon = (iconNode: Element, url: string) => {
  while (iconNode.firstChild) {
    iconNode.removeChild(iconNode.firstChild);
  }

  const imgNode = document.createElement("img");
  imgNode.classList.add("icon__item");
  imgNode.src = url;
  imgNode.alt = "screenshot";
  iconNode.appendChild(imgNode);
};

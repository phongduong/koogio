import { HTMLInputEvent, IScreenshot } from "./interfaces";

export const getFieldValue = (id: string) =>
  ((document.getElementById(id) as unknown) as HTMLInputEvent).value;

export const drag = (e: HTMLInputEvent, url: IScreenshot) =>
  e.dataTransfer.setData("text", JSON.stringify(url));

export const drop = (
  e: HTMLInputEvent,
  currentURL: IScreenshot,
  screenshotsNode: Element,
  screenshotURLs: string[]
): string[] => {
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

  drawScreenshotList(screenshotsNode, newScreenshotURLS);

  return newScreenshotURLS;
};

export const drawScreenshotList = (
  screenshotsNode: Element,
  urls: string[]
) => {
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
      .addEventListener("drop", (e: HTMLInputEvent) =>
        drop(e, { index, url }, screenshotsNode, urls)
      );

    document
      .querySelector(`.screenshots__list__item__${index}`)
      .addEventListener("dragover", (e: HTMLInputEvent) => e.preventDefault());
  });
};

export const drawIcon = (iconNode: Element, url: string) => {
  while (iconNode.firstChild) {
    iconNode.removeChild(iconNode.firstChild);
  }

  const imgNode = document.createElement("img");
  imgNode.classList.add("icon__item");
  imgNode.src = url;
  imgNode.alt = "screenshot";
  iconNode.appendChild(imgNode);
};

import { HTMLInputEvent, IScreenshot, Data } from "./_interfaces";

export const getFieldValue = (id: string) =>
  ((document.getElementById(id) as unknown) as HTMLInputEvent).value;

export const drag = (e: HTMLInputEvent, url: IScreenshot) =>
  e.dataTransfer.setData("text", JSON.stringify(url));

export const drop = (
  e: HTMLInputEvent,
  currentURL: IScreenshot,
  screenshotsNode: Element,
  data: Data
): void => {
  e.preventDefault();
  const newURL = JSON.parse(e.dataTransfer.getData("text"));
  const newScreenshotURLS = data.getScreenshotURLs().map((url, index) => {
    if (index === newURL.index) {
      return currentURL.url;
    }

    if (index === currentURL.index) {
      return newURL.url;
    }

    return url;
  });

  data.setScreenshotURLs(newScreenshotURLS);
  drawScreenshotList(screenshotsNode, data);
};

export const drawScreenshotList = (
  screenshotsNode: Element,
  data: Data
): void => {
  while (screenshotsNode.firstChild) {
    screenshotsNode.removeChild(screenshotsNode.firstChild);
  }

  data.getScreenshotURLs().forEach((url, index) => {
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

    node.addEventListener("dragstart", (e: HTMLInputEvent) =>
      drag(e, { index, url })
    );

    node.addEventListener("drop", (e: HTMLInputEvent) =>
      drop(e, { index, url }, screenshotsNode, data)
    );

    node.addEventListener("dragover", (e: HTMLInputEvent) =>
      e.preventDefault()
    );
  });
};

export const drawIcon = (iconNode: Element, url: string) => {
  while (iconNode.firstChild) {
    iconNode.removeChild(iconNode.firstChild);
  }

  const imgNode = document.createElement("img");
  imgNode.classList.add("icon__item");
  imgNode.src = url;
  imgNode.alt = "icon";
  iconNode.appendChild(imgNode);
};

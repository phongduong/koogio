(function (factory) {
  typeof define === 'function' && define.amd ? define('home', factory) :
  factory();
}(function () { 'use strict';

  const UPLOAD = (data, url = "/images/upload") => fetch(url, {
      method: "POST",
      body: data
  }).then(res => res.json());
  const POST = (url, data) => fetch(url, {
      method: "POST",
      body: data,
      headers: {
          "Content-Type": "application/json"
      }
  }).then(res => res.json());
  //# sourceMappingURL=_request.js.map

  class Data {
      constructor() {
          this.screenshotURLs = [];
          this.iconURL = "";
      }
      setScreenshotURLs(screenshotURLs) {
          this.screenshotURLs = screenshotURLs;
      }
      getScreenshotURLs() {
          return this.screenshotURLs;
      }
      setIconURL(iconURL) {
          this.iconURL = iconURL;
      }
      getIconURL() {
          return this.iconURL;
      }
  }
  //# sourceMappingURL=_interfaces.js.map

  const getFieldValue = (id) => document.getElementById(id).value;
  const drag = (e, url) => e.dataTransfer.setData("text", JSON.stringify(url));
  const drop = (e, currentURL, screenshotsNode, data) => {
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
  const drawScreenshotList = (screenshotsNode, data) => {
      while (screenshotsNode.firstChild) {
          screenshotsNode.removeChild(screenshotsNode.firstChild);
      }
      data.getScreenshotURLs().forEach((url, index) => {
          const node = document.createElement("div");
          const imgNode = document.createElement("img");
          node.classList.add("col-6", "col-md-3", "screenshots__list__item", `screenshots__list__item__${index}`);
          node.draggable = true;
          imgNode.src = url;
          imgNode.alt = "screenshot";
          node.appendChild(imgNode);
          screenshotsNode.appendChild(node);
          node.addEventListener("dragstart", (e) => drag(e, { index, url }));
          node.addEventListener("drop", (e) => drop(e, { index, url }, screenshotsNode, data));
          node.addEventListener("dragover", (e) => e.preventDefault());
      });
  };
  const drawIcon = (iconNode, url) => {
      while (iconNode.firstChild) {
          iconNode.removeChild(iconNode.firstChild);
      }
      const imgNode = document.createElement("img");
      imgNode.classList.add("icon__item");
      imgNode.src = url;
      imgNode.alt = "icon";
      iconNode.appendChild(imgNode);
  };
  //# sourceMappingURL=_helpers.js.map

  const screenshotsParentNode = document.querySelector("#screenshots__list");
  const iconParentNode = document.querySelector(".icon");
  const newData = new Data();
  document
      .querySelector("#screenshots")
      .addEventListener("change", async (e) => {
      const { target: { files } } = e;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
      }
      try {
          const response = await UPLOAD(formData);
          const { urls } = await response;
          newData.setScreenshotURLs(urls);
          drawScreenshotList(screenshotsParentNode, newData);
      }
      catch (error) {
          console.error(error);
      }
  });
  document
      .querySelector("#icon")
      .addEventListener("change", async (e) => {
      const { target: { files } } = e;
      const formData = new FormData();
      formData.append("files", files[0]);
      try {
          const data = await UPLOAD(formData);
          const { urls: [url] } = data;
          newData.setIconURL(url);
          drawIcon(iconParentNode, url);
      }
      catch (error) {
          console.error(error);
      }
  });
  document.querySelector(".new-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
          const data = JSON.stringify({
              title: getFieldValue("title"),
              description: getFieldValue("description"),
              googleLink: getFieldValue("google-link"),
              icon: newData.getIconURL(),
              screenshots: newData.getScreenshotURLs()
          });
          await POST("/projects", data);
          location.href = "/";
      }
      catch (error) {
          console.log(error);
      }
  });
  //# sourceMappingURL=new-project.js.map

}));

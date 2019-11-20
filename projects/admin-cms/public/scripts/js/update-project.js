(function (factory) {
  typeof define === 'function' && define.amd ? define('home', factory) :
  factory();
}(function () { 'use strict';

  const UPLOAD = (data, url = "/images/upload") => fetch(url, {
      method: "POST",
      body: data
  }).then(res => res.json());
  const PUT = (url, data) => fetch(url, {
      method: "PUT",
      body: data,
      headers: {
          "Content-Type": "application/json"
      }
  }).then(res => res.json());
  //# sourceMappingURL=_request.js.map

  const getFieldValue = (id) => document.getElementById(id).value;
  const drag = (e, url) => e.dataTransfer.setData("text", JSON.stringify(url));
  const drop = (e, currentURL, screenshotsNode, screenshotURLs) => {
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
  const drawScreenshotList = (screenshotsNode, urls) => {
      while (screenshotsNode.firstChild) {
          screenshotsNode.removeChild(screenshotsNode.firstChild);
      }
      urls.forEach((url, index) => {
          const node = document.createElement("div");
          const imgNode = document.createElement("img");
          node.classList.add("col-6", "col-md-3", "screenshots__list__item", `screenshots__list__item__${index}`);
          node.draggable = true;
          imgNode.src = url;
          imgNode.alt = "screenshot";
          node.appendChild(imgNode);
          screenshotsNode.appendChild(node);
          node.addEventListener("dragstart", (e) => drag(e, { index, url }));
          node.addEventListener("drop", (e) => drop(e, { index, url }, screenshotsNode, urls));
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

  const screenshotsParentNode = document.querySelector("#screenshots__list");
  const iconParentNode = document.querySelector(".icon");
  const saveButton = document.querySelector(".save-button");
  let screenshotURLs = [];
  let iconURL = "";
  document.addEventListener("DOMContentLoaded", () => {
      iconURL = document.querySelector(".icon img").src;
      document
          .querySelectorAll("#screenshots__list img")
          .forEach((screenshot) => screenshotURLs.push(screenshot.src));
      screenshotURLs.forEach((url, index) => {
          const node = document.querySelector(`.screenshots__list__item__${index}`);
          node.addEventListener("dragstart", (e) => drag(e, { index, url }));
          node.addEventListener("drop", (e) => drop(e, { index, url }, screenshotsParentNode, screenshotURLs));
          node.addEventListener("dragover", (e) => e.preventDefault());
      });
  });
  document
      .querySelector(".edit-form")
      .addEventListener("submit", async (e) => {
      e.preventDefault();
      const { target: { dataset: { id } } } = e;
      saveButton.disabled = true;
      try {
          const data = JSON.stringify({
              title: getFieldValue("title"),
              description: getFieldValue("description"),
              googleLink: getFieldValue("google-link"),
              icon: iconURL,
              screenshots: screenshotURLs
          });
          await PUT(`/projects/${id}`, data);
          saveButton.disabled = false;
          location.href = "/";
      }
      catch (error) {
          saveButton.disabled = false;
          console.log(error);
      }
  });
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
          screenshotURLs = urls;
          drawScreenshotList(screenshotsParentNode, screenshotURLs);
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
          iconURL = url;
          drawIcon(iconParentNode, url);
      }
      catch (error) {
          console.error(error);
      }
  });
  //# sourceMappingURL=update-project.js.map

}));

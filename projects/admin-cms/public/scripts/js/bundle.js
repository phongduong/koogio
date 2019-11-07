(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = (url, data) => fetch(url, {
    method: "POST",
    body: data,
}).then(res => res.json());
exports.GET = (url, data) => fetch(url).then(res => res.json());
exports.PUT = (url, data) => fetch(url, {
    method: "PUT",
    body: data,
}).then(res => res.json());
exports.DELETE = (url) => fetch(url, { method: "DELETE" }).then(res => res.json());

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
const screenshotsParentNode = document.querySelector("#screenshots__list");
const iconParentNode = document.querySelector(".icon");
let screenshotURLs = [];
document
    .querySelector("#screenshots")
    .addEventListener("change", async (e) => {
    const { target: { files }, } = e;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
    }
    try {
        const response = await request_1.POST("/image/upload", formData);
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
    const { target: { files }, } = e;
    const formData = new FormData();
    formData.append("files", files[0]);
    try {
        const data = await request_1.POST("/image/upload", formData);
        const { urls: [url], } = data;
        drawIcon(iconParentNode, url);
    }
    catch (error) {
        console.error(error);
    }
});
const drag = (e, url) => e.dataTransfer.setData("text", JSON.stringify(url));
const drop = (e, currentURL) => {
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
        document
            .querySelector(`.screenshots__list__item__${index}`)
            .addEventListener("dragstart", (e) => drag(e, { index, url }));
        document
            .querySelector(`.screenshots__list__item__${index}`)
            .addEventListener("drop", (e) => drop(e, { index, url }));
        document
            .querySelector(`.screenshots__list__item__${index}`)
            .addEventListener("dragover", (e) => e.preventDefault());
    });
};
const drawIcon = (iconNode, url) => {
    while (iconNode.firstChild) {
        iconNode.removeChild(iconNode.firstChild);
    }
    const imgNode = document.createElement("img");
    imgNode.classList.add("icon__item");
    imgNode.src = url;
    imgNode.alt = "screenshot";
    iconNode.appendChild(imgNode);
};

},{"./request":2}]},{},[1,2,3]);

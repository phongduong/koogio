(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldValue = (id) => document.getElementById(id).value;
exports.drag = (e, url) => e.dataTransfer.setData("text", JSON.stringify(url));
exports.drop = (e, currentURL, screenshotsNode, screenshotURLs) => {
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
    exports.drawScreenshotList(screenshotsNode, newScreenshotURLS);
    return newScreenshotURLS;
};
exports.drawScreenshotList = (screenshotsNode, urls) => {
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
            .addEventListener("dragstart", (e) => exports.drag(e, { index, url }));
        document
            .querySelector(`.screenshots__list__item__${index}`)
            .addEventListener("drop", (e) => exports.drop(e, { index, url }, screenshotsNode, urls));
        document
            .querySelector(`.screenshots__list__item__${index}`)
            .addEventListener("dragover", (e) => e.preventDefault());
    });
};
exports.drawIcon = (iconNode, url) => {
    while (iconNode.firstChild) {
        iconNode.removeChild(iconNode.firstChild);
    }
    const imgNode = document.createElement("img");
    imgNode.classList.add("icon__item");
    imgNode.src = url;
    imgNode.alt = "screenshot";
    iconNode.appendChild(imgNode);
};

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
const helpers_1 = require("./helpers");
const screenshotsParentNode = document.querySelector("#screenshots__list");
const iconParentNode = document.querySelector(".icon");
let iconURL = "";
let screenshotURLs = [];
document
    .querySelector("#screenshots")
    .addEventListener("change", async (e) => {
    const { target: { files } } = e;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
    }
    try {
        const response = await request_1.UPLOAD(formData);
        const { urls } = await response;
        screenshotURLs = urls;
        helpers_1.drawScreenshotList(screenshotsParentNode, screenshotURLs);
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
        const data = await request_1.UPLOAD(formData);
        const { urls: [url] } = data;
        iconURL = url;
        helpers_1.drawIcon(iconParentNode, url);
    }
    catch (error) {
        console.error(error);
    }
});
document.querySelector(".new-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const data = JSON.stringify({
            title: helpers_1.getFieldValue("title"),
            description: helpers_1.getFieldValue("description"),
            googleLink: helpers_1.getFieldValue("google-link"),
            icon: iconURL,
            screenshots: screenshotURLs
        });
        await request_1.POST("/projects", data);
        location.href = "/";
    }
    catch (error) {
        console.log(error);
    }
});

},{"./helpers":1,"./request":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD = (data, url = "/images/upload") => fetch(url, {
    method: "POST",
    body: data
}).then(res => res.json());
exports.POST = (url, data) => fetch(url, {
    method: "POST",
    body: data,
    headers: {
        "Content-Type": "application/json"
    }
}).then(res => res.json());
exports.GET = (url) => fetch(url).then(res => res.json());
exports.PUT = (url, data) => fetch(url, {
    method: "PUT",
    body: data,
    headers: {
        "Content-Type": "application/json"
    }
}).then(res => res.json());
exports.DELETE = (url) => fetch(url, { method: "DELETE" }).then(res => res.json());

},{}]},{},[1,2,3,4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvc2NyaXB0cy90cy9oZWxwZXJzLnRzIiwicHVibGljL3NjcmlwdHMvdHMvbmV3LXByb2plY3QudHMiLCJwdWJsaWMvc2NyaXB0cy90cy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFYSxRQUFBLGFBQWEsR0FBRyxDQUFDLEVBQVUsRUFBRSxFQUFFLENBQ3hDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFnQyxDQUFDLEtBQUssQ0FBQztBQUV4RCxRQUFBLElBQUksR0FBRyxDQUFDLENBQWlCLEVBQUUsR0FBZ0IsRUFBRSxFQUFFLENBQzFELENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFFekMsUUFBQSxJQUFJLEdBQUcsQ0FDbEIsQ0FBaUIsRUFDakIsVUFBdUIsRUFDdkIsZUFBd0IsRUFDeEIsY0FBd0IsRUFDZCxFQUFFO0lBQ1osQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMxRCxNQUFNLGlCQUFpQixHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDMUQsSUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDLEtBQUssRUFBRTtZQUMxQixPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUM7U0FDdkI7UUFFRCxJQUFJLEtBQUssS0FBSyxVQUFVLENBQUMsS0FBSyxFQUFFO1lBQzlCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNuQjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7SUFF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Q0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFaEIsUUFBQSxJQUFJLEdBQUcsQ0FBQyxHQUFXLEVBQUUsSUFBdUIsRUFBZ0IsRUFBRSxDQUN6RSxLQUFLLENBQUMsR0FBRyxFQUFFO0lBQ1QsTUFBTSxFQUFFLE1BQU07SUFDZCxJQUFJLEVBQUUsSUFBSTtJQUNWLE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRSxrQkFBa0I7S0FDbkM7Q0FDRixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFaEIsUUFBQSxHQUFHLEdBQUcsQ0FBQyxHQUFXLEVBQWdCLEVBQUUsQ0FDL0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRXhCLFFBQUEsR0FBRyxHQUFHLENBQUMsR0FBVyxFQUFFLElBQXVCLEVBQWdCLEVBQUUsQ0FDeEUsS0FBSyxDQUFDLEdBQUcsRUFBRTtJQUNULE1BQU0sRUFBRSxLQUFLO0lBQ2IsSUFBSSxFQUFFLElBQUk7SUFDVixPQUFPLEVBQUU7UUFDUCxjQUFjLEVBQUUsa0JBQWtCO0tBQ25DO0NBQ0YsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRWhCLFFBQUEsTUFBTSxHQUFHLENBQUMsR0FBVyxFQUFnQixFQUFFLENBQ2xELEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IEhUTUxJbnB1dEV2ZW50LCBJU2NyZWVuc2hvdCB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRGaWVsZFZhbHVlID0gKGlkOiBzdHJpbmcpID0+XHJcbiAgKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgYXMgdW5rbm93bikgYXMgSFRNTElucHV0RXZlbnQpLnZhbHVlO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRyYWcgPSAoZTogSFRNTElucHV0RXZlbnQsIHVybDogSVNjcmVlbnNob3QpID0+XHJcbiAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgSlNPTi5zdHJpbmdpZnkodXJsKSk7XHJcblxyXG5leHBvcnQgY29uc3QgZHJvcCA9IChcclxuICBlOiBIVE1MSW5wdXRFdmVudCxcclxuICBjdXJyZW50VVJMOiBJU2NyZWVuc2hvdCxcclxuICBzY3JlZW5zaG90c05vZGU6IEVsZW1lbnQsXHJcbiAgc2NyZWVuc2hvdFVSTHM6IHN0cmluZ1tdXHJcbik6IHN0cmluZ1tdID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY29uc3QgbmV3VVJMID0gSlNPTi5wYXJzZShlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKSk7XHJcbiAgY29uc3QgbmV3U2NyZWVuc2hvdFVSTFMgPSBzY3JlZW5zaG90VVJMcy5tYXAoKHVybCwgaW5kZXgpID0+IHtcclxuICAgIGlmIChpbmRleCA9PT0gbmV3VVJMLmluZGV4KSB7XHJcbiAgICAgIHJldHVybiBjdXJyZW50VVJMLnVybDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5kZXggPT09IGN1cnJlbnRVUkwuaW5kZXgpIHtcclxuICAgICAgcmV0dXJuIG5ld1VSTC51cmw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHVybDtcclxuICB9KTtcclxuXHJcbiAgZHJhd1NjcmVlbnNob3RMaXN0KHNjcmVlbnNob3RzTm9kZSwgbmV3U2NyZWVuc2hvdFVSTFMpO1xyXG5cclxuICByZXR1cm4gbmV3U2NyZWVuc2hvdFVSTFM7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZHJhd1NjcmVlbnNob3RMaXN0ID0gKFxyXG4gIHNjcmVlbnNob3RzTm9kZTogRWxlbWVudCxcclxuICB1cmxzOiBzdHJpbmdbXVxyXG4pID0+IHtcclxuICB3aGlsZSAoc2NyZWVuc2hvdHNOb2RlLmZpcnN0Q2hpbGQpIHtcclxuICAgIHNjcmVlbnNob3RzTm9kZS5yZW1vdmVDaGlsZChzY3JlZW5zaG90c05vZGUuZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG5cclxuICB1cmxzLmZvckVhY2goKHVybCwgaW5kZXgpID0+IHtcclxuICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29uc3QgaW1nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcblxyXG4gICAgbm9kZS5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICBcImNvbC02XCIsXHJcbiAgICAgIFwiY29sLW1kLTNcIixcclxuICAgICAgXCJzY3JlZW5zaG90c19fbGlzdF9faXRlbVwiLFxyXG4gICAgICBgc2NyZWVuc2hvdHNfX2xpc3RfX2l0ZW1fXyR7aW5kZXh9YFxyXG4gICAgKTtcclxuICAgIG5vZGUuZHJhZ2dhYmxlID0gdHJ1ZTtcclxuICAgIGltZ05vZGUuc3JjID0gdXJsO1xyXG4gICAgaW1nTm9kZS5hbHQgPSBcInNjcmVlbnNob3RcIjtcclxuXHJcbiAgICBub2RlLmFwcGVuZENoaWxkKGltZ05vZGUpO1xyXG4gICAgc2NyZWVuc2hvdHNOb2RlLmFwcGVuZENoaWxkKG5vZGUpO1xyXG5cclxuICAgIGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuc2NyZWVuc2hvdHNfX2xpc3RfX2l0ZW1fXyR7aW5kZXh9YClcclxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgKGU6IEhUTUxJbnB1dEV2ZW50KSA9PlxyXG4gICAgICAgIGRyYWcoZSwgeyBpbmRleCwgdXJsIH0pXHJcbiAgICAgICk7XHJcblxyXG4gICAgZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC5zY3JlZW5zaG90c19fbGlzdF9faXRlbV9fJHtpbmRleH1gKVxyXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGU6IEhUTUxJbnB1dEV2ZW50KSA9PlxyXG4gICAgICAgIGRyb3AoZSwgeyBpbmRleCwgdXJsIH0sIHNjcmVlbnNob3RzTm9kZSwgdXJscylcclxuICAgICAgKTtcclxuXHJcbiAgICBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcihgLnNjcmVlbnNob3RzX19saXN0X19pdGVtX18ke2luZGV4fWApXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGU6IEhUTUxJbnB1dEV2ZW50KSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRyYXdJY29uID0gKGljb25Ob2RlOiBFbGVtZW50LCB1cmw6IHN0cmluZykgPT4ge1xyXG4gIHdoaWxlIChpY29uTm9kZS5maXJzdENoaWxkKSB7XHJcbiAgICBpY29uTm9kZS5yZW1vdmVDaGlsZChpY29uTm9kZS5maXJzdENoaWxkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGltZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gIGltZ05vZGUuY2xhc3NMaXN0LmFkZChcImljb25fX2l0ZW1cIik7XHJcbiAgaW1nTm9kZS5zcmMgPSB1cmw7XHJcbiAgaW1nTm9kZS5hbHQgPSBcInNjcmVlbnNob3RcIjtcclxuICBpY29uTm9kZS5hcHBlbmRDaGlsZChpbWdOb2RlKTtcclxufTtcclxuIiwiaW1wb3J0IHsgUE9TVCwgVVBMT0FEIH0gZnJvbSBcIi4vcmVxdWVzdFwiO1xyXG5pbXBvcnQgeyBIVE1MSW5wdXRFdmVudCB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHtcclxuICBnZXRGaWVsZFZhbHVlLFxyXG4gIGRyYXdJY29uLFxyXG4gIGRyYXdTY3JlZW5zaG90TGlzdCxcclxufSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcblxyXG5jb25zdCBzY3JlZW5zaG90c1BhcmVudE5vZGU6IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gIFwiI3NjcmVlbnNob3RzX19saXN0XCJcclxuKTtcclxuY29uc3QgaWNvblBhcmVudE5vZGU6IEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25cIik7XHJcbmxldCBpY29uVVJMOiBzdHJpbmcgPSBcIlwiO1xyXG5sZXQgc2NyZWVuc2hvdFVSTHM6IHN0cmluZ1tdID0gW107XHJcblxyXG5kb2N1bWVudFxyXG4gIC5xdWVyeVNlbGVjdG9yKFwiI3NjcmVlbnNob3RzXCIpXHJcbiAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgYXN5bmMgKGU6IEhUTUxJbnB1dEV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHRhcmdldDogeyBmaWxlcyB9XHJcbiAgICB9ID0gZTtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBwcmVmZXItZm9yLW9mXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChcImZpbGVzXCIsIGZpbGVzW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFVQTE9BRChmb3JtRGF0YSk7XHJcbiAgICAgIGNvbnN0IHsgdXJscyB9ID0gYXdhaXQgcmVzcG9uc2U7XHJcbiAgICAgIHNjcmVlbnNob3RVUkxzID0gdXJscztcclxuXHJcbiAgICAgIGRyYXdTY3JlZW5zaG90TGlzdChzY3JlZW5zaG90c1BhcmVudE5vZGUsIHNjcmVlbnNob3RVUkxzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuZG9jdW1lbnRcclxuICAucXVlcnlTZWxlY3RvcihcIiNpY29uXCIpXHJcbiAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgYXN5bmMgKGU6IEhUTUxJbnB1dEV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHRhcmdldDogeyBmaWxlcyB9XHJcbiAgICB9ID0gZTtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJmaWxlc1wiLCBmaWxlc1swXSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IFVQTE9BRChmb3JtRGF0YSk7XHJcbiAgICAgIGNvbnN0IHtcclxuICAgICAgICB1cmxzOiBbdXJsXVxyXG4gICAgICB9ID0gZGF0YTtcclxuXHJcbiAgICAgIGljb25VUkwgPSB1cmw7XHJcbiAgICAgIGRyYXdJY29uKGljb25QYXJlbnROb2RlLCB1cmwpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ldy1mb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgZSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgZGF0YTogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICB0aXRsZTogZ2V0RmllbGRWYWx1ZShcInRpdGxlXCIpLFxyXG4gICAgICBkZXNjcmlwdGlvbjogZ2V0RmllbGRWYWx1ZShcImRlc2NyaXB0aW9uXCIpLFxyXG4gICAgICBnb29nbGVMaW5rOiBnZXRGaWVsZFZhbHVlKFwiZ29vZ2xlLWxpbmtcIiksXHJcbiAgICAgIGljb246IGljb25VUkwsXHJcbiAgICAgIHNjcmVlbnNob3RzOiBzY3JlZW5zaG90VVJMc1xyXG4gICAgfSk7XHJcbiAgICBhd2FpdCBQT1NUKFwiL3Byb2plY3RzXCIsIGRhdGEpO1xyXG5cclxuICAgIGxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gIH1cclxufSk7XHJcbiIsImV4cG9ydCBjb25zdCBVUExPQUQgPSAoXHJcbiAgZGF0YTogRm9ybURhdGEsXHJcbiAgdXJsOiBzdHJpbmcgPSBcIi9pbWFnZXMvdXBsb2FkXCJcclxuKTogUHJvbWlzZTxhbnk+ID0+XHJcbiAgZmV0Y2godXJsLCB7XHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgYm9keTogZGF0YVxyXG4gIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBPU1QgPSAodXJsOiBzdHJpbmcsIGRhdGE6IEZvcm1EYXRhIHwgc3RyaW5nKTogUHJvbWlzZTxhbnk+ID0+XHJcbiAgZmV0Y2godXJsLCB7XHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgYm9keTogZGF0YSxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgIH1cclxuICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcclxuXHJcbmV4cG9ydCBjb25zdCBHRVQgPSAodXJsOiBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT5cclxuICBmZXRjaCh1cmwpLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBVVCA9ICh1cmw6IHN0cmluZywgZGF0YTogRm9ybURhdGEgfCBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT5cclxuICBmZXRjaCh1cmwsIHtcclxuICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgIGJvZHk6IGRhdGEsXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICB9XHJcbiAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSk7XHJcblxyXG5leHBvcnQgY29uc3QgREVMRVRFID0gKHVybDogc3RyaW5nKTogUHJvbWlzZTxhbnk+ID0+XHJcbiAgZmV0Y2godXJsLCB7IG1ldGhvZDogXCJERUxFVEVcIiB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcclxuIl19
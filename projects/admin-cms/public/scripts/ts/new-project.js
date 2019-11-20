require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({3:[function(require,module,exports){
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

},{"./helpers":1,"./request":4}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvc2NyaXB0cy90cy9uZXctcHJvamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsdUNBQXlDO0FBRXpDLHVDQUltQjtBQUVuQixNQUFNLHFCQUFxQixHQUFZLFFBQVEsQ0FBQyxhQUFhLENBQzNELG9CQUFvQixDQUNyQixDQUFDO0FBQ0YsTUFBTSxjQUFjLEdBQVksUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoRSxJQUFJLE9BQU8sR0FBVyxFQUFFLENBQUM7QUFDekIsSUFBSSxjQUFjLEdBQWEsRUFBRSxDQUFDO0FBRWxDLFFBQVE7S0FDTCxhQUFhLENBQUMsY0FBYyxDQUFDO0tBQzdCLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBaUIsRUFBRSxFQUFFO0lBQ3RELE1BQU0sRUFDSixNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFDbEIsR0FBRyxDQUFDLENBQUM7SUFDTixNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBR2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsSUFBSTtRQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxRQUFRLENBQUM7UUFDaEMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUV0Qiw0QkFBa0IsQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLENBQUMsQ0FBQztLQUMzRDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN0QjtBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUwsUUFBUTtLQUNMLGFBQWEsQ0FBQyxPQUFPLENBQUM7S0FDdEIsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFpQixFQUFFLEVBQUU7SUFDdEQsTUFBTSxFQUNKLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUNsQixHQUFHLENBQUMsQ0FBQztJQUNOLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDaEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkMsSUFBSTtRQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxNQUFNLEVBQ0osSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQ1osR0FBRyxJQUFJLENBQUM7UUFFVCxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ2Qsa0JBQVEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDL0I7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEI7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVMLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBRTtJQUN2RSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFFbkIsSUFBSTtRQUNGLE1BQU0sSUFBSSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEMsS0FBSyxFQUFFLHVCQUFhLENBQUMsT0FBTyxDQUFDO1lBQzdCLFdBQVcsRUFBRSx1QkFBYSxDQUFDLGFBQWEsQ0FBQztZQUN6QyxVQUFVLEVBQUUsdUJBQWEsQ0FBQyxhQUFhLENBQUM7WUFDeEMsSUFBSSxFQUFFLE9BQU87WUFDYixXQUFXLEVBQUUsY0FBYztTQUM1QixDQUFDLENBQUM7UUFDSCxNQUFNLGNBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFOUIsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7S0FDckI7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEI7QUFDSCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBQT1NULCBVUExPQUQgfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IEhUTUxJbnB1dEV2ZW50IH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQge1xyXG4gIGdldEZpZWxkVmFsdWUsXHJcbiAgZHJhd0ljb24sXHJcbiAgZHJhd1NjcmVlbnNob3RMaXN0LFxyXG59IGZyb20gXCIuL2hlbHBlcnNcIjtcclxuXHJcbmNvbnN0IHNjcmVlbnNob3RzUGFyZW50Tm9kZTogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgXCIjc2NyZWVuc2hvdHNfX2xpc3RcIlxyXG4pO1xyXG5jb25zdCBpY29uUGFyZW50Tm9kZTogRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvblwiKTtcclxubGV0IGljb25VUkw6IHN0cmluZyA9IFwiXCI7XHJcbmxldCBzY3JlZW5zaG90VVJMczogc3RyaW5nW10gPSBbXTtcclxuXHJcbmRvY3VtZW50XHJcbiAgLnF1ZXJ5U2VsZWN0b3IoXCIjc2NyZWVuc2hvdHNcIilcclxuICAuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBhc3luYyAoZTogSFRNTElucHV0RXZlbnQpID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgdGFyZ2V0OiB7IGZpbGVzIH1cclxuICAgIH0gPSBlO1xyXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHByZWZlci1mb3Itb2ZcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKFwiZmlsZXNcIiwgZmlsZXNbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgVVBMT0FEKGZvcm1EYXRhKTtcclxuICAgICAgY29uc3QgeyB1cmxzIH0gPSBhd2FpdCByZXNwb25zZTtcclxuICAgICAgc2NyZWVuc2hvdFVSTHMgPSB1cmxzO1xyXG5cclxuICAgICAgZHJhd1NjcmVlbnNob3RMaXN0KHNjcmVlbnNob3RzUGFyZW50Tm9kZSwgc2NyZWVuc2hvdFVSTHMpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG5kb2N1bWVudFxyXG4gIC5xdWVyeVNlbGVjdG9yKFwiI2ljb25cIilcclxuICAuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBhc3luYyAoZTogSFRNTElucHV0RXZlbnQpID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgdGFyZ2V0OiB7IGZpbGVzIH1cclxuICAgIH0gPSBlO1xyXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZChcImZpbGVzXCIsIGZpbGVzWzBdKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgVVBMT0FEKGZvcm1EYXRhKTtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIHVybHM6IFt1cmxdXHJcbiAgICAgIH0gPSBkYXRhO1xyXG5cclxuICAgICAgaWNvblVSTCA9IHVybDtcclxuICAgICAgZHJhd0ljb24oaWNvblBhcmVudE5vZGUsIHVybCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LWZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBhc3luYyBlID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBkYXRhOiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIHRpdGxlOiBnZXRGaWVsZFZhbHVlKFwidGl0bGVcIiksXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBnZXRGaWVsZFZhbHVlKFwiZGVzY3JpcHRpb25cIiksXHJcbiAgICAgIGdvb2dsZUxpbms6IGdldEZpZWxkVmFsdWUoXCJnb29nbGUtbGlua1wiKSxcclxuICAgICAgaWNvbjogaWNvblVSTCxcclxuICAgICAgc2NyZWVuc2hvdHM6IHNjcmVlbnNob3RVUkxzXHJcbiAgICB9KTtcclxuICAgIGF3YWl0IFBPU1QoXCIvcHJvamVjdHNcIiwgZGF0YSk7XHJcblxyXG4gICAgbG9jYXRpb24uaHJlZiA9IFwiL1wiO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgfVxyXG59KTtcclxuIl19

require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let screenshotURLs = [];
let iconURL = "";
document.addEventListener("DOMContentLoaded", () => {
    iconURL = document.querySelector(".icon img").src;
    document
        .querySelectorAll("#screenshots__list img")
        .forEach((screenshot) => screenshotURLs.push(screenshot.src));
    console.log(iconURL, screenshotURLs);
});
document
    .querySelector(".edit-form")
    .addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(e);
});

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvc2NyaXB0cy90cy91cGRhdGUtcHJvamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDSUEsSUFBSSxjQUFjLEdBQWEsRUFBRSxDQUFDO0FBQ2xDLElBQUksT0FBTyxHQUFXLEVBQUUsQ0FBQztBQUV6QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBQ2pELE9BQU8sR0FBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBaUIsQ0FBQyxHQUFHLENBQUM7SUFDbkUsUUFBUTtTQUNMLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDO1NBQzFDLE9BQU8sQ0FBQyxDQUFDLFVBQXVCLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRO0tBQ0wsYUFBYSxDQUFDLFlBQVksQ0FBQztLQUMzQixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQWlCLEVBQUUsRUFBRTtJQUN0RCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQWVqQixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBnZXRGaWVsZFZhbHVlIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xyXG5pbXBvcnQgeyBQVVQgfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IElJbWdFbGVtZW50LCBIVE1MSW5wdXRFdmVudCB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbmxldCBzY3JlZW5zaG90VVJMczogc3RyaW5nW10gPSBbXTtcclxubGV0IGljb25VUkw6IHN0cmluZyA9IFwiXCI7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgaWNvblVSTCA9IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb24gaW1nXCIpIGFzIElJbWdFbGVtZW50KS5zcmM7XHJcbiAgZG9jdW1lbnRcclxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiI3NjcmVlbnNob3RzX19saXN0IGltZ1wiKVxyXG4gICAgLmZvckVhY2goKHNjcmVlbnNob3Q6IElJbWdFbGVtZW50KSA9PiBzY3JlZW5zaG90VVJMcy5wdXNoKHNjcmVlbnNob3Quc3JjKSk7XHJcbiAgY29uc29sZS5sb2coaWNvblVSTCwgc2NyZWVuc2hvdFVSTHMpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50XHJcbiAgLnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdC1mb3JtXCIpXHJcbiAgLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgKGU6IEhUTUxJbnB1dEV2ZW50KSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgIC8vIHRyeSB7XHJcbiAgICAvLyAgIGNvbnN0IGRhdGE6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgIC8vICAgICB0aXRsZTogZ2V0RmllbGRWYWx1ZShcInRpdGxlXCIpLFxyXG4gICAgLy8gICAgIGRlc2NyaXB0aW9uOiBnZXRGaWVsZFZhbHVlKFwiZGVzY3JpcHRpb25cIiksXHJcbiAgICAvLyAgICAgZ29vZ2xlTGluazogZ2V0RmllbGRWYWx1ZShcImdvb2dsZS1saW5rXCIpLFxyXG4gICAgLy8gICAgIGljb246IGljb25VUkwsXHJcbiAgICAvLyAgICAgc2NyZWVuc2hvdHM6IHNjcmVlbnNob3RVUkxzXHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8gICBhd2FpdCBQT1NUKFwiL3Byb2plY3RzXCIsIGRhdGEpO1xyXG5cclxuICAgIC8vICAgbG9jYXRpb24uaHJlZiA9IFwiL1wiO1xyXG4gICAgLy8gfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIC8vICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgLy8gfVxyXG4gIH0pO1xyXG4iXX0=

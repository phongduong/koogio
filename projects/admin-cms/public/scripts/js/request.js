"use strict";
exports.__esModule = true;
exports.POST = function (url, data) {
    return fetch(url, {
        method: "POST",
        body: data
    }).then(function (res) { return res.json(); });
};
exports.GET = function (url, data) {
    return fetch(url).then(function (res) { return res.json(); });
};
exports.PUT = function (url, data) {
    return fetch(url, {
        method: "PUT",
        body: data
    }).then(function (res) { return res.json(); });
};
exports.DELETE = function (url) {
    return fetch(url, { method: "DELETE" }).then(function (res) { return res.json(); });
};

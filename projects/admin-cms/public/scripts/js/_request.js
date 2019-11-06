"use strict";
exports.__esModule = true;
exports.POST = function (url, data) {
    return fetch(url, {
        method: 'POST',
        body: data
    });
};
exports.GET = function (url, data) { return fetch(url); };
exports.PUT = function (url, data) {
    return fetch(url, {
        method: 'PUT',
        body: data
    });
};
exports.DELETE = function (url) { return fetch(url, { method: 'DELETE' }); };

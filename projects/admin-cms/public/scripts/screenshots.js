(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    const POST = (url, data) => fetch(url, {
        method: 'POST',
        body: data,
    });

    const screenshotsParentNode = document.querySelector('#screenshots__list');
    const iconParentNode = document.querySelector('.icon');
    let screenshotURLs = [];
    document
        .querySelector('#screenshots')
        .addEventListener('change', (e) => __awaiter(void 0, void 0, void 0, function* () {
        const { target: { files }, } = e;
        const formData = new FormData();
        for (const file of files) {
            formData.append('files', file);
        }
        try {
            const response = yield POST('/image/upload', formData);
            const { urls } = yield response.json();
            screenshotURLs = urls;
            drawScreenshotList(screenshotsParentNode, screenshotURLs);
        }
        catch (error) {
            console.error(error);
        }
    }));
    document
        .querySelector('#icon')
        .addEventListener('change', (e) => __awaiter(void 0, void 0, void 0, function* () {
        const { target: { files: [icon], }, } = e;
        const formData = new FormData();
        formData.append('files', icon);
        try {
            const response = yield POST('/image/upload', formData);
            const { urls: [url], } = yield response.json();
            drawIcon(iconParentNode, url);
        }
        catch (error) {
            console.error(error);
        }
    }));
    const drag = (e, url) => e.dataTransfer.setData('text', JSON.stringify(url));
    const drop = (e, currentURL) => {
        e.preventDefault();
        const newURL = JSON.parse(e.dataTransfer.getData('text'));
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
            const node = document.createElement('div');
            const childNode = document.createElement('div');
            node.classList.add('col-6', 'col-md-3', 'screenshots__list__item', `screenshots__list__item__${index}`);
            node.draggable = true;
            childNode.style.backgroundImage = `url(${url})`;
            node.appendChild(childNode);
            screenshotsNode.appendChild(node);
            document
                .querySelector(`.screenshots__list__item__${index}`)
                .addEventListener('dragstart', (e) => drag(e, { index, url }));
            document
                .querySelector(`.screenshots__list__item__${index}`)
                .addEventListener('drop', (e) => drop(e, { index, url }));
            document
                .querySelector(`.screenshots__list__item__${index}`)
                .addEventListener('dragover', (e) => e.preventDefault());
        });
    };
    const drawIcon = (iconNode, url) => {
        while (iconNode.firstChild) {
            iconNode.removeChild(iconNode.firstChild);
        }
        const node = document.createElement('div');
        node.classList.add('icon__item');
        node.style.backgroundImage = `url("${url}")`;
        iconNode.appendChild(node);
    };

}());

const { POST } = window;
const screenshotsParentNode = document.querySelector('#screenshots__list');
const iconParentNode = document.querySelector('.icon');
let urls = [];

document.querySelector('#screenshots').addEventListener('change', async e => {
  const {
    target: { files },
  } = e;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  try {
    const response = await POST('/image/upload', formData);
    const { urls } = await response.json();
    screenshotURLs = urls;

    drawScreenshotList(screenshotsParentNode, screenshotURLs);
  } catch (error) {
    console.error(error);
  }
});

document.querySelector('#icon').addEventListener('change', async e => {
  const {
    target: {
      files: [icon],
    },
  } = e;
  const formData = new FormData();
  formData.append('files', icon);

  try {
    const response = await POST('/image/upload', formData);
    const {
      urls: [url],
    } = await response.json();

    drawIcon(iconParentNode, url);
  } catch (error) {
    console.error(error);
  }
});

const drag = (e, url) => e.dataTransfer.setData('text', JSON.stringify(url));

const drop = (e, currentURL) => {
  e.preventDefault();
  const newURL = JSON.parse(e.dataTransfer.getData('text'));
  const newScreenshotURLS = screenshotURLs.map((url, index) => {
    if (index === newURL.index) return currentURL.url;
    if (index === currentURL.index) return newURL.url;

    return url;
  });
  screenshotURLs = [...newScreenshotURLS];

  drawScreenshotList(screenshotsParentNode, newScreenshotURLS);
};

const drawScreenshotList = (screenshotsParentNode, urls) => {
  while (screenshotsParentNode.firstChild) {
    screenshotsParentNode.removeChild(screenshotsParentNode.firstChild);
  }

  urls.forEach((url, index) => {
    const node = document.createElement('div');
    const childNode = document.createElement('div');

    node.classList.add(
      'col-6',
      'col-md-3',
      'screenshots__list__item',
      `screenshots__list__item__${index}`,
    );
    node.draggable = 'true';

    childNode.style.backgroundImage = `url(${url})`;

    node.appendChild(childNode);
    screenshotsParentNode.appendChild(node);

    document
      .querySelector(`.screenshots__list__item__${index}`)
      .addEventListener('dragstart', e => drag(e, { index, url }));

    document
      .querySelector(`.screenshots__list__item__${index}`)
      .addEventListener('drop', e => drop(e, { index, url }));

    document
      .querySelector(`.screenshots__list__item__${index}`)
      .addEventListener('dragover', e => e.preventDefault());
  });
};

const drawIcon = (iconParentNode, url) => {
  while (iconParentNode.firstChild) {
    iconParentNode.removeChild(iconParentNode.firstChild);
  }

  const node = document.createElement('div');
  node.classList.add('icon__item');
  node.style.backgroundImage = `url("${url}")`;
  iconParentNode.appendChild(node);
};

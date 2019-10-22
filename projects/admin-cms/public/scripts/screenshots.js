const { POST } = window;
const parentNode = document.querySelector('#screenshots__list');
let urls = [];

document.querySelector('#screenshots').addEventListener('change', async e => {
  const {
    target: { files },
  } = e;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append('screenshots', files[i]);
  }

  try {
    const response = await POST('/image/upload/screenshots', formData);
    const result = await response.json();
    screenshotURLs = result.urls;

    draw(parentNode, screenshotURLs);
  } catch (error) {
    console.error(error);
  }
});

document.querySelector('#icon').addEventListener('change', async e => {
  const {
    target: { files },
  } = e;
  const formData = new FormData();
  formData.append('icon', formData);

  try {
    const response = await POST('/image/upload/icon', formData);
    const result = await response.json();
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

  draw(parentNode, newScreenshotURLS);
};

const draw = (parentNode, urls) => {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
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
    parentNode.appendChild(node);

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

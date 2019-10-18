const { POST } = window;
let screenshotURLs = [];

document
  .querySelector('#screenshot__input')
  .addEventListener('change', async e => {
    const {
      target: { files },
    } = e;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('screenshots', files[i]);
    }

    try {
      const response = await POST('/image/upload', formData);
      const result = await response.json();
      const parentNode = document.querySelector('#screenshots__list');
      screenshotURLs = result.urls;

      screenshotURLs.forEach((url, index) => {
        const node = document.createElement('div');
        node.classList.add(
          'col-6',
          'col-md-3',
          'screenshots__list__item',
          `screenshots__list__item__${index}`,
        );
        const childNode = document.createElement('div');
        childNode.style.backgroundImage = `url(${url})`;
        node.appendChild(childNode);
        parentNode.appendChild(node);
      });
    } catch (error) {
      console.error(error);
    }
  });

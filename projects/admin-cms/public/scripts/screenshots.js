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
      const response = await fetch('/image/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  });

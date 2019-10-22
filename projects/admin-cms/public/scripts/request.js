window.POST = (url, data) =>
  fetch(url, {
    method: 'POST',
    body: data,
  });

window.GET = (url, data) => fetch(url);

window.PUT = (url, data) =>
  fetch(url, {
    method: 'PUT',
    body: data,
  });

window.DELETE = url => fetch(url, { method: 'DELETE' });

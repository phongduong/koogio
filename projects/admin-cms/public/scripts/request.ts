export const POST = (url, data) =>
  fetch(url, {
    method: 'POST',
    body: data,
  });

export const GET = (url, data) => fetch(url);

export const PUT = (url, data) =>
  fetch(url, {
    method: 'PUT',
    body: data,
  });

export const DELETE = url => fetch(url, { method: 'DELETE' });

export const POST = (url: string, data: FormData) =>
  fetch(url, {
    method: 'POST',
    body: data,
  });

export const GET = (url: string, data: FormData) => fetch(url);

export const PUT = (url: string, data: FormData) =>
  fetch(url, {
    method: 'PUT',
    body: data,
  });

export const DELETE = (url: string) => fetch(url, { method: 'DELETE' });

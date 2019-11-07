export const POST = (url: string, data: FormData) =>
  fetch(url, {
    method: "POST",
    body: data
  }).then(res => res.json());

export const GET = (url: string) => fetch(url).then(res => res.json());

export const PUT = (url: string, data: FormData) =>
  fetch(url, {
    method: "PUT",
    body: data
  }).then(res => res.json());

export const DELETE = (url: string) =>
  fetch(url, { method: "DELETE" }).then(res => res.json());

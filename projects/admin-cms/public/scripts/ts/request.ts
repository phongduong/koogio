export const UPLOAD = (
  data: FormData,
  url: string = "/images/upload"
): Promise<any> =>
  fetch(url, {
    method: "POST",
    body: data
  }).then(res => res.json());

export const POST = (url: string, data: FormData): Promise<any> =>
  fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(res => res.json());

export const GET = (url: string): Promise<any> =>
  fetch(url).then(res => res.json());

export const PUT = (url: string, data: FormData): Promise<any> =>
  fetch(url, {
    method: "PUT",
    body: data
  }).then(res => res.json());

export const DELETE = (url: string): Promise<any> =>
  fetch(url, { method: "DELETE" }).then(res => res.json());

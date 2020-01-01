import { getCookie } from "./_helpers";

const API_URL = "/api/v1";

export const UPLOAD = (
  data: FormData,
  url: string = "/files/upload"
): Promise<any> =>
  fetch(`${API_URL}${url}`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: getCookie("idToken")
    }
  }).then(res => res.json());

export const POST = (url: string, data: FormData | string): Promise<any> =>
  fetch(`${API_URL}${url}`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      "Authorization": getCookie("idToken")
    }
  }).then(res => res.json());

export const GET = (url: string): Promise<any> =>
  fetch(`${API_URL}${url}`).then(res => res.json());

export const PUT = (url: string, data: FormData | string): Promise<any> =>
  fetch(`${API_URL}${url}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      "Authorization": getCookie("idToken")
    }
  }).then(res => res.json());

export const DELETE = (url: string): Promise<any> =>
  fetch(`${API_URL}${url}`, {
    method: "DELETE",
    headers: {
      Authorization: getCookie("idToken")
    }
  }).then(res => res.json());

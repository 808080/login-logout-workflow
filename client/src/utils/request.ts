import type { HTTPmethods, ResponseMessage } from "./types";

const BaseURL = 'http://localhost:3000';

const Request = async <T>(method: HTTPmethods, url: string, body?: T): Promise<ResponseMessage> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 5000);

  const response = await fetch(`${BaseURL}${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    signal: controller.signal,
    body: JSON.stringify(body ?? {})
  }).catch((err) => {
    console.log(err);
  });
  clearTimeout(id);
  if (!response) return { success: false, error: 'Server error' };
  const result = await response.json();
  return result;
};

export default Request;
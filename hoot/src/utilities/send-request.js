// src/utilities/send-request.js
import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload) {
  const opts = {
    method: String(method || 'GET').toUpperCase(),
    headers: { Accept: 'application/json' },
  };

  // Only set JSON header if we're not sending FormData
  const isFormData = typeof FormData !== 'undefined' && payload instanceof FormData;

  if (payload !== undefined && payload !== null) {
    if (isFormData) {
      opts.body = payload; // browser sets the multipart boundary
    } else {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(payload);
    }
  }

  const token = getToken();
  if (token) {
    opts.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, opts);

  // Try to parse JSON only if the server says it's JSON
  const ctype = res.headers.get('content-type') || '';
  const isJson = ctype.includes('application/json');

  if (res.ok) {
    if (res.status === 204) return null;           // no content
    return isJson ? await res.json() : await res.text();
  }

  // Build a more helpful error
  let detail;
  try {
    detail = isJson ? await res.json() : await res.text();
  } catch {
    detail = null;
  }
  const err = new Error(`Request failed (${res.status})`);
  err.status = res.status;
  err.detail = detail;
  throw err;
}

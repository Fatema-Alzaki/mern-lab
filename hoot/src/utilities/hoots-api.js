import sendRequest from './send-request';

const BASE_URL = '/api/hoots';

export function getAll() {
  return sendRequest(BASE_URL); // GET by default
}

export function createHoot(text) {
  return sendRequest(BASE_URL, 'POST', { text });
}

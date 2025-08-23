// src/utilities/users-api.js
import sendRequest from './send-request';

const USERS = '/api/users';

export function signUp(userData) {
  return sendRequest(USERS, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${USERS}/login`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${USERS}/check-token`); // GET
}

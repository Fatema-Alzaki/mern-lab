// src/utilities/users-service.js
import * as usersAPI from './users-api';

const STORAGE_KEY = 'token';

const setToken = (t) => localStorage.setItem(STORAGE_KEY, t);
const removeToken = () => localStorage.removeItem(STORAGE_KEY);
const readToken = () => localStorage.getItem(STORAGE_KEY);

function parsePayload(jwt) {
  try {
    return JSON.parse(atob(jwt.split('.')[1]));
  } catch {
    return null;
  }
}

export async function signUp(userData) {
  const { token, user } = await usersAPI.signUp(userData);
  setToken(token);
  return user;
}

export async function login(credentials) {
  const { token, user } = await usersAPI.login(credentials);
  setToken(token);
  return user;
}

export function getToken() {
  const token = readToken();
  if (!token) return null;

  const payload = parsePayload(token);
  if (!payload) {
    removeToken();
    return null;
  }

  // exp is in seconds → compare in ms
  if (payload.exp * 1000 < Date.now()) {
    removeToken();
    return null;
  }

  return token;
}

export function getUser() {
  const token = getToken();
  if (!token) return null;
  const payload = parsePayload(token);
  return payload?.user ?? null;
}

export function logOut() {
  removeToken();
}

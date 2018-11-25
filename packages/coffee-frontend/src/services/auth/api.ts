import { decode as decodeJwt } from "jsonwebtoken";

import { UserTokenPayload } from "coffee-types";

import { apiFetch } from "@/services/backend/api";

const LOCALSTORAGE_TOKEN = "token";

export async function login(username: string): Promise<UserTokenPayload> {
  let response;
  try {
    response = await apiFetch("POST", "/auth/login", {
      username,
      // Not used right now.
      password: "-"
    });
  } catch (e) {
    if (e.code === 401) {
      logout();
      throw new Error("Invalid Credentials");
    }
    throw e;
  }

  if (response.token) {
    localStorage.setItem(LOCALSTORAGE_TOKEN, response.token);
    return decodeJwt(response.token) as UserTokenPayload;
  }

  throw new Error("No Token Provided");
}

export function getUserToken(): UserTokenPayload | null {
  // TODO: Make a request with the token to confirm it is valid.
  const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
  if (!token) {
    return null;
  }
  return decodeJwt(token) as UserTokenPayload;
}

export async function logout() {
  localStorage.removeItem(LOCALSTORAGE_TOKEN);
}

export async function authFetch(method: string, path: string, body?: any) {
  const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
  const headers = {
    Authorization: `Bearer ${token}`
  };

  try {
    return await apiFetch(method, path, body, headers);
  } catch (e) {
    if (e.code === 401) {
      logout();
    }
    throw e;
  }
}

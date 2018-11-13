import { apiFetch } from "@/services/backend/api";

const LOCALSTORAGE_TOKEN = "token";

export async function login(username: string): Promise<boolean> {
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
    }
    throw e;
  }

  if (response.token) {
    localStorage.setItem(LOCALSTORAGE_TOKEN, response.token);
    return true;
  }

  return false;
}

export async function logout() {
  localStorage.removeItem(LOCALSTORAGE_TOKEN);
}

export async function authFetch(method: string, path: string, body?: any) {
  const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
  const headers = {
    Authorization: `Bearer ${token}`
  };

  return await apiFetch(method, path, body, headers);
}

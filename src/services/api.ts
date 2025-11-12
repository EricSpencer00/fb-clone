const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export async function apiGet(endpoint: string) {
  return apiCall(endpoint, { method: "GET" });
}

export async function apiPost(endpoint: string, data: any) {
  return apiCall(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function apiPut(endpoint: string, data: any) {
  return apiCall(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function apiDelete(endpoint: string) {
  return apiCall(endpoint, { method: "DELETE" });
}

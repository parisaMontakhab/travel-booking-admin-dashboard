const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export function apiGet<T>(endpoint: string) {
  return apiRequest<T>(endpoint, {
    method: 'GET'
  });
}

export function apiPost<T>(endpoint: string, body: unknown) {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body
  });
}

export function apiPut<T>(endpoint: string, body: unknown) {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body
  });
}

export function apiDelete<T>(endpoint: string) {
  return apiRequest<T>(endpoint, {
    method: 'DELETE'
  });
}

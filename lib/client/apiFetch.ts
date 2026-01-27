export type ApiErrorShape = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  type?: string;
};

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (res.ok) return (await res.json()) as T;

  let body: ApiErrorShape | null = null;
  try {
    body = (await res.json()) as ApiErrorShape;
  } catch {
    // ignore
  }

  const message = body?.message ?? `Request failed (${res.status})`;
  const err = new Error(message) as Error & { status?: number; body?: ApiErrorShape };
  err.status = res.status;
  err.body = body ?? undefined;
  throw err;
}

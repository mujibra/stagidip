export function resolveFilterValue(options: {
  value: string | null;
  fallback: string;
  allowed: readonly string[];
  normalize?: (value: string) => string;
  preserveUnknown?: boolean;
}) {
  const { value, fallback, allowed, normalize = (candidate) => candidate, preserveUnknown = false } = options;

  if (!value) return fallback;

  const normalized = normalize(value);

  if (allowed.includes(normalized)) {
    return normalized;
  }

  return preserveUnknown ? normalized : fallback;
}

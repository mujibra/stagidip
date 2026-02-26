type QueryEntry = {
  key: string;
  value: string;
};

export function buildCanonicalQueryString(params: URLSearchParams, entries: QueryEntry[]) {
  const nextParams = new URLSearchParams(params.toString());

  for (const entry of entries) {
    if (entry.value) {
      nextParams.set(entry.key, entry.value);
    } else {
      nextParams.delete(entry.key);
    }
  }

  return nextParams.toString();
}

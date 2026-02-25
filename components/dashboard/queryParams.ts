export function sortSearchParams(params: URLSearchParams) {
    const sortedEntries = Array.from(params.entries()).sort(([keyA, valueA], [keyB, valueB]) => {
        if (keyA === keyB) {
            return valueA.localeCompare(valueB);
        }

        return keyA.localeCompare(keyB);
    });

    return new URLSearchParams(sortedEntries);
}

export function buildCanonicalHref(pathname: string, params: URLSearchParams) {
    const qs = sortSearchParams(params).toString();
    return qs ? `${pathname}?${qs}` : pathname;
}

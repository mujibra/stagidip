export function sortSearchParams(params: URLSearchParams) {
    const sortedEntries = Array.from(params.entries()).sort(([keyA, valueA], [keyB, valueB]) => {
        if (keyA === keyB) {
            return valueA.localeCompare(valueB);
        }

        return keyA.localeCompare(keyB);
    });

    return new URLSearchParams(sortedEntries);
}

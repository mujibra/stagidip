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


export type SearchParamsLike = {
    toString(): string;
};

export function normalizedSearchParams(searchParams: SearchParamsLike) {
    return sortSearchParams(new URLSearchParams(searchParams.toString()));
}

export function searchParamsKey(searchParams: SearchParamsLike) {
    return normalizedSearchParams(searchParams).toString();
}

export function canonicalHrefFromSearchParams(pathname: string, searchParams: SearchParamsLike) {
    const qs = searchParamsKey(searchParams);
    return qs ? `${pathname}?${qs}` : pathname;
}


export function hasCanonicalHrefChanged(pathname: string, current: SearchParamsLike, next: URLSearchParams) {
    return getCanonicalHrefChange(pathname, current, next).changed;
}


type CanonicalHrefChange = {
    nextHref: string;
    changed: boolean;
};

export function getCanonicalHrefChange(pathname: string, current: SearchParamsLike, next: URLSearchParams): CanonicalHrefChange {
    const nextHref = buildCanonicalHref(pathname, next);
    const currentHref = canonicalHrefFromSearchParams(pathname, current);

    return {
        nextHref,
        changed: currentHref !== nextHref,
    };
}


export type RouterReplaceLike = {
    replace(href: string): void;
};

export function replaceCanonicalHrefIfChanged(
    pathname: string,
    current: SearchParamsLike,
    next: URLSearchParams,
    router: RouterReplaceLike
) {
    const { nextHref, changed } = getCanonicalHrefChange(pathname, current, next);

    if (changed) {
        router.replace(nextHref);
    }

    return changed;
}

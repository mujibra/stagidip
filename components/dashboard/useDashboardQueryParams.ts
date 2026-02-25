"use client";

import { useCallback } from "react";

type SearchParamsLike = {
    toString(): string;
};

type RouterLike = {
    replace(href: string): void;
};

export default function useDashboardQueryParams(pathname: string, searchParams: SearchParamsLike, router: RouterLike) {
    return useCallback((mutate: (params: URLSearchParams) => void) => {
        const params = new URLSearchParams(searchParams.toString());
        mutate(params);

        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname);
    }, [pathname, router, searchParams]);
}

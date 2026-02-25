"use client";

import { useCallback } from "react";

import { buildCanonicalHref, hasCanonicalHrefChanged, type SearchParamsLike } from "@/components/dashboard/queryParams";

type RouterLike = {
    replace(href: string): void;
};

export default function useDashboardQueryParams(pathname: string, searchParams: SearchParamsLike, router: RouterLike) {
    return useCallback((mutate: (params: URLSearchParams) => void) => {
        const params = new URLSearchParams(searchParams.toString());
        mutate(params);

        const nextHref = buildCanonicalHref(pathname, params);
        if (!hasCanonicalHrefChanged(pathname, searchParams, params)) return;

        router.replace(nextHref);
    }, [pathname, router, searchParams]);
}

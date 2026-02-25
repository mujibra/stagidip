"use client";

import { useCallback } from "react";

import { buildCanonicalHref } from "@/components/dashboard/queryParams";

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

        const nextHref = buildCanonicalHref(pathname, params);
        const currentHref = buildCanonicalHref(pathname, new URLSearchParams(searchParams.toString()));
        if (nextHref === currentHref) return;

        router.replace(nextHref);
    }, [pathname, router, searchParams]);
}

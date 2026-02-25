"use client";

import { useCallback } from "react";

import { replaceCanonicalHrefIfChanged, type RouterReplaceLike, type SearchParamsLike } from "@/components/dashboard/queryParams";

export default function useDashboardQueryParams(pathname: string, searchParams: SearchParamsLike, router: RouterReplaceLike) {
    return useCallback((mutate: (params: URLSearchParams) => void) => {
        const params = new URLSearchParams(searchParams.toString());
        mutate(params);

        replaceCanonicalHrefIfChanged(pathname, searchParams, params, router);
    }, [pathname, router, searchParams]);
}

"use client";

import { useCallback, useMemo } from "react";

import { replaceCanonicalHrefIfChanged, type RouterReplaceLike, type SearchParamsLike, searchParamsKey } from "@/components/dashboard/queryParams";

export default function useDashboardQueryParams(pathname: string, searchParams: SearchParamsLike, router: RouterReplaceLike) {
    const paramsKey = useMemo(() => searchParamsKey(searchParams), [searchParams]);

    return useCallback((mutate: (params: URLSearchParams) => void) => {
        const currentParams = new URLSearchParams(paramsKey);
        const nextParams = new URLSearchParams(paramsKey);

        mutate(nextParams);

        replaceCanonicalHrefIfChanged(pathname, currentParams, nextParams, router);
    }, [pathname, router, paramsKey]);
}

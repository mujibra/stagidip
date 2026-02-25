"use client";

import { useCallback, useMemo } from "react";

import { replaceCanonicalHrefIfChanged, type RouterReplaceLike, type SearchParamsLike } from "@/components/dashboard/queryParams";

export default function useDashboardQueryParams(pathname: string, searchParams: SearchParamsLike, router: RouterReplaceLike) {
    const searchParamsKey = useMemo(() => searchParams.toString(), [searchParams]);

    return useCallback((mutate: (params: URLSearchParams) => void) => {
        const currentParams = new URLSearchParams(searchParamsKey);
        const nextParams = new URLSearchParams(searchParamsKey);

        mutate(nextParams);

        replaceCanonicalHrefIfChanged(pathname, currentParams, nextParams, router);
    }, [pathname, router, searchParamsKey]);
}

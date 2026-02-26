"use client";

import { useCallback, useMemo } from "react";

import { replaceCanonicalHrefIfChanged, type RouterReplaceLike, type SearchParamsLike, searchParamsKey } from "@/components/dashboard/queryParams";

export type DashboardQueryParamMutate = (params: URLSearchParams) => void;
export type UpdateDashboardQueryParams = (mutate: DashboardQueryParamMutate) => boolean;

export default function useDashboardQueryParams(pathname: string, searchParams: SearchParamsLike, router: RouterReplaceLike): UpdateDashboardQueryParams {
    const paramsKey = useMemo(() => searchParamsKey(searchParams), [searchParams]);

    return useCallback<UpdateDashboardQueryParams>((mutate) => {
        const currentParams = new URLSearchParams(paramsKey);
        const nextParams = new URLSearchParams(paramsKey);

        mutate(nextParams);

        return replaceCanonicalHrefIfChanged(pathname, currentParams, nextParams, router);
    }, [pathname, router, paramsKey]);
}

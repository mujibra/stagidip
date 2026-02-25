"use client";

import { useCallback, useState } from "react";

type SearchParamsLike = {
    toString(): string;
};

export default function useCopyViewLink(pathname: string, searchParams: SearchParamsLike) {
    const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

    const copyViewLink = useCallback(async () => {
        try {
            const qs = searchParams.toString();
            const url = `${window.location.origin}${pathname}${qs ? `?${qs}` : ""}`;
            await navigator.clipboard.writeText(url);
            setCopyFeedback("View link copied");
        } catch {
            setCopyFeedback("Failed to copy link");
        }

        window.setTimeout(() => setCopyFeedback(null), 1800);
    }, [pathname, searchParams]);

    return { copyFeedback, copyViewLink };
}

"use client";

import { useCallback, useState } from "react";

import { buildCanonicalHref } from "@/components/dashboard/queryParams";

type SearchParamsLike = {
    toString(): string;
};

type CopyFeedbackState = {
    message: string;
    type: "success" | "error";
} | null;

export default function useCopyViewLink(pathname: string, searchParams: SearchParamsLike) {
    const [copyFeedback, setCopyFeedback] = useState<CopyFeedbackState>(null);

    const copyViewLink = useCallback(async () => {
        try {
            const params = new URLSearchParams(searchParams.toString());
            const href = buildCanonicalHref(pathname, params);
            const url = `${window.location.origin}${href}`;
            await navigator.clipboard.writeText(url);
            setCopyFeedback({ message: "View link copied", type: "success" });
        } catch {
            setCopyFeedback({ message: "Failed to copy link", type: "error" });
        }

        window.setTimeout(() => setCopyFeedback(null), 1800);
    }, [pathname, searchParams]);

    return { copyFeedback, copyViewLink };
}

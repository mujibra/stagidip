"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
    const clearFeedbackTimeoutRef = useRef<number | null>(null);

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

        if (clearFeedbackTimeoutRef.current !== null) {
            window.clearTimeout(clearFeedbackTimeoutRef.current);
        }

        clearFeedbackTimeoutRef.current = window.setTimeout(() => {
            setCopyFeedback(null);
            clearFeedbackTimeoutRef.current = null;
        }, 1800);
    }, [pathname, searchParams]);

    useEffect(() => {
        return () => {
            if (clearFeedbackTimeoutRef.current !== null) {
                window.clearTimeout(clearFeedbackTimeoutRef.current);
            }
        };
    }, []);

    return { copyFeedback, copyViewLink };
}

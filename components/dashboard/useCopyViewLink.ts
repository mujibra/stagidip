"use client";

import { useCallback, useState } from "react";

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
            const qs = searchParams.toString();
            const url = `${window.location.origin}${pathname}${qs ? `?${qs}` : ""}`;
            await navigator.clipboard.writeText(url);
            setCopyFeedback({ message: "View link copied", type: "success" });
        } catch {
            setCopyFeedback({ message: "Failed to copy link", type: "error" });
        }

        window.setTimeout(() => setCopyFeedback(null), 1800);
    }, [pathname, searchParams]);

    return { copyFeedback, copyViewLink };
}

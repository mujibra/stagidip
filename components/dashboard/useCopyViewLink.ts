"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { canonicalHrefFromSearchParams, type SearchParamsLike } from "@/components/dashboard/queryParams";

type CopyFeedbackState = {
    message: string;
    type: "success" | "error";
} | null;

function fallbackCopyToClipboard(text: string) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    const succeeded = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (!succeeded) {
        throw new Error("Clipboard copy failed");
    }
}

async function writeToClipboard(text: string) {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }

    fallbackCopyToClipboard(text);
}

export default function useCopyViewLink(pathname: string, searchParams: SearchParamsLike) {
    const [copyFeedback, setCopyFeedback] = useState<CopyFeedbackState>(null);
    const [isCopying, setIsCopying] = useState(false);
    const isCopyingRef = useRef(false);
    const isMountedRef = useRef(true);
    const clearFeedbackTimeoutRef = useRef<number | null>(null);

    const setFeedbackSafely = useCallback((next: CopyFeedbackState) => {
        if (!isMountedRef.current) return;
        setCopyFeedback(next);
    }, []);

    const setCopyingSafely = useCallback((next: boolean) => {
        if (!isMountedRef.current) return;
        setIsCopying(next);
    }, []);

    const copyViewLink = useCallback(async () => {
        if (isCopyingRef.current) return;

        isCopyingRef.current = true;
        setCopyingSafely(true);

        try {
            const href = canonicalHrefFromSearchParams(pathname, searchParams);
            const url = `${window.location.origin}${href}`;
            await writeToClipboard(url);
            setFeedbackSafely({ message: "View link copied", type: "success" });
        } catch {
            setFeedbackSafely({ message: "Failed to copy link", type: "error" });
        } finally {
            if (clearFeedbackTimeoutRef.current !== null) {
                window.clearTimeout(clearFeedbackTimeoutRef.current);
            }

            clearFeedbackTimeoutRef.current = window.setTimeout(() => {
                if (!isMountedRef.current) return;
                setCopyFeedback(null);
                clearFeedbackTimeoutRef.current = null;
            }, 1800);

            isCopyingRef.current = false;
            setCopyingSafely(false);
        }
    }, [pathname, searchParams, setCopyingSafely, setFeedbackSafely]);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
            if (clearFeedbackTimeoutRef.current !== null) {
                window.clearTimeout(clearFeedbackTimeoutRef.current);
            }
        };
    }, []);

    return { copyFeedback, copyViewLink, isCopying };
}

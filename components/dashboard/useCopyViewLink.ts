"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { canonicalHrefFromSearchParams, type SearchParamsLike } from "@/components/dashboard/queryParams";

type CopyFeedbackState = {
    message: string;
    type: "success" | "error";
} | null;

const COPY_FEEDBACK_TIMEOUT_MS = 1800;

function fallbackCopyToClipboard(text: string) {
    const textarea = document.createElement("textarea");
    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const selection = window.getSelection();
    const previousRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0).cloneRange() : null;

    let succeeded = false;

    try {
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);

        succeeded = document.execCommand("copy");
    } finally {
        if (textarea.parentNode) {
            textarea.parentNode.removeChild(textarea);
        }

        if (previousRange && selection) {
            try {
                selection.removeAllRanges();
                selection.addRange(previousRange);
            } catch {
                // no-op: selection may be unavailable in some browser contexts
            }
        }

        if (previousActiveElement && document.contains(previousActiveElement)) {
            try {
                previousActiveElement.focus({ preventScroll: true });
            } catch {
                previousActiveElement.focus();
            }
        }
    }

    if (!succeeded) {
        throw new Error("Clipboard copy failed");
    }
}

async function writeToClipboard(text: string) {
    if (navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return;
        } catch {
            // fallback to legacy execCommand path when clipboard API is blocked
        }
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
                setFeedbackSafely(null);
                clearFeedbackTimeoutRef.current = null;
            }, COPY_FEEDBACK_TIMEOUT_MS);

            isCopyingRef.current = false;
            setCopyingSafely(false);
        }
    }, [pathname, searchParams, setCopyingSafely, setFeedbackSafely]);


    useEffect(() => {
        if (clearFeedbackTimeoutRef.current !== null) {
            window.clearTimeout(clearFeedbackTimeoutRef.current);
            clearFeedbackTimeoutRef.current = null;
        }

        isCopyingRef.current = false;
        setCopyingSafely(false);
        setFeedbackSafely(null);
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

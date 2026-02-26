type CopyFeedback = {
    message: string;
    type: "success" | "error";
};

type CopyFeedbackMessageProps = {
    feedback: CopyFeedback;
    className?: string;
    as?: "div" | "span";
};

export default function CopyFeedbackMessage({ feedback, className = "", as = "div" }: CopyFeedbackMessageProps) {
    const toneClass = feedback.type === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400";
    const combinedClassName = `${toneClass} ${className}`.trim();

    if (as === "span") {
        return (
            <span className={combinedClassName} role="status" aria-live="polite">
                {feedback.message}
            </span>
        );
    }

    return (
        <div className={combinedClassName} role="status" aria-live="polite">
            {feedback.message}
        </div>
    );
}

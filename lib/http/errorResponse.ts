import { NextResponse } from "next/server";

export function validationError(errors: Record<string, string[]>) {
    return NextResponse.json(
        {
            success: false,
            type: "VALIDATION_ERROR",
            errors,
        },
        { status: 400 }
    );
}

export function serverError(error: unknown) {
    return NextResponse.json(
        {
            success: false,
            type: "SERVER_ERROR",
            message: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
    );
}

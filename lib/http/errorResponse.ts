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

export function badRequestError(message: string, extra?: Record<string, unknown>) {
    return NextResponse.json(
        {
            success: false,
            type: "BAD_REQUEST",
            message,
            ...(extra ?? {}),
        },
        { status: 400 }
    );
}

export function notFoundError(message: string, extra?: Record<string, unknown>) {
    return NextResponse.json(
        {
            success: false,
            type: "NOT_FOUND",
            message,
            ...(extra ?? {}),
        },
        { status: 404 }
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


export function serverErrorWithRequestId(requestId: string) {
    return NextResponse.json(
        {
            success: false,
            type: "SERVER_ERROR",
            message: "Internal server error",
            requestId,
        },
        { status: 500, headers: { "X-Request-ID": requestId } }
    );
}

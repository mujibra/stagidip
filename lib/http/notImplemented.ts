import { NextResponse } from "next/server";

export function notImplemented(message = "Not implemented") {
    return NextResponse.json({ success: false, message }, { status: 501 });
}

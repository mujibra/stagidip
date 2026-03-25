import { NextResponse } from "next/server";

import { getApiImplementationProgress } from "@/lib/services/apiImplementationProgress";

export const runtime = "nodejs";

export async function GET() {
    const report = await getApiImplementationProgress();

    return NextResponse.json({
        success: true,
        message: "Batch API implementation progress report",
        ...report,
    });
}

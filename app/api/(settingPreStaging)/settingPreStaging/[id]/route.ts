import { NextRequest } from "next/server";

import {
    deleteSettingPreStaging,
    getSettingPreStagingByRowPerPage,
    updateSettingPreStaging,
} from "../_idRouteShared";

export const runtime = "nodejs";

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    const id = (await ctx.params).id;
    return getSettingPreStagingByRowPerPage(req, id);
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    const id = (await ctx.params).id;
    return updateSettingPreStaging(req, id);
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    const id = (await ctx.params).id;
    return deleteSettingPreStaging(id);
}

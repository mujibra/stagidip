/* eslint-disable @typescript-eslint/no-explicit-any */
export async function parseBody<T = any>(req: Request): Promise<T> {
    const contentType = req.headers.get("content-type") || "";

    // JSON
    if (contentType.includes("application/json")) {
        return await req.json();
    }

    // x-www-form-urlencoded
    if (contentType.includes("application/x-www-form-urlencoded")) {
        const form = await req.formData();
        const obj: any = {};

        form.forEach((value, key) => {
            obj[key] = typeof value === "string" ? value : String(value);
        });

        return obj as T;
    }

    throw new Error("Unsupported content type: " + contentType);
}

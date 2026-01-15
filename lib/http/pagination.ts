export function getPagination(searchParams: URLSearchParams) {
    const pageRaw = Number(searchParams.get("page") ?? 1);
    const perPageRaw = Number(searchParams.get("perPage") ?? 10);

    const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
    const perPage = Number.isFinite(perPageRaw) && perPageRaw > 0 ? perPageRaw : 10;

    const skip = (page - 1) * perPage;
    const take = perPage;

    return { page, perPage, skip, take };
}

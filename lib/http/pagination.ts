type PaginationOptions = {
    defaultPage?: number;
    defaultPerPage?: number;
    perPageOverride?: number;
};

export function getPagination(searchParams: URLSearchParams, options: PaginationOptions = {}) {
    const defaultPage = options.defaultPage ?? 1;
    const defaultPerPage = options.defaultPerPage ?? 10;

    const pageRaw = Number(searchParams.get("page") ?? defaultPage);
    const perPageRaw = Number(searchParams.get("perPage") ?? defaultPerPage);

    const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : defaultPage;
    const parsedPerPage = Number.isFinite(perPageRaw) && perPageRaw > 0 ? perPageRaw : defaultPerPage;
    const perPage =
        options.perPageOverride !== undefined && options.perPageOverride > 0
            ? options.perPageOverride
            : parsedPerPage;

    const skip = (page - 1) * perPage;
    const take = perPage;

    return { page, perPage, skip, take };
}

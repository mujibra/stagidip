import { promises as fs } from "fs";
import path from "path";

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
type HttpMethod = (typeof HTTP_METHODS)[number];

export type PendingApi = {
    routePath: string;
    methods: HttpMethod[];
};

export type ProgressByGroup = {
    group: string;
    totalMethods: number;
    implementedMethods: number;
    unimplementedMethods: number;
    progressPercentage: number;
};

type RouteScanItem = {
    routePath: string;
    methods: HttpMethod[];
    unimplementedMethods: HttpMethod[];
};

async function getRouteFiles(dir: string): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
        entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) return getRouteFiles(fullPath);
            return entry.isFile() && entry.name === "route.ts" ? [fullPath] : [];
        }),
    );

    return files.flat();
}

function toRoutePath(routeFile: string, root: string) {
    const relative = path.relative(root, routeFile);
    const segments = relative
        .split(path.sep)
        .slice(0, -1)
        .filter((segment) => segment && !(segment.startsWith("(") && segment.endsWith(")")));

    return `/${segments.join("/")}`;
}

function parseMethods(content: string): HttpMethod[] {
    return HTTP_METHODS.filter((method) => new RegExp(`export\\s+async\\s+function\\s+${method}\\s*\\(`).test(content));
}

function parseUnimplementedMethods(content: string): HttpMethod[] {
    const sections = content.split(/export\s+async\s+function\s+/).slice(1);

    return sections.reduce<HttpMethod[]>((acc, section) => {
        const method = section.match(/^([A-Z]+)\s*\(/)?.[1] as HttpMethod | undefined;
        if (!method || !HTTP_METHODS.includes(method)) return acc;
        if (section.includes("notImplemented(")) acc.push(method);
        return acc;
    }, []);
}

function toGroup(routePath: string) {
    const first = routePath.split("/").filter(Boolean)[0];
    return first ?? "root";
}

export async function getApiImplementationProgress() {
    const root = path.join(process.cwd(), "app", "api");
    const files = await getRouteFiles(root);

    const scan: RouteScanItem[] = [];

    for (const file of files) {
        const content = await fs.readFile(file, "utf8");
        const methods = parseMethods(content);
        if (!methods.length) continue;

        scan.push({
            routePath: toRoutePath(file, root),
            methods,
            unimplementedMethods: parseUnimplementedMethods(content),
        });
    }

    const totalMethods = scan.reduce((sum, item) => sum + item.methods.length, 0);
    const unimplementedMethods = scan.reduce((sum, item) => sum + item.unimplementedMethods.length, 0);
    const implementedMethods = totalMethods - unimplementedMethods;
    const progressPercentage = totalMethods === 0 ? 100 : Number(((implementedMethods / totalMethods) * 100).toFixed(2));

    const pendingApis: PendingApi[] = scan
        .filter((item) => item.unimplementedMethods.length > 0)
        .map((item) => ({ routePath: item.routePath, methods: item.unimplementedMethods }))
        .sort((a, b) => a.routePath.localeCompare(b.routePath));

    const grouped = new Map<string, { total: number; unimplemented: number }>();
    for (const item of scan) {
        const group = toGroup(item.routePath);
        const bucket = grouped.get(group) ?? { total: 0, unimplemented: 0 };
        bucket.total += item.methods.length;
        bucket.unimplemented += item.unimplementedMethods.length;
        grouped.set(group, bucket);
    }

    const progressByGroup: ProgressByGroup[] = Array.from(grouped.entries())
        .map(([group, value]) => {
            const implemented = value.total - value.unimplemented;
            return {
                group,
                totalMethods: value.total,
                implementedMethods: implemented,
                unimplementedMethods: value.unimplemented,
                progressPercentage: value.total === 0 ? 100 : Number(((implemented / value.total) * 100).toFixed(2)),
            };
        })
        .sort((a, b) => a.group.localeCompare(b.group));

    return {
        totalRoutes: scan.length,
        totalMethods,
        implementedMethods,
        unimplementedMethods,
        progressPercentage,
        pendingApiCount: pendingApis.length,
        pendingApis,
        progressByGroup,
    };
}

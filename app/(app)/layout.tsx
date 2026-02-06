import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

import Sidebar from "@/components/Sidebar";
import LogoutButton from "@/components/LogoutButton";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    const token = (await cookies()).get("token")?.value;
    const secret = process.env.JWT_SECRET;

    if (!token || !secret) {
        redirect("/login");
    }

    try {
        jwt.verify(token, secret);
    } catch {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
            <div className="mx-auto flex min-h-screen w-full max-w-screen-2xl">
                <Sidebar />
                <div className="flex w-full flex-col">
                    <header className="border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                Stagidip
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-xs text-zinc-500">Protected</div>
                                <LogoutButton />
                            </div>
                        </div>
                    </header>
                    <main className="w-full flex-1 p-4 md:p-6">{children}</main>
                </div>
            </div>
        </div>
    );
}

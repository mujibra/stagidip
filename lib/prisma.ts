import { PrismaClient } from "../app/generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER!, // e.g. "root"
    password: process.env.DB_PASSWORD!, // e.g. "password"
    database: process.env.DB_NAME!, // e.g. "stagidip"
    connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });

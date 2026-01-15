import mysql from "mysql2/promise";

if (!process.env.DB_USER || !process.env.DB_NAME) {
    throw new Error("Database env vars not loaded");
}

export const legacyDb = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

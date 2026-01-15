import { defineConfig } from "prisma/config";
import "dotenv/config";

export default defineConfig({
    schema: "prisma/schema.prisma",
    datasource: {
        url: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    },
});

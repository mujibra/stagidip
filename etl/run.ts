import "dotenv/config";
import { runCustomersETL } from "./jobs/customers.etl";
import { runWarehousesETL } from "./jobs/warehouses.etl";
import { runUsersETL } from "./jobs/users.etl";

async function main() {
    console.log("ETL START");

    await runCustomersETL();
    await runWarehousesETL();
    await runUsersETL();

    console.log("ETL DONE");
}

main().catch((err) => {
    console.error("ETL FAILED");
    console.error(err);
    process.exit(1);
});

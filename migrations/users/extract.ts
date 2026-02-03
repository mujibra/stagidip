type LegacyDb = {
    query: (sql: string) => Promise<unknown>;
};

export async function extractUsers(db: LegacyDb) {
    return db.query(`
    SELECT *
    FROM users
  `);
}

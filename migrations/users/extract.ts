export async function extractUsers(db: LegacyDb) {
    return db.query(`
    SELECT *
    FROM users
  `);
}

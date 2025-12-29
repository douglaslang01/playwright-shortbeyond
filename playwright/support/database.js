const { Pool } = require('pg');

require('dotenv').config();

// Ajuste as configurações conforme seu ambiente
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

async function cleanupTestData() {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const query = `
      WITH deleted_links AS (
          DELETE FROM links
          WHERE user_id IN (
              SELECT id
              FROM users
              WHERE email ILIKE '%@papito.dev'
          )
      ),
      deleted_users AS (
          DELETE FROM users
          WHERE email ILIKE '%@papito.dev'
          RETURNING id
      )
      SELECT COUNT(*) AS total_usuarios_removidos
      FROM deleted_users;
    `;

        const result = await client.query(query);

        await client.query('COMMIT');

        const total = result.rows[0].total_usuarios_removidos;

        console.log(`🧹 Cleanup concluído. Usuários removidos: ${total}`);

        return Number(total);
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Erro ao executar cleanupTestData:', error);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = { cleanupTestData };



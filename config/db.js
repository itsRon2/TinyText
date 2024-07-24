import mysql from 'serverless-mysql'

export const pool = mysql({
    config: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    }
})

export async function checkDbConnection() {
    try {
        await pool.query('SELECT 1');
        return true;
    } catch (error) {
        console.error('Database connection error:', error);
        return false;
    }
}
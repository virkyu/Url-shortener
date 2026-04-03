// Require's
const mysql = require("mysql2/promise")
const dotenv = require("dotenv")

dotenv.config()


// Database connections and function code.

const connection = mysql.createPool({
    host:     process.env.DATABASE_HOST,
    user:     process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_DB
})

const getInfo = async (name) => {
    try {
        const [rows] = await connection.execute(
            'SELECT * FROM main WHERE name = ?',
            [name]
        );
        
        return rows[0];
    } catch (error) {
        console.error("[❌] Error executing query to database! " + error)
    }
}

module.exports = {
    connection,
    getInfo
}
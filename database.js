// Require's
const mysql = require("mysql2/promise")
const dotenv = require("dotenv")

dotenv.config()

// Important Variables
const table = process.env.DATABASE_TABLE;

// Database connections and function code.

const connection = mysql.createPool({
    host:     process.env.DATABASE_HOST,
    user:     process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_DB
})

// get info about record using name
const getInfo = async (name) => {
    try {
        const [rows] = await connection.execute(
            `SELECT * ${table} FROM  WHERE name = ?`,
            [name]
        );
        
        return rows[0];
    } catch (error) {
        console.error("[❌] Error executing query to database! " + error)
    }
}

// insert new record
const addNew = async (name, url) => {
    try {
        const [rows] = await connection.execute(
            `INSERT INTO ${table} (name, url, created_at) VALUES (?, ?, current_timestamp())`,
            [name, url]
        );
    

        return true;
    } catch (error) {
        console.error("[❌] Error adding record to database!\n" + error);

        return false;
    }
}

module.exports = {
    connection,
    getInfo,
    addNew
}
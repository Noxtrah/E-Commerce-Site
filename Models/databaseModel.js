// models/databaseModel.js
const sql = require('mssql');

const config = {
    user: 'your_username',
    password: 'your_password',
    server: 'your_server_name',
    database: 'your_database_name',
    options: {
        encrypt: true, // For Azure
        trustServerCertificate: true // For Azure
    }
};

const pool = new sql.ConnectionPool(config);

async function connectToDatabase() {
    try {
        await pool.connect();
        console.log('Connected to MSSQL database');
    } catch (err) {
        console.error('Error connecting to MSSQL database:', err);
    }
}

async function executeQuery(query) {
    try {
        const request = pool.request();
        const result = await request.query(query);
        return result.recordset;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

module.exports = {
    connectToDatabase,
    executeQuery
};

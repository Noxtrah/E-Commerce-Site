// models/databaseModel.js
import { ConnectionPool } from 'mssql';

const config = {
    user: 'Noxtra',
    password: 'Cyromancer33',
    server: 'hepsiburada.database.windows.net',
    database: 'HepsiburadaDatabase',
    options: {
        encrypt: true, // For Azure
    }
};

const pool = new ConnectionPool(config);
console.log(pool);

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


async function getItemsFromDatabase() {
    try {
        const records = await databaseModel.executeQuery('SELECT * FROM products');
        return records.map(record => ({
            imageUrl: record.image || 'default_image_url.jpg', // Use a default image URL if image is null
            brand: record.brand || 'Unknown Brand', // Use a default brand if brand is null
            description: record.description || 'No description available',
            rating: record.rating || 0, // Use a default rating of 0 if rating is null
            countOfRatings: record.countOfRatings || 0, // Use a default count of ratings of 0 if countOfRatings is null
            price: record.price || 'N/A' // Use 'N/A' if price is null
        }));
    } catch (err) {
        console.error('Error fetching items from database:', err);
        throw err;
    }
}

export default {
    connectToDatabase,
    executeQuery,
    getItemsFromDatabase
};

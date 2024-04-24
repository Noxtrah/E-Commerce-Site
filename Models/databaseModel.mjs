// models/databaseModel.js
import pkg from 'mssql';
const { ConnectionPool } = pkg;


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

// Function to connect to the database
export async function connectToDatabase() {
    try {
        await pool.connect();
        console.log('Connected to MSSQL database');
    } catch (err) {
        console.error('Error connecting to MSSQL database:', err);
    }
}

// Function to execute a query
export async function executeQuery(query) {
    try {
        const request = pool.request();
        const result = await request.query(query);
        return result.recordset;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

export async function executeParameterizedQuery(query, parameters) {
    try {
        const request = pool.request();
        for (const key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                const parameter = parameters[key];
                request.input(key, parameter.type, parameter.value);
            }
        }
        const result = await request.query(query);
        return result.recordset;
    } catch (err) {
        console.error('Error executing parameterized query:', err);
        throw err;
    }
}

// Function to get items from the database
export async function getItemsFromDatabase(category) {
    try {
        // Modify the SQL query to include a WHERE clause filtering by the selected category
        const records = await executeQuery(`SELECT * FROM products WHERE category ='${category}'`);
        return records.map(record => ({
            imageUrl: record.image || 'default_image_url.jpg',
            brand: record.brand || 'Unknown Brand',
            productName: record.productName || 'Unknown Product',
            description: record.description || 'No description available',
            rating: record.rate || 0,
            countOfRatings: record.countOfRates || 0,
            price: record.price || 'N/A',
            category: record.category || 'Unknown Category',
            location: record.location || 'Unknown Location'
        }));
    } catch (err) {
        console.error('Error fetching items from database:', err);
        throw err;
    }
}



export default {
    connectToDatabase,
    executeQuery,
    executeParameterizedQuery,
    getItemsFromDatabase,
  };
  
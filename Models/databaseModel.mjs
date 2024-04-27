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
        connectionTimeout: 60000, // 30 seconds timeout
        requestTimeout: 60000, // 30 seconds timeout
    }
};

const pool = new ConnectionPool(config);

export function connectToDatabase() {
    return new Promise((resolve, reject) => {
        pool.connect(err => {
            if (err) {
                console.error('Error connecting to MSSQL database:', err);
                reject(err); // Reject the promise if connection fails
            } else {
                console.log('Connected to MSSQL database');
                resolve(); // Resolve the promise if connection succeeds
            }
        });
    });
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
        console.log('Executing parameterized query:', query, parameters);
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
            productNo: record.productNo || 'Unknown Product No',
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

export async function getSelectedItemFromDatabase(productNo) {
    try {
        const record = await executeQuery(`SELECT * FROM products WHERE productNo = '${productNo}'`);
        return record.map(record => ({
            brand: record.brand || 'Unknown Brand',
            productName: record.productName || 'Unknown Product',
            imageUrl: record.image || 'default_image_url.jpg',
            bigImageUrl: record.bigImage || 'default_big_image_url.jpg',
            description: record.description || 'Unknown description',
            rating: record.rate || 'Unknown rating',
            countOfRatings: record.countOfRates || 'Unknown count of ratings',
            price: record.price || 'Unknown price'
        })); 
    } catch(err){
        console.error('Error fetching selected item from database:', err);
        throw err;
    }
}

export async function getItemsByCategoryAndLocation(category, location) {
    try {
        console.log('Fetching items by category and location:', category, location);
        
        // Modify the SQL query to include a WHERE clause filtering by both category and location
        const query = `
            SELECT * 
            FROM products 
            WHERE category ='${category}' 
            AND location ='${location}'
        `;
        
        const items = await executeQuery(query);

        console.log('Items fetched:', items);
        
        return items.map(item => ({
            productNo: item.productNo || 'Unknown Product No',
            imageUrl: item.image || 'default_image_url.jpg',
            brand: item.brand || 'Unknown Brand',
            productName: item.productName || 'Unknown Product',
            description: item.description || 'No description available',
            rating: item.rate || 0,
            countOfRatings: item.countOfRates || 0,
            price: item.price || 'N/A',
            category: item.category || 'Unknown Category',
            location: item.location || 'Unknown Location'
        }));
    } catch (error) {
        console.error('Error fetching items by category and location:', error);
        throw error;
    }
}


export default {
    connectToDatabase,
    executeQuery,
    executeParameterizedQuery,
    getItemsFromDatabase,
    getSelectedItemFromDatabase,
    getItemsByCategoryAndLocation
  };
  
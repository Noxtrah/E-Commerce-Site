// Import getItemsFromDatabase function
import { getItemsFromDatabase, getSelectedItemFromDatabase } from '../Models/databaseModel.mjs';

// Function to get all items from the database based on the category
export async function getAllItems(req, res) {
    try {
        // Extract category from query parameters for GET requests
        const category = req.query.category;

        // Call getItemsFromDatabase with the category parameter
        const items = await getItemsFromDatabase(category);

        // Send response with items
        res.json(items);
    } catch (err) {
        // Handle errors
        console.error('Error fetching items from database:', err);
        res.status(500).json({ error: 'Error fetching items from database' });
    }
}

export async function getOneItemByNo(req, res) {
    try {
        const productNo = req.query.productNo; // Use req.query to get the query parameters
        console.log('Product No:', productNo); // Log productNo to check its value
        const item = await getSelectedItemFromDatabase(productNo);
        res.json(item);
    } catch (err) {
        console.error('Error fetching item from database:', err);
        res.status(500).json({ error: 'Error fetching item from database' });
    }
}

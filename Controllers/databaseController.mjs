// Import getItemsFromDatabase function
import { getItemsFromDatabase } from '../Models/databaseModel.mjs';

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

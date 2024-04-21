// controllers/databaseController.js
import databaseModel from '../Models/databaseModel';

export async function getAllItems(req, res) {
    try {
        const items = await databaseModel.getItemsFromDatabase();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching items from database' });
    }
}

export default {
    getAllItems
};

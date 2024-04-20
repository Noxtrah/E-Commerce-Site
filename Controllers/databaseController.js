// controllers/databaseController.js
const databaseModel = require('../Models/databaseModel');

async function getAllRecords(req, res) {
    try {
        const records = await databaseModel.executeQuery('SELECT * FROM your_table');
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching records from database' });
    }
}

module.exports = {
    getAllRecords
};

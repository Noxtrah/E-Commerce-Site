// Importing modules using ES6 syntax
import express from 'express';
import cors from 'cors';
import { json } from 'express'; // Destructuring assignment to import json directly
import { Router } from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
// Importing your own modules
import databaseRoutes from './Routes/databaseRoutes.mjs';
import databaseModel from './Models/databaseModel.mjs';

const app = express();
app.use(cors());
app.use(json());
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
// Get the directory name
const __dirname = path.dirname(__filename);

// Connect to the database
databaseModel.connectToDatabase();

// Serve static files (like CSS, JavaScript, images)
app.use(express.static(path.join(__dirname, 'Public')));

// Use the Router object
const router = Router();
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'Public/mainBoard.html'));
});

app.use('/', router);

// Routes
app.use('/api', databaseRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

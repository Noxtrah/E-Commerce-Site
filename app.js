// app.js
import express, { json } from 'express';
import databaseRoutes from './Routes/databaseRoutes';
import databaseModel from './Models/databaseModel';

const app = express();
const PORT = process.env.PORT || 5500;

// Connect to the database
databaseModel.connectToDatabase();

// Middleware
app.use(json());

// Routes
app.use('/api', databaseRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

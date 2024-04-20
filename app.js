// app.js
const express = require('express');
const databaseRoutes = require('./Routes/databaseRoutes');
const databaseModel = require('./Models/databaseModel');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
databaseModel.connectToDatabase();

// Middleware
app.use(express.json());

// Routes
app.use('/api/database', databaseRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

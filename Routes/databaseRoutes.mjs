// Importing modules using ES6 syntax
import { Router } from 'express';
import { getAllItems, getOneItemByNo } from '../Controllers/databaseController.mjs';
import { connectToDatabase } from '../Models/databaseModel.mjs';

const router = Router();

connectToDatabase()
  .then(() => {
    console.log('Database connection established');
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });

router.get('/items', getAllItems);
router.get('/item', getOneItemByNo);


export default router;

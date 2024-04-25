// Importing modules using ES6 syntax
import { Router } from 'express';
import { getAllItems, getOneItemByNo } from '../Controllers/databaseController.mjs';

const router = Router();

router.get('/items', getAllItems);
router.get('/item', getOneItemByNo);


export default router;

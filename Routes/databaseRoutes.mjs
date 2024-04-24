// Importing modules using ES6 syntax
import { Router } from 'express';
import { getAllItems } from '../Controllers/databaseController.mjs';

const router = Router();

router.get('/items', getAllItems);

export default router;

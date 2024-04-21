// routes/databaseRoutes.js
import { Router } from 'express';
const router = Router();
import { getAllItems } from '../Controllers/databaseController';

router.get('/items', getAllItems);

export default router;

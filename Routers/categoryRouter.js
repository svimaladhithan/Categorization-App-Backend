import express from 'express';
import { getCategories, selectCategories } from '../Controllers/categoryController.js'; 

const router = express.Router();

router.get('/categories', getCategories);
router.post('/categories/select', selectCategories);

export default router;
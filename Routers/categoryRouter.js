import express from 'express';
import { getCategories, selectCategories, getSelectedCategories } from '../Controllers/categoryController.js'; 

const router = express.Router();

router.get('/categories', getCategories);
router.get('/categories/selected/:userId', getSelectedCategories);
router.post('/categories/select', selectCategories);

export default router; 
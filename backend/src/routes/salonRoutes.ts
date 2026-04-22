import express from 'express';
import { getServices, getProfessionals } from '../controllers/salonController';

const router = express.Router();

router.get('/services', getServices);
router.get('/professionals', getProfessionals);

export default router;

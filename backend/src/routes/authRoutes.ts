import express from 'express';
import { loginUser } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', loginUser);

// Rota para o App buscar os dados do usuário logado usando o Token
router.get('/profile', protect, (req: any, res) => {
  res.json(req.user); // req.user foi preenchido pelo middleware 'protect' buscando no Banco
});

export default router;

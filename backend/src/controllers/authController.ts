import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Gerar Token JWT contendo APENAS o ID
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

// @desc    Autenticar usuário e obter token
// @route   POST /api/auth/login
export const loginUser = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    // Busca usuário incluindo apenas os campos necessários
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(senha, user.senha))) {
      res.json({
        token: generateToken(user._id as string),
        user: {
          nome: user.nome,
          role: user.role,
          // Não enviamos senha nem dados sensíveis aqui
        }
      });
    } else {
      res.status(401).json({ message: 'E-mail ou senha inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

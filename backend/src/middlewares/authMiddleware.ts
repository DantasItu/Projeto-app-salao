import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Pega o token do header
      token = req.headers.authorization.split(' ')[1];

      // 2. Decodifica e verifica a assinatura do token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');

      // 3. Busca o usuário no banco e anexa à requisição (sem a senha)
      // Isso garante que os dados (nome, role) são os do banco e não do token
      req.user = await User.findById(decoded.id).select('-senha');

      if (!req.user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Não autorizado, token inválido' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, sem token' });
  }
};

// Middleware para verificar Roles
export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acesso restrito para administradores' });
  }
};

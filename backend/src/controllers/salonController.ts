import { Request, Response } from 'express';
import Service from '../models/Service';
import Professional from '../models/Professional';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar serviços' });
  }
};

export const getProfessionals = async (req: Request, res: Response) => {
  try {
    const professionals = await Professional.find();
    res.json(professionals);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar profissionais' });
  }
};

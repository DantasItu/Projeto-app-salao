import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  nome: string;
  preco: number;
  duracao: number; // em minutos
}

const ServiceSchema: Schema = new Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  duracao: { type: Number, required: true }
});

export default mongoose.model<IService>('Service', ServiceSchema);

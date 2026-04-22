import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  nome: string;
  email: string;
  senha: string;
  role: 'cliente' | 'profissional' | 'admin';
  profissionalId?: string; // Caso seja profissional
}

const UserSchema: Schema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, enum: ['cliente', 'profissional', 'admin'], default: 'cliente' },
  profissionalId: { type: String }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);

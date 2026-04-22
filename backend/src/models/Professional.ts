import mongoose, { Schema, Document } from 'mongoose';

export interface IProfessional extends Document {
  nome: string;
  especialidade: string;
  servicosIds: string[]; // Referência aos IDs de serviços que ele faz
}

const ProfessionalSchema: Schema = new Schema({
  nome: { type: String, required: true },
  especialidade: { type: String, required: true },
  servicosIds: [{ type: String }]
});

export default mongoose.model<IProfessional>('Professional', ProfessionalSchema);

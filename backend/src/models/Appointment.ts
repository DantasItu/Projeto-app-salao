import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  data: string; // YYYY-MM-DD
  horario: string; // HH:mm
  clienteId: mongoose.Types.ObjectId;
  profissionalId: string; // ID do profissional (p1, p2, etc)
  servicoId: string; // ID do serviço (s1, s2, etc)
  status: 'pendente' | 'confirmado' | 'concluido' | 'cancelado';
}

const AppointmentSchema: Schema = new Schema({
  data: { type: String, required: true },
  horario: { type: String, required: true },
  clienteId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  profissionalId: { type: String, required: true },
  servicoId: { type: String, required: true },
  status: { type: String, enum: ['pendente', 'confirmado', 'concluido', 'cancelado'], default: 'confirmado' }
}, { timestamps: true });

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);

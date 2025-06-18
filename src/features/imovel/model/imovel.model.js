import mongoose from 'mongoose';

const ImovelSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  descricaoResumida: { type: String, required: true },
  preco: { type: String, required: true },
  tipo: { type: String, required: true },
  finalidade: { type: String, required: true },
  imagens: [{ type: String, required: true }],
  localizacao: { type: String, required: true },
  contato: {
    whatsapp: { type: String, required: true },
    email: { type: String, required: true }
  }
});

export default mongoose.model('imoveis', ImovelSchema);

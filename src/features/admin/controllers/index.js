import { v4 as uuidv4 } from "uuid";
import Imovel from "../../imovel/model/imovel.model.js";

// Vamos supor que imoveis é um array na memória (ou pode ser um banco depois)
const imoveis = [];

// Listar todos
const listarImoveisAdmin = (req, res) => {
  res.json(imoveis);
};

// Criar novo imóvel
const criarImovelAdmin = async (req, res) => {
  const { titulo, descricaoResumida, preco, tipo, finalidade, imagens, localizacao } = req.body;

  if (!titulo || !preco || !imagens || !localizacao) {
    return res.status(400).json({ erro: "Campos obrigatórios ausentes" });
  }

  const novo = {
    id: uuidv4(),
    titulo,
    descricaoResumida,
    preco,
    tipo,
    finalidade,
    imagens,
    localizacao,
    contato: {
      whatsapp: "5531983179623",
      email: "kaioaugustoalmeida.m@gmail.com"
    }
  };
  try {
    const novoImovel = new Imovel(novo);
    await novoImovel.save();
    res.status(201).json(novoImovel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar imóvel
const atualizarImovelAdmin = (req, res) => {
  const index = imoveis.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.sendStatus(404);

  imoveis[index] = { ...imoveis[index], ...req.body, id: imoveis[index].id };
  res.json(imoveis[index]);
};

// Deletar imóvel
const deletarImovelAdmin = (req, res) => {
  const index = imoveis.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.sendStatus(404);

  const removido = imoveis.splice(index, 1);
  res.json(removido[0]);
};

export {
  listarImoveisAdmin,
  criarImovelAdmin,
  atualizarImovelAdmin,
  deletarImovelAdmin
};

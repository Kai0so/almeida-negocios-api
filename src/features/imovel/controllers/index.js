import Imovel from "../model/imovel.model.js";

const listarImoveis = async (req, res) => {
  try {
    const imoveis = await Imovel.find();
    res.json(imoveis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar imóvel por ID
const buscarImovelPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const imovel = await Imovel.findOne({ id });
    if (!imovel)
      return res.status(404).json({ error: "Imóvel não encontrado" });
    res.json(imovel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  listarImoveis,
  buscarImovelPorId
};

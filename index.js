import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { imoveis } from "./db/imoveis.js";

const SECRET = "almeidanegocios2025"; // Em produção, use variável de ambiente

const app = express();
app.use(express.json());
app.use(cors());

// Middleware para verificar token
function autenticar(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = auth.split(" ")[1];
  try {
    jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ erro: "Token inválido" });
  }
}

// Rotas públicas
app.get("/api/imoveis", (req, res) => {
  res.json(imoveis);
  console.log(imoveis);
  
});

app.get("/api/imoveis/:id", (req, res) => {
  const imovel = imoveis.find((i) => i.id === req.params.id);
  if (imovel) {
    res.json(imovel);
  } else {
    res.status(404).json({ erro: "Imóvel não encontrado" });
  }
});

app.post("/api/login", (req, res) => {
  const { email, senha } = req.body;

  if (email === "admin@almeida.com" && senha === "123456") {
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  return res.status(401).json({ erro: "Credenciais inválidas" });
});

// Rotas protegidas
app.get("/api/admin/imoveis", autenticar, (req, res) => {
  res.json(imoveis);
});

app.post("/api/admin/imoveis", autenticar, (req, res) => {
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
  imoveis.push(novo);
  console.log(imoveis);
  res.status(201).json(novo);
});

app.put("/api/admin/imoveis/:id", autenticar, (req, res) => {
  const index = imoveis.findIndex((i) => i.id === req.params.id);
  if (index === -1) return res.sendStatus(404);

  imoveis[index] = { ...imoveis[index], ...req.body, id: imoveis[index].id };
  res.json(imoveis[index]);
});

app.delete("/api/admin/imoveis/:id", autenticar, (req, res) => {
  const index = imoveis.findIndex((i) => i.id === req.params.id);
  if (index === -1) return res.sendStatus(404);

  const removido = imoveis.splice(index, 1);
  res.json(removido[0]);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});

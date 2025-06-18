const SECRET = "almeidanegocios2025"; // Em produção, use variável de ambiente

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

export default autenticar;
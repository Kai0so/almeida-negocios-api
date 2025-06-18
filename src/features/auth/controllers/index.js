import jwt from "jsonwebtoken";

const login = (req, res) => {
  const { email, senha } = req.body;

  if (email === "admin@almeida.com" && senha === "123456") {
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  return res.status(401).json({ erro: "Credenciais inválidas" });
};

const logout = (req, res) => {
  jwt.sign({}, SECRET, { expiresIn: 0 }); // Invalida o token
  res.status(200).json({ message: "Logout realizado com sucesso" });
};

export {
  login,
  logout
}
import express from "express";
import cors from "cors";
import adminRoutes from "./src/features/admin/routes/index.js";
import authRoutes from "./src/features/auth/routes/index.js";
import imovelRoutes from "./src/features/imovel/routes/index.js";

import mongoose from "mongoose";

const MONGO_URI =
  `mongodb://${process.env.mongo_db_user}:${process.env.mongo_db_pass}@${process.env.mongo_db_host}:${process.env.mongo_db_port}`; // TODO: Em produção, use variável de ambiente

mongoose.connect(MONGO_URI, { dbName: "almeida-negocios" })
.then(() => {
    console.log('🔥 Conectado ao MongoDB');
  })
  .catch((err) => console.error("❌ Erro na conexão:", err));

const app = express();
app.use(express.json());
app.use(cors());
adminRoutes(app);
authRoutes(app);
imovelRoutes(app);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});

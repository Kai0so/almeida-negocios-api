import { listarImoveis, buscarImovelPorId } from "../controllers/index.js";

const configRoutes = (app) => {
    // Rotas públicas
    app.get("/api/imoveis", listarImoveis);
    app.get("/api/imoveis/:id", buscarImovelPorId);
}

export default configRoutes;
import { login, logout } from "../controllers/index.js";
import autenticar from "../../../middlwares/auth.js";

const configRoutes = (app) => {
    app.post("/api/login", login);
    app.post("/api/logout", autenticar, logout);
}

export default configRoutes;
import autenticar from '../../../middlwares/auth.js';
import { listarImoveisAdmin, criarImovelAdmin, atualizarImovelAdmin, deletarImovelAdmin } from '../controllers/index.js'; // Ajuste o caminho conforme sua estrutura de past

const configRoutes = (router) => {
    router.get('/api/admin/imoveis', autenticar, listarImoveisAdmin);
    router.post('/api/admin/imoveis', autenticar, criarImovelAdmin);
    router.put('/api/admin/imoveis/:id', autenticar, atualizarImovelAdmin);
    router.delete('/api/admin/imoveis/:id', autenticar, deletarImovelAdmin);
}

export default configRoutes;
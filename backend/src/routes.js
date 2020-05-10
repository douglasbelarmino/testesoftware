const routes = require("express").Router();
const authMiddleware = require("./app/middlewares/auth");

const LoginController = require("./app/controllers/LoginController");
const EmpresaController = require("./app/controllers/EmpresaController");

routes.post("/autenticacao", LoginController.autenticacao);
routes.post("/cadastro", LoginController.cadastro);

routes.use(authMiddleware);

routes.get("/empresa", EmpresaController.index);
routes.post("/empresa/:id", EmpresaController.findOne);
routes.post("/empresa-cnpj", EmpresaController.findCnpj);
routes.post("/empresa", EmpresaController.store);
routes.put("/empresa/:id", EmpresaController.update);
routes.delete("/empresa/:id", EmpresaController.delete);

module.exports = routes;

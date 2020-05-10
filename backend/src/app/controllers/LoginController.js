const Login = require("../models/Login");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../functions/app");

module.exports = {
  async cadastro(req, res) {
    const { body } = req;

    try {
      const login = await Login.create(body);

      const { id } = login;
      login.senha = undefined;
      return res.json({ login, message: "Cadastro realizado. Você será redirecionado", ok: true, token: generateToken({ id }) });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError")
        return res.json({ message: error.errors[0].message, ok: false })
      else
        return res.json({ error, ok: false, message: "Ocorreu um erro, tente novamente" })

    }
  },
  async autenticacao(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha || !email.trim() || !senha.trim())
        return res
          .json({ message: "E-mail e Senha deve ser informados", ok: false });

      const login = await Login.findOne(
        { where: { email } },
        {
          include: {
            attributes: ["email", "senha"]
          }
        }
      );

      if (!login) {
        return res.json({ message: "Usuário não existe", ok: false });
      }

      if (!(await bcrypt.compare(senha, login.senha))) {
        return res.json({ message: "E-mail ou Senha incorretos", ok: false });
      }

      const { id } = login;
      login.senha = undefined;
      return res.json({ message: "Login realizado. Você será redirecionado", ok: true, token: generateToken({ id }) });
    } catch (error) {
      return res
        .json({
          error,
          message: "Ocorreu um erro, tente novamente",
          ok: false
        });
    }
  }
};

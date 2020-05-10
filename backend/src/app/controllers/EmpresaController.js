const Empresa = require("../models/Empresa");

module.exports = {
  async index(req, res) {
    try {
      const empresa = await Empresa.findAll();

      return res.status(200).json({ empresa, ok: true })

    } catch (error) {
      return res.status(500).json({ error, ok: false, message: "Ocorreu um erro, tente novamente" })
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const empresa = await Empresa.findOne({ where: { id } });

      if (!empresa) {
        return res.json({
          ok: false,
          message: "Empresa não cadastrada"
        });
      }

      return res.json({
        empresa,
        ok: true,
        message: ""
      });
    } catch (error) {
      return res.json({
        ok: false,
        message: "Ocorreu um erro, tente novamente."
      });
    }
  },

  async findCnpj(req, res) {
    const { cnpj } = req.body;
    try {
      const empresa = await Empresa.findOne({ where: { cnpj } });

      if (empresa) {
        return res.json({
          ok: false,
          message: "O CNPJ já existe"
        });
      }


      return res.json({
        empresa,
        ok: true,
        message: "Empresa não cadastrada"

      });
    } catch (error) {
      return res.json({
        ok: false,
        message: "Ocorreu um erro, tente novamente."
      });
    }
  },
  async store(req, res) {
    try {
      const { body } = req;

      const empresa = await Empresa.create(body);

      return res.json({ empresa, ok: true, message: "Cadastro realizado. Você será redirecionado" });

    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError")
        return res.json({ message: error.errors[0].message, ok: false })
      else
        return res.json({ error, ok: false, message: "Ocorreu um erro, tente novamente" })
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    try {
      const empresa = await Empresa.update(
        body,
        { returning: true, where: { id } });

      return res.status(200).json({ empresa, ok: true, message: "Cadastro atualizado. Você será redirecionado" });

    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError")
        return res.json({ message: error.errors[0].message, ok: false })
      else
        return res.json({ error, ok: false, message: "Ocorreu um erro, tente novamente" })
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      const empresa = await Empresa.destroy({ where: { id } });

      if (!empresa)
        return res.json({ empresa, ok: false, message: "Empresa não excluida, tente novamente" });

      return res.json({ empresa, ok: true, message: "Cadastro excluido. Aguarde..." });

    } catch (error) {
      return res.json({ error, ok: false, message: "Ocorreu um erro, tente novamente" })

    }
  }
}

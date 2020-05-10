const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
class Empresa extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
            msg: "O CNPJ já existe"
          },
          validate: {
            len: {
              args: [14, 14],
              msg: "O campo CNPJ deve ter 14 caracteres"
            },
            notNull: {
              msg: "O campo CNPJ deve ser preenchido"
            }
          }
        },
        razaoSocial: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "O campo Razão Social não pode ser em branco"
            },
            notNull: {
              msg: "O campo Razão Social deve ser preenchido"
            }
          }
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
            msg: "E-mail já existe"
          },
          validate: {
            notEmpty: {
              msg: "O campo E-mail não pode ser em branco"
            },
            notNull: {
              msg: "O campo E-mail deve ser preenchido"
            },
            isEmail: {
              msg: "O E-mail é invalido"
            }
          }
        },
        telefone: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
            msg: "O Telefone já existe"
          },
          validate: {
            notEmpty: {
              msg: "O campo Telefone não pode ser em branco"
            },
            notNull: {
              msg: "O campo Telefone deve ser preenchido"
            },
            len: {
              args: [10, 10],
              msg: "O campo Telefone deve ter 10 caracteres"
            },
          }
        },
        responsavel: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "O campo Responsável não pode ser em branco"
            },
            notNull: {
              msg: "O campo Responsável deve ser preenchido"
            }
          }
        },
        cidade: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "O campo Cidade não pode ser em branco"
            },
            notNull: {
              msg: "O campo Cidade não deve ser preenchido"
            }
          }
        }
      },
      {
        sequelize
      }
    );
  }
}

module.exports = Empresa;

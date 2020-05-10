const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
class Login extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "O campo Nome não pode ser em branco"
            },
            notNull: {
              msg: "O campo Nome deve ser preenchido"
            }
          }
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "O campo E-mail não pode ser em branco"
            },
            isEmail: {
              msg: "O E-mail deve ser valido"
            },
            notNull: {
              msg: "O campo Nome não deve ser preenchido"
            }
          },
          unique: {
            msg: "O E-mail já existe"
          },
        },
        senha: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [8, 255],
              msg: "O campo Senha deve ter no minimo 8 caracteres"
            },
            notNull: {
              msg: "O campo Nome não deve ser nulo"
            }
          }
        }
      },
      {
        hooks: {
          beforeSave: (user, options) => {
            return bcrypt.hash(user.senha, 10).then(hash => {
              user.senha = hash;
            });
          }
        },
        sequelize
      }
    );
  }
}

module.exports = Login;

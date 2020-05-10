const request = require("supertest");

const app = require("../../src/app");

describe("Login", () => {
  it("1 - Cadastro", async () => {
    const response = await request(app)
      .post("/cadastro")
      .send({
        nome: "Adm",
        email: "adm@gmail.com",
        senha: "12345678"
      });

    expect(response.body.ok).toBe(true);
  });

  it("2 - Login", async () => {
    const response = await request(app)
      .post("/autenticacao")
      .send({
        email: "adm@gmail.com",
        senha: "12345678"
      });

    expect(response.body.ok).toBe(true);
  });

  it("6 - Login já existe", async () => {
    const response = await request(app)
      .post("/cadastro")
      .send({
        email: "adm@gmail.com",
        senha: "123456789"
      });

    expect(response.body.ok).toBe(false);
  });

  it("7 - Senha incorreta", async () => {
    const response = await request(app)
      .post("/autenticacao")
      .send({
        email: "adm@gmail.com",
        senha: "senhaerrada"
      });

    expect(response.body.ok).toBe(false);
  });
});

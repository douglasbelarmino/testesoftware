const request = require("supertest");

const app = require("../../src/app");

describe("Empresa", () => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTczNzczNzE0LCJleHAiOjE1NzM4NjAxMTR9.UQJMgilK1NRj6tQ7xO_d7quEAUc7ulj2opRissj1jX4";
  it("3 - Cadastro", async () => {
    const response = await request(app)
      .post("/empresa")
      .send({
        razaoSocial: "Teste 1",
        cnpj: "64383894000129",
        email: "teste1@gmail.com",
        telefone: "5433103310",
        responsavel: "Teste 1",
        cidade: "Passo Fundo"
      })
      .set({ Authorization: token });

    expect(response.body.ok).toBe(true);
  });

  it("8 - O CNPJ já existe", async () => {
    const response = await request(app)
      .post("/empresa-cnpj")
      .send({
        cnpj: "64383894000129"
      })
      .set({ Authorization: token });

    expect(response.body.ok).toBe(false);
  });

  it("4 - Alterar", async () => {
    const response = await request(app)
      .put("/empresa/1")
      .send({
        razaoSocial: "Teste 2",
        cnpj: "64383894000130",
        email: "teste2@gmail.com",
        telefone: "5433103311",
        responsavel: "Teste 2",
        cidade: "Marau"
      })
      .set({ Authorization: token });

    expect(response.body.ok).toBe(true);
  });

  it("5 - Excluir", async () => {
    const response = await request(app)
      .delete("/empresa/1")
      .set({ Authorization: token });

    expect(response.body.ok).toBe(true);
  });
});

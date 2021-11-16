"use strict";

var _ICreateProductDTO = require("../../dtos/ICreateProductDTO");

var _InMemoryProductsRepository = require("../../repositories/in-memory/InMemoryProductsRepository");

var _ListProductsUseCase = require("./ListProductsUseCase");

let repository;
let useCase;
describe("List Products Use Case", () => {
  beforeEach(() => {
    repository = new _InMemoryProductsRepository.InMemoryProductsRepository();
    useCase = new _ListProductsUseCase.ListProductsUseCase(repository);
  });
  it("should be able to list all products", async () => {
    const response = await useCase.execute();
    expect(response).toBe([]);
  });
  it("should be able to list one products", async () => {
    await repository.create({
      name: "Fund test",
      percentage: "1.0",
      type: _ICreateProductDTO.FundsType.FIXED
    });
    const response = await useCase.execute();
    expect(response).toHaveProperty("id");
  });
});
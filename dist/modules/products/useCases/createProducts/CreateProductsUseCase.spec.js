"use strict";

var _ICreateProductDTO = require("../../dtos/ICreateProductDTO");

var _InMemoryProductsRepository = require("../../repositories/in-memory/InMemoryProductsRepository");

var _CreateProductsUseCase = require("./CreateProductsUseCase");

let repository;
let useCase;
let mock;
describe("Create Products Use Case", () => {
  beforeEach(() => {
    repository = new _InMemoryProductsRepository.InMemoryProductsRepository();
    useCase = new _CreateProductsUseCase.CreateProductsUseCase(repository);
    mock = {
      name: 'Fund Test',
      type: _ICreateProductDTO.FundsType.FIXED,
      percentage: '1.5%'
    };
  });
  it("should be able to create a product", async () => {
    const response = await useCase.execute(mock);
    expect(response).toHaveProperty("id");
  });
});
"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = _interopRequireDefault(require("../../repositories/in-memory/UsersRepositoryInMemory"));

var _CreateUserUseCase = require("../createUsers/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

var _InMemoryProductsRepository = require("../../../products/repositories/in-memory/InMemoryProductsRepository");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let authenticateUserUseCase;
let usersRepositoryInMemory;
let productsRepositoryInMemory;
let createUserUseCase;
let mockUser;
describe("Authenticate User", () => {
  beforeEach(() => {
    mockUser = {
      deadline: 5,
      email: "user@test.com",
      password: "12345",
      name: "User test"
    };
    usersRepositoryInMemory = new _UsersRepositoryInMemory.default();
    productsRepositoryInMemory = new _InMemoryProductsRepository.InMemoryProductsRepository();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory, productsRepositoryInMemory);
  });
  it("Should be able to authenticate an user", async () => {
    await createUserUseCase.execute(mockUser);
    const result = await authenticateUserUseCase.execute({
      email: mockUser.email,
      password: mockUser.password
    });
    expect(result).toHaveProperty("token");
  });
  it("Should be not be able to authenticate an non existent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: mockUser.email,
        password: mockUser.password
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it("Should be not be able to authenticate an with incorrect password", async () => {
    expect(async () => {
      await createUserUseCase.execute(mockUser);
      await authenticateUserUseCase.execute({
        email: mockUser.email,
        password: "passwordError"
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
});
"use strict";

var _UsersRepositoryInMemory = _interopRequireDefault(require("../../repositories/in-memory/UsersRepositoryInMemory"));

var _RemoveUsersUseCase = require("./RemoveUsersUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let repository;
let useCase;
describe("Remove Users Use Case", () => {
  beforeEach(() => {
    repository = new _UsersRepositoryInMemory.default();
    useCase = new _RemoveUsersUseCase.RemoveUsersUseCase(repository);
  });
  it("should be able to remove an user", async () => {
    await repository.create({
      deadline: 5,
      email: "test@unit.com",
      name: "a apagar",
      password: "admin@123"
    });
  });
});
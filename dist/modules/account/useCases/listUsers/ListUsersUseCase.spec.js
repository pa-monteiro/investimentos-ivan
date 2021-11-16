"use strict";

var _UsersRepositoryInMemory = _interopRequireDefault(require("../../repositories/in-memory/UsersRepositoryInMemory"));

var _ListUsersUseCase = require("./ListUsersUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let repository;
let useCase;
describe("List Users Use Case", () => {
  beforeEach(() => {
    repository = new _UsersRepositoryInMemory.default();
    useCase = new _ListUsersUseCase.ListUsersUseCase(repository);
  });
  it("should be able to list all users", async () => {
    const response = await useCase.execute();
    expect(response).toBe([]);
  });
});
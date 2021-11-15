import UsersRepositoryInMemory from "@modules/account/repositories/in-memory/UsersRepositoryInMemory";
import { ListUsersUseCase } from "./ListUsersUseCase";

let repository: UsersRepositoryInMemory;
let useCase: ListUsersUseCase;

describe("List Users Use Case", () => {
    beforeEach(() => {
        repository = new UsersRepositoryInMemory();
        useCase = new ListUsersUseCase(repository);
    })
    it("should be able to list all users", async() => {
        const response = await useCase.execute();
        expect(response).toBe([])
    })
})
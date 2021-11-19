import UsersRepositoryInMemory from "@modules/account/repositories/in-memory/UsersRepositoryInMemory";
import { RemoveUsersUseCase } from "./RemoveUsersUseCase";

let repository: UsersRepositoryInMemory;
let useCase: RemoveUsersUseCase;

describe("Remove Users Use Case", () => {
    beforeEach(() => {
        repository = new UsersRepositoryInMemory();
        useCase = new RemoveUsersUseCase(repository);
    })

    it("should be able to remove an user", async() => {
        await repository.create({
            deadline: 5,
            email: "test@unit.com",
            name: "a apagar",
            password: "admin@123",
        })
    })
})
import { FundsType } from "@modules/products/dtos/ICreateProductDTO";
import { InMemoryProductsRepository } from "@modules/products/repositories/in-memory/InMemoryProductsRepository"
import { ListProductsUseCase } from "./ListProductsUseCase";

let repository: InMemoryProductsRepository;
let useCase: ListProductsUseCase;

describe("List Products Use Case", () => {

    beforeEach(() => {
        repository = new InMemoryProductsRepository();
        useCase = new ListProductsUseCase(repository);
    })
    
    it("should be able to list all products", async() => {
        const response = await useCase.execute();

        expect(response).toBe([])

    })

    it("should be able to list one products", async() => {
        await repository.create({
            name: "Fund test",
            percentage: "1.0",
            type: FundsType.FIXED
        });

        const response = await useCase.execute();
        expect(response).toHaveProperty("id")

    })
})
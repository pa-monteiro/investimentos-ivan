import { FundsType, ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { InMemoryProductsRepository } from "@modules/products/repositories/in-memory/InMemoryProductsRepository"
import { CreateProductsUseCase } from "./CreateProductsUseCase";

let repository: InMemoryProductsRepository;
let useCase: CreateProductsUseCase;
let mock: ICreateProductDTO;

describe("Create Products Use Case", () => {
    beforeEach(() => {
        repository = new InMemoryProductsRepository();
        useCase = new CreateProductsUseCase(repository);
        mock = {
            name: 'Fund Test',
            type: FundsType.FIXED
        }
    })

    it("should be able to create a product", async() => {
      const response = await useCase.execute(mock);

      expect(response).toHaveProperty("id");
    })
})
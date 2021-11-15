import { AppError } from "@shared/errors/AppError";
import { ICreateUserDto } from "@modules/account/dtos/ICreateUserDto";
import UsersRepositoryInMemory from "@modules/account/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/account/useCases/createUsers/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { InMemoryProductsRepository } from "@modules/products/repositories/in-memory/InMemoryProductsRepository";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let productsRepositoryInMemory: InMemoryProductsRepository;
let createUserUseCase: CreateUserUseCase;
let mockUser: ICreateUserDto

describe("Authenticate User", () => {
    beforeEach(() => {
        mockUser = {
            deadline: 5,
            email: "user@test.com",
            password: "12345",
            name: "User test"
        }
        
        usersRepositoryInMemory = new UsersRepositoryInMemory(); 
        productsRepositoryInMemory = new InMemoryProductsRepository();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
            );
            createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory, productsRepositoryInMemory);
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
                })
            }).rejects.toBeInstanceOf(AppError)
        })

        it("Should be not be able to authenticate an with incorrect password", async () => {
            expect(async () => {
                await createUserUseCase.execute(mockUser);
                await authenticateUserUseCase.execute({
                    email: mockUser.email,
                    password: "passwordError"
                })
            }).rejects.toBeInstanceOf(AppError)
        })
    })
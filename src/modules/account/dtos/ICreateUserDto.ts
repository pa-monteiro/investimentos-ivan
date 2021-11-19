import { Product } from "@modules/products/infra/typeorm/entities/Product";

interface ICreateUserDto {
    name: string;
    email: string;
    password: string;
    deadline: number;
}

export {
    ICreateUserDto
}
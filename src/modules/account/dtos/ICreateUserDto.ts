interface ICreateUserDto {
    name: string;
    email: string;
    password: string;
    phone?: number;
    cpf?: number;
    cep?: number;
    address?: string;
    number?: number;
    complement?: string;
    neighborhood?: string;
}

export {
    ICreateUserDto
}
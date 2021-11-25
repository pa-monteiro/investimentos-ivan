export interface IUpdateUserDTO {
    name: string;
    email: string;
    phone?: number;
    cpf?: number;
    cep?: number;
    address?: string;
    number?: number;
    complement?: string;
    neighborhood?: string;
}
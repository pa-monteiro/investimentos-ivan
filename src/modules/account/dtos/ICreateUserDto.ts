interface ICreateUserDto {
    id?: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    avatar?: string;
}

export {
    ICreateUserDto
}
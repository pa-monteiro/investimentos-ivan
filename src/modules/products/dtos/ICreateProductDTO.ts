export enum FundsType {
    FIXED = 'fixed',
    VARIABLE = 'variable'
}

export interface ICreateProductDTO {
    name: string;
    type: FundsType;
}
export enum FundsType {
    FIXED = 'fixed',
    VARIABLE = 'variable'
}

export interface ICreateProductDTO {
    name: string;
    type: FundsType;
    percentage: string;
    deadline_transaction:number;
    value?: number;
}
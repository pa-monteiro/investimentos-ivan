export enum FundsType {
    FIXED = 'fixed',
    VARIABLE = 'variable'
}

export interface ICreateProductDTO {
    name: string;
    type: FundsType;
    percentage: string;
    withdrawal_deadline:number;
    deadline_contribution: number;
}
export enum FundsType {
    FIXED = 'fixed',
    VARIABLE = 'variable'
}

export interface ICreateProductDTO {
    name: string;
    type: FundsType;
    withdrawal_deadline:number;
    deadline_contribution: number;
    percentage?: string;
}
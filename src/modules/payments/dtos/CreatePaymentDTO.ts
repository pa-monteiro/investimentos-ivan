export interface CreatePaymentDTO {
    product_id: string;
    user_id: string;
    value: number;
    type: string;
    receipt_image: string;
}
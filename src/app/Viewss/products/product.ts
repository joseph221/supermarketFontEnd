export interface product{
    producode: string;
    cat_id: number;
    type: string;
    price: number;
    cost: number;
    itemName: string;
    brand: String;
    uom: String;
    cashierName?: string;
    qty?: number;
    receiptNo?:number
    productListId?:number
    picByte?:any

}
export interface Store{
    price: number,
    producode: string,
    qty: number,
    minimum_qty:number,
    amount?:number
}

export class Storee implements Store{
    constructor(
        public price: number,
        public producode: string,
        public qty: number,
        public minimum_qty:number,       
        public amount?: number
      ) {}
}
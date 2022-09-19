import { StringifyOptions } from "querystring";

export class TransferDetailDto {
    srNo: number;
    itemId: string;
    description: string
    FromLocId:number;
    qty: number;
    pqtyInHand: number | null;
    availqty: number | null;
    maxQty: number;
    remarks: number;
    lotNo:string;
    bundle:string;
    amount:number;
    conver:number;
    unit:string;
}

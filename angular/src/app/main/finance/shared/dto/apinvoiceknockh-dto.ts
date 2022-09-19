export class APINVKNOCKHDto {
    id:number;
    docNo: number;
    gLLOCID?: number;
    docDate?: string | Date;
    postDate?: string | Date;
    vendorCtrlAc: string;
    liabilityCtrlAc: string;
    locDesc: string;
    vendorCtrlAcDesc: string;
    vendorDesc: string;
    vendorID?: number;
    totalAmount?: number;
    closingBalance?: number;
    paymentOption: string;
    bankID: string;
    bAccountID: string;
    configID?: number;
    insType?: number;
    insNo: string;
    curID: string;
    curRate?: number;
    narration: string;
    posted: boolean;
    postedBy: string;
    postedDate?: string;
    linkDetID?: number;
    invoiceKnockOffDetailDto: APINVKNOCKDDto[]=new Array<APINVKNOCKDDto>();
}

export class APINVKNOCKDDto {
    detID?: number;
    docNo?: number;
    gRNNo: number;
    gRNDate: string;
    pONo: number;
    amount?: number;
    poAdvAmt?: number;
    advAdjusted?:number;
    grnAdjusted?: number;
    advPending?: number;
    grnPending?: number;
    advAdjust?: number;
    gRNAdjust?: number;
    
}
import * as moment from 'moment';
import { PORECHeaderDto } from '../dtos/porecHeader-dto';

export interface IPagedResultDtoOfPORECHeaderDto {
    totalCount: number | undefined;
    items: PORECHeaderDto[] | undefined;
}

export interface IPORECHeaderDto {
    locID: number | undefined;
    docNo: number | undefined;
    docDate: Date;
    accountID: string | undefined; 
    subAccID: number | undefined;
    narration: string | undefined;
    igpNo: string | undefined;
    billNo: string | undefined;
    billDate: Date;
    billAmt: number | undefined;
    totalQty: number | undefined;
    totalAmt:number | undefined;
    posted: boolean;
    linkDetID: number | undefined;
    poDocNo: number | undefined;
    ordNo: string | undefined;
    recDocNo: number | undefined;
    freight: number | undefined;
    addExp: number | undefined;
    ccid: string | undefined;
    addDisc: number | undefined;
    addLeak: number | undefined;
    addFreight: number | undefined;
    onHold: boolean;
    active:boolean;
    audtUser: string | undefined;
    audtDate: Date;
    createdBy: string | undefined;
    createDate: Date;
    id: number | undefined;
}

export interface ICreateOrEditPORECHeaderDto {
    locID:number | undefined;
    docNo:number | undefined;
    docDate: Date;
    accountID: string | undefined; 
    subAccID: number | undefined;
    narration: string | undefined;
    igpNo: string | undefined;
    billNo: string | undefined;
    billDate:Date;
    billAmt: number | undefined;
    totalQty: number | undefined;
    totalAmt:number | undefined;
    posted: boolean;
    linkDetID: number | undefined;
    poDocNo: number | undefined;
    ordNo: string | undefined;
    recDocNo: number | undefined;
    freight: number | undefined;
    addExp: number | undefined;
    ccid: string | undefined;
    addDisc: number | undefined;
    addLeak: number | undefined;
    addFreight: number | undefined;
    onHold: boolean;
    active:boolean;
    audtUser: string | undefined;
    audtDate:Date;
    createdBy: string | undefined;
    createDate:Date;
    id: number | undefined;
}
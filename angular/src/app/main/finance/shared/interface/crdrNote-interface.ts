import * as moment from 'moment';
import { CRDRNoteDto, GetCRDRNoteForViewDto, CreateOrEditCRDRNoteDto } from '../dto/crdrNote-dto';

export interface IPagedResultDtoOfGetCRDRNoteForViewDto {
    totalCount: number | undefined;
    items: GetCRDRNoteForViewDto[] | undefined;
}

export interface IGetCRDRNoteForViewDto {
    crdrNote: CRDRNoteDto | undefined;
}

export interface IGetCRDRNoteForEditOutput {
    crdrNote: CreateOrEditCRDRNoteDto | undefined;
}

export interface ICreateOrEditCRDRNoteDto {
    locID: number | undefined;
    docNo: number | undefined;
    docDate: Date;
    postingDate: Date;
    paymentDate: Date;
    typeID: number | undefined;
    transType: string | undefined;
    accountID: string | undefined;
    subAccID: number | undefined;
    invoiceNo: number | undefined;
    partyInvNo: string | undefined;
    partyInvDate: Date;    
    partyInvAmount: number | undefined;
    amount: number | undefined;
    reason: string | undefined;
    stkAccID: string | undefined;
    posted: boolean | undefined;
    linkDetID: number | undefined;
    active: boolean | undefined;
    audtUser: string | undefined;
    audtDate: Date;
    createdBy: string | undefined;
    createDate: Date;
    id: number | undefined;
}

export interface ICRDRNoteDto {
    locID: number | undefined;
    docNo: number | undefined;
    docDate: Date;
    postingDate: Date;
    paymentDate: Date;
    typeID: number | undefined;
    transType: string | undefined;
    accountID: string | undefined;
    subAccID: number | undefined;
    invoiceNo: number | undefined;
    partyInvNo: string | undefined;
    partyInvDate:Date;    
    partyInvAmount: number | undefined;
    amount: number | undefined;
    reason: string | undefined;
    stkAccID: string | undefined;
    posted: boolean | undefined;
    linkDetID: number | undefined;
    active: boolean | undefined;
    audtUser: string | undefined;
    audtDate: Date;
    createdBy: string | undefined;
    createDate: Date;
    id: number | undefined;
}
import * as moment from 'moment';
import { LCExpensesHeaderDto, CreateOrEditLCExpensesHeaderDto, GetLCExpensesHeaderForViewDto } from '../dto/lcExpensesHeader-dto';
import { CreateOrEditLCExpensesDetailDto } from '../dto/lcExpensesDetail-dto';

export interface IPagedResultDtoOfLCExpensesHeaderDto {
    totalCount: number | undefined;
    items: LCExpensesHeaderDto[] | undefined;
}

export interface ILCExpensesHeaderDto {
    locID: number | undefined;
    docNo: number | undefined;
    typeID: string | undefined;
    docDate: moment.Moment | undefined;
    accountID: string | undefined;
    subAccID: number | undefined;
    lcNumber: string | undefined;
    payableAccID: string | undefined;
    payableSL: number | undefined;
    payableSLName: string | undefined;
    active: string | undefined;
    audtUser: string | undefined;
    audtDate: moment.Moment | undefined;
    createdBy: string | undefined;
    createDate: moment.Moment | undefined;
    id: number | undefined;
    curId: string;
    bankId: string;
    consigneeName: string;
    consigneeBank: string;
    vessel: string;
    remarks: string;
    totalPkg: number;
    totalWgt: number;
    shipDate: string;
    days: number;
}

export interface ICreateOrEditLCExpensesHeaderDto {
    flag: boolean | undefined
    lcExpensesDetail: CreateOrEditLCExpensesDetailDto[] | undefined;
    locID: number | undefined;
    docNo: number | undefined;
    typeID: string | undefined;
    docDate: moment.Moment | undefined;
    accountID: string | undefined;
    subAccID: number | undefined;
    lcNumber: string | undefined;
    payableAccID: string | undefined;
    payableSL: number | undefined;
    payableSLName: string | undefined;
    active: string | undefined;
    audtUser: string | undefined;
    audtDate: moment.Moment | undefined;
    createdBy: string | undefined;
    createDate: moment.Moment | undefined;
    id: number | undefined;
    narration: string | undefined;
    curId: string;
    bankId: string;
    consigneeName: string;
    consigneeBank: string;
    vessel: string;
    remarks: string;
    totalPkg: number;
    totalWgt: number;
    shipDate: moment.Moment | undefined;
    days: number;
}


export interface IGetLCExpensesHeaderForEditOutput {
    lcExpensesHeader: CreateOrEditLCExpensesHeaderDto | undefined;
}


export interface IGetLCExpensesHeaderForViewDto {
    lcExpensesHeader: LCExpensesHeaderDto | undefined;
}

export interface IPagedResultDtoOfGetLCExpensesHeaderForViewDto {
    totalCount: number | undefined;
    items: GetLCExpensesHeaderForViewDto[] | undefined;
}
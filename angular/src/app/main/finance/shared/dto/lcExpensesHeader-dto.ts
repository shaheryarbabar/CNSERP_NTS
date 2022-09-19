import * as moment from "moment";
import {
    ILCExpensesHeaderDto,
    ICreateOrEditLCExpensesHeaderDto,
    IPagedResultDtoOfLCExpensesHeaderDto,
    IGetLCExpensesHeaderForEditOutput,
    IGetLCExpensesHeaderForViewDto,
    IPagedResultDtoOfGetLCExpensesHeaderForViewDto
} from "../interface/lcExpensesHeader-interface";
import { CreateOrEditLCExpensesDetailDto } from "./lcExpensesDetail-dto";

export class PagedResultDtoOfLCExpensesHeaderDto
    implements IPagedResultDtoOfLCExpensesHeaderDto {
    totalCount!: number | undefined;
    items!: LCExpensesHeaderDto[] | undefined;

    constructor(data?: IPagedResultDtoOfLCExpensesHeaderDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.totalCount = data["totalCount"];
            if (data["items"] && data["items"].constructor === Array) {
                this.items = [] as any;
                for (let item of data["items"])
                    this.items!.push(LCExpensesHeaderDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfLCExpensesHeaderDto {
        data = typeof data === "object" ? data : {};
        let result = new PagedResultDtoOfLCExpensesHeaderDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === "object" ? data : {};
        data["totalCount"] = this.totalCount;
        if (this.items && this.items.constructor === Array) {
            data["items"] = [];
            for (let item of this.items) data["items"].push(item.toJSON());
        }
        return data;
    }
}

export class LCExpensesHeaderDto implements ILCExpensesHeaderDto {
    locID!: number | undefined;
    docNo!: number | undefined;
    docDate!: moment.Moment | undefined;
    typeID!: string | undefined;
    accountID!: string | undefined;
    subAccID!: number | undefined;
    lcNumber!: string | undefined;
    payableAccID!: string | undefined;
    payableSL!: number | undefined;
    payableSLName!: string | undefined;
    active!: string | undefined;
    audtUser!: string | undefined;
    audtDate!: moment.Moment | undefined;
    createdBy!: string | undefined;
    createDate!: moment.Moment | undefined;
    id!: number | undefined;
    linkDetID!: number | undefined;
    posted!: boolean | undefined;
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
    constructor(data?: ILCExpensesHeaderDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            debugger;
            this.locID = data["locID"];
            this.docNo = data["docNo"];
            this.typeID = data["typeID"];
            this.docDate = data["docDate"];
            this.accountID = data["accountID"];
            this.subAccID = data["subAccID"];
            this.lcNumber = data["lcNumber"];
            this.payableAccID = data["payableAccID"];
            this.payableSL = data["payableSL"];
            this.payableSLName =  data["payableSLName"]
            this.active = data["active"];
            this.audtUser = data["audtUser"];
            this.audtDate = data["audtDate"];
            this.createdBy = data["createdBy"];
            this.createDate = data["createDate"];
            this.id = data["id"];
            this.linkDetID = data["linkDetID"];
            this.posted = data["posted"];
            this.bankId = data["bankId"];
            this.consigneeBank = data["consigneeBank"];
            this.consigneeName = data["consigneeName"];
            this.curId = data["curId"];
            this.days = data["days"];
            this.remarks = data["remarks"];
            this.shipDate = data["shipDate"];
            this.totalPkg = data["totalPkg"];
            this.totalWgt = data["totalWgt"];
            this.vessel = data["vessel"];
        }
    }

    static fromJS(data: any): LCExpensesHeaderDto {
        data = typeof data === "object" ? data : {};
        let result = new LCExpensesHeaderDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        debugger;
        data = typeof data === "object" ? data : {};
        data["locID"] = this.locID;
        data["docNo"] = this.docNo;
        data["typeID"] = this.typeID;
        data["docDate"] = this.docDate;
        data["accountID"] = this.accountID;
        data["subAccID"] = this.subAccID;
        data["lcNumber"] = this.lcNumber;
        data["payableAccID"] = this.payableAccID;
        data["payableSL"] = this.payableSL;
        data["payableSLName"] = this.payableSLName;
        data["active"] = this.active;
        data["audtUser"] = this.audtUser;
        data["audtDate"] = this.audtDate;
        data["createdBy"] = this.createdBy;
        data["createDate"] = this.createDate;
        data["id"] = this.id;
        data["linkDetID"] = this.linkDetID;
        data["posted"] = this.posted;
        data["bankId"] = this.bankId
        data["consigneeBank"] = this.consigneeBank
        data["consigneeName"] = this.consigneeName
        data["curId"] = this.curId;
        data["days"] = this.days;
        data["remarks"] = this.remarks
        data["shipDate"] = this.shipDate;
        data["totalPkg"] = this.totalPkg;
        data["totalWgt"] = this.totalWgt;
        data["vessel"] = this.vessel;
        return data;
    }
}

export class CreateOrEditLCExpensesHeaderDto
    implements ICreateOrEditLCExpensesHeaderDto {
    flag!: boolean | undefined;
    lcExpensesDetail!: CreateOrEditLCExpensesDetailDto[] | undefined;
    locID!: number | undefined;
    docNo!: number | undefined;
    typeID!: string | undefined;
    docDate!: moment.Moment | undefined;
    accountID!: string | undefined;
    subAccID!: number | undefined;
    lcNumber!: string | undefined;
    payableAccID!: string | undefined;
    payableSL!: number | undefined;
    payableSLName!: string | undefined;
    active!: string | undefined;
    audtUser!: string | undefined;
    audtDate!: moment.Moment | undefined;
    createdBy!: string | undefined;
    createDate!: moment.Moment | undefined;
    id!: number | undefined;
    linkDetID!: number | undefined;
    posted!: boolean | undefined;
    narration!: string | undefined;
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

    constructor(data?: ICreateOrEditLCExpensesHeaderDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            debugger;
            this.locID = data["locID"];
            this.docNo = data["docNo"];
            this.typeID = data["typeID"];
            this.docDate = data["docDate"];
            this.accountID = data["accountID"];
            this.subAccID = data["subAccID"];
            this.lcNumber = data["lcNumber"];
            this.payableAccID = data["payableAccID"];
            this.payableSL = data["payableSL"];
            this.payableSLName = data["payableSLName"];
            this.active = data["active"];
            this.audtUser = data["audtUser"];
            this.audtDate = data["audtDate"];
            this.createdBy = data["createdBy"];
            this.createDate = data["createDate"];
            this.id = data["id"];
            this.linkDetID = data["linkDetID"];
            this.posted = data["posted"];
            this.narration = data["narration"];
            this.bankId = data["bankId"];
            this.consigneeBank = data["consigneeBank"];
            this.consigneeName = data["consigneeName"];
            this.curId = data["curId"];
            this.days = data["days"];
            this.remarks = data["remarks"];
            this.shipDate = data["shipDate"];
            this.totalPkg = data["totalPkg"];
            this.totalWgt = data["totalWgt"];
            this.vessel = data["vessel"];
            this.lcExpensesDetail = [] as any;
            for (let item of data["lcExpensesDetail"])
                this.lcExpensesDetail!.push(
                    CreateOrEditLCExpensesDetailDto.fromJS(item)
                );
        }
    }

    static fromJS(data: any): CreateOrEditLCExpensesHeaderDto {
        data = typeof data === "object" ? data : {};
        let result = new CreateOrEditLCExpensesHeaderDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        debugger;
        data = typeof data === "object" ? data : {};
        data["flag"] = this.flag;
        data["locID"] = this.locID;
        data["docNo"] = this.docNo;
        data["typeID"] = this.typeID;
        data["docDate"] = this.docDate;
        data["accountID"] = this.accountID;
        data["subAccID"] = this.subAccID;
        data["lcNumber"] = this.lcNumber;
        data["payableAccID"] = this.payableAccID;
        data["payableSL"] = this.payableSL;
        data["payableSLName"] = this.payableSLName ;
        data["active"] = this.active;
        data["audtUser"] = this.audtUser;
        data["audtDate"] = this.audtDate;
        data["createdBy"] = this.createdBy;
        data["createDate"] = this.createDate;
        data["id"] = this.id;
        data["linkDetID"] = this.linkDetID;
        data["posted"] = this.posted;
        data["narration"] = this.narration;
        data["bankId"] = this.bankId
        data["consigneeBank"] = this.consigneeBank
        data["consigneeName"] = this.consigneeName
        data["curId"] = this.curId;
        data["days"] = this.days;
        data["remarks"] = this.remarks
        data["shipDate"] = this.shipDate;
        data["totalPkg"] = this.totalPkg;
        data["totalWgt"] = this.totalWgt;
        data["vessel"] = this.vessel;

        if (
            this.lcExpensesDetail &&
            this.lcExpensesDetail.constructor === Array
        ) {
            data["lcExpensesDetail"] = [];
            for (let item of this.lcExpensesDetail)
                data["lcExpensesDetail"].push(item);
        }
        return data;
    }
}

export class PagedResultDtoOfGetLCExpensesHeaderForViewDto
    implements IPagedResultDtoOfGetLCExpensesHeaderForViewDto {
    totalCount!: number | undefined;
    items!: GetLCExpensesHeaderForViewDto[] | undefined;

    constructor(data?: IPagedResultDtoOfGetLCExpensesHeaderForViewDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.totalCount = data["totalCount"];
            if (data["items"] && data["items"].constructor === Array) {
                this.items = [] as any;
                for (let item of data["items"])
                    this.items!.push(
                        GetLCExpensesHeaderForViewDto.fromJS(item)
                    );
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfGetLCExpensesHeaderForViewDto {
        data = typeof data === "object" ? data : {};
        let result = new PagedResultDtoOfGetLCExpensesHeaderForViewDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === "object" ? data : {};
        data["totalCount"] = this.totalCount;
        if (this.items && this.items.constructor === Array) {
            data["items"] = [];
            for (let item of this.items) data["items"].push(item.toJSON());
        }
        return data;
    }
}

export class GetLCExpensesHeaderForViewDto
    implements IGetLCExpensesHeaderForViewDto {
    lcExpensesHeader!: LCExpensesHeaderDto | undefined;

    constructor(data?: IGetLCExpensesHeaderForViewDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        debugger;
        if (data) {
            this.lcExpensesHeader = data["lcExpensesHeader"]
                ? LCExpensesHeaderDto.fromJS(data["lcExpensesHeader"])
                : <any>undefined;
        }
    }

    static fromJS(data: any): GetLCExpensesHeaderForViewDto {
        data = typeof data === "object" ? data : {};
        let result = new GetLCExpensesHeaderForViewDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === "object" ? data : {};
        data["lcExpensesHeader"] = this.lcExpensesHeader
            ? this.lcExpensesHeader.toJSON()
            : <any>undefined;
        return data;
    }
}

export class GetLCExpensesHeaderForEditOutput
    implements IGetLCExpensesHeaderForEditOutput {
    lcExpensesHeader: CreateOrEditLCExpensesHeaderDto | undefined;

    constructor(data?: IGetLCExpensesHeaderForEditOutput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        debugger;
        if (data) {
            this.lcExpensesHeader = data["lcExpensesHeader"]
                ? CreateOrEditLCExpensesHeaderDto.fromJS(
                    data["lcExpensesHeader"]
                )
                : <any>undefined;
        }
    }

    static fromJS(data: any): GetLCExpensesHeaderForEditOutput {
        debugger;
        data = typeof data === "object" ? data : {};
        let result = new GetLCExpensesHeaderForEditOutput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === "object" ? data : {};

        data["lcExpensesHeader"] = this.lcExpensesHeader
            ? this.lcExpensesHeader.toJSON()
            : <any>undefined;
        return data;
    }
}
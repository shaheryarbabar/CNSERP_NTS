import * as moment from 'moment';
import { IPagedResultDtoOfPORECHeaderDto, IPORECHeaderDto, ICreateOrEditPORECHeaderDto } from '../interfaces/porecHeader-interface';

export class PagedResultDtoOfPORECHeaderDto implements IPagedResultDtoOfPORECHeaderDto {
    totalCount!: number | undefined;
    items!: PORECHeaderDto[] | undefined;

    constructor(data?: IPagedResultDtoOfPORECHeaderDto) {
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
                    this.items!.push(PORECHeaderDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfPORECHeaderDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfPORECHeaderDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalCount"] = this.totalCount;
        if (this.items && this.items.constructor === Array) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data; 
    }
}

export class PORECHeaderDto implements IPORECHeaderDto {
    locID!: number | undefined;
    docNo!: number | undefined;
    docDate!: Date;
    accountID!: string | undefined; 
    accDesc!: string | undefined; 
    subAccID!: number | undefined;
    subAccDesc!: string | undefined; 
    narration!: string | undefined;
    igpNo!: string | undefined;
    billNo!: string | undefined;
    billDate!: Date;
    billAmt!: number | undefined;
    totalQty!: number | undefined;
    totalAmt!:number | undefined;
    posted!: boolean;
    postedBy!: string | undefined;
    postedDate!: Date;
    approved!:boolean;
    approvedBy!:string | undefined;
    approvedDate!:Date;
    linkDetID!: number | undefined;
    poDocNo!: number | undefined;
    ordNo!: string | undefined;
    recDocNo!: number | undefined;
    freight!: number | undefined;
    addExp!: number | undefined;
    ccid!: string | undefined;
    ccDesc!: string | undefined; 
    addDisc!: number | undefined;
    addLeak!: number | undefined;
    addFreight!: number | undefined;
    onHold!: boolean;
    active!: boolean;
    audtUser!: string | undefined;
    audtDate!: Date;
    createdBy!: string | undefined;
    createDate!: Date;
    id!: number | undefined;
    

    constructor(data?: IPORECHeaderDto) {
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
            this.locID=data["locID"];
            this.docNo = data["docNo"];
            this.docDate = data["docDate"] ;
            this.accountID = data["accountID"];
            this.accDesc = data["accDesc"];
            this.subAccID = data["subAccID"];
            this.subAccDesc = data["subAccDesc"];
            this.narration = data["narration"];
            this.igpNo =data["igpNo"]
            this.billNo =data["billNo"]
            this.billDate = data["billDate"];
            this.billAmt = data["billAmt"];
            this.totalQty = data["totalQty"];
            this.totalAmt = data["totalAmt"];
            this.posted= data["posted"];
            this.postedBy= data["postedBy"];
            this.postedDate = data["postedDate"] ;
            this.approved = data["approved"];
            this.approvedBy = data["approvedBy"];
            this.approvedDate = data["approvedDate"];
            this.linkDetID = data["linkDetID"];
            this.poDocNo = data["poDocNo"];
            this.ordNo = data["ordNo"];
            this.recDocNo = data["recDocNo"];
            this.freight = data["freight"];
            this.addExp = data["addExp"];
            this.ccid = data["ccid"];
            this.ccDesc = data["ccDesc"];
            this.addDisc = data["addDisc"];
            this.addLeak = data["addLeak"];
            this.addFreight = data["addFreight"];
            this.onHold = data["onHold"];
            this.active = data["active"];
            this.audtUser = data["audtUser"];
            this.audtDate = data["audtDate"] ;
            this.createdBy = data["createdBy"];
            this.createDate = data["createDate"] ;
            this.id = data["id"];
        }
    }

    static fromJS(data: any): PORECHeaderDto {
        data = typeof data === 'object' ? data : {};
        let result = new PORECHeaderDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {debugger
        debugger;
        data = typeof data === 'object' ? data : {};
        data["locID"]=this.locID;
        data["docNo"] = this.docNo;
        data["docDate"] = this.docDate;
        data["accountID"]= this.accountID;
        data["accDesc"]= this.accDesc;
        data["subAccID"]= this.subAccID;
        data["subAccDesc"]= this.subAccDesc;
        data["narration"] = this.narration;
        data["igpNo"]= this.igpNo;
        data["billNo"]= this.billNo;
        data["billDate"]= this.billDate ;
        data["billAmt"]= this.billAmt; 
        data["totalQty"]= this.totalQty;
        data["totalAmt"]= this.totalAmt;
        data["posted"]=this.posted;
        data["postedBy"]=this.postedBy;
        data["postedDate"]= this.postedDate ;
        data["approved"] = this.approved;
        data["approvedBy"] = this.approvedBy;
        data["approvedDate"] = this.approvedDate;
        data["linkDetID"]=this.linkDetID;
        data["poDocNo"]=this.poDocNo;
        data["ordNo"]= this.ordNo;
        data["recDocNo"]= this.recDocNo;
        data["freight"]= this.freight;
        data["addExp"]= this.addExp;
        data["ccid"]= this.ccid;
        data["ccDesc"]= this.ccDesc;
        data["addDisc"]= this.addDisc;
        data["addLeak"]= this.addLeak;
        data["addFreight"]= this.addFreight;
        data["onHold"]= this.onHold;
        data["active"] = this.active;
        data["audtUser"] = this.audtUser;
        data["audtDate"] = this.audtDate ;
        data["createdBy"] = this.createdBy;
        data["createDate"] = this.createDate ;
        data["id"] = this.id;
        return data; 
    }
}

export class CreateOrEditPORECHeaderDto implements ICreateOrEditPORECHeaderDto {
    locID!: number | undefined;
    docNo!: number | undefined;
    docDate!: Date;
    accountID!: string | undefined; 
    subAccID!: number | undefined;
    narration!: string | undefined;
    igpNo!: string | undefined;
    billNo!: string | undefined;
    billDate!: Date;
    billAmt!: number | undefined;
    totalQty!: number | undefined;
    totalAmt!:number | undefined;
    posted!: boolean;
    postedBy!: string | undefined;
    postedDate!:Date;
    approved!:boolean|false;
    approvedBy!:string | undefined;
    approvedDate!:Date;
    linkDetID!: number | undefined;
    poDocNo!: number | undefined;
    ordNo!: string | undefined;
    recDocNo!: number | undefined;
    freight!: number | undefined;
    addExp!: number | undefined;
    ccid!: string | undefined;
    addDisc!: number | undefined;
    addLeak!: number | undefined;
    addFreight!: number | undefined;
    onHold!: boolean;
    active!: boolean|true;
    audtUser!: string | undefined;
    audtDate!: Date;
    createdBy!: string | undefined;
    createDate!: Date;
    id!: number | undefined;

    constructor(data?: ICreateOrEditPORECHeaderDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.locID=data["locID"];
            this.docNo = data["docNo"];
            this.docDate = data["docDate"] ;
            this.accountID = data["accountID"];
            this.subAccID = data["subAccID"];
            this.narration = data["narration"];
            this.igpNo =data["igpNo"]
            this.billNo =data["billNo"]
            this.billDate = data["billDate"] ;
            this.billAmt = data["billAmt"];
            this.totalQty = data["totalQty"];
            this.totalAmt = data["totalAmt"];
            this.posted= data["posted"];
            this.postedBy= data["postedBy"];
            this.postedDate = data["postedDate"] ;
            this.approved = data["approved"];
            this.approvedBy = data["approvedBy"];
            this.approvedDate = data["approvedDate"];
            this.linkDetID = data["linkDetID"];
            this.poDocNo = data["poDocNo"];
            this.ordNo = data["ordNo"];
            this.recDocNo = data["recDocNo"];
            this.freight = data["freight"];
            this.addExp = data["addExp"];
            this.ccid = data["ccid"];
            this.addDisc = data["addDisc"];
            this.addLeak = data["addLeak"];
            this.addFreight = data["addFreight"];
            this.onHold = data["onHold"];
            this.active = data["active"];
            this.audtUser = data["audtUser"];
            this.audtDate = data["audtDate"] ;
            this.createdBy = data["createdBy"];
            this.createDate = data["createDate"] ;
            this.id = data["id"];
        }
    }

    static fromJS(data: any): CreateOrEditPORECHeaderDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditPORECHeaderDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["locID"]=this.locID;
        data["docNo"] = this.docNo;
        data["docDate"] = this.docDate ;
        data["accountID"]= this.accountID;
        data["subAccID"]= this.subAccID;
        data["narration"] = this.narration;
        data["igpNo"]= this.igpNo;
        data["billNo"]= this.billNo;
        data["billDate"]= this.billDate ;
        data["billAmt"]= this.billAmt; 
        data["totalQty"]= this.totalQty;
        data["totalAmt"]= this.totalAmt;
        data["posted"]=this.posted;
        data["postedBy"]=this.postedBy;
        data["postedDate"]= this.postedDate ;
        data["approved"] = this.approved;
        data["approvedBy"] = this.approvedBy;
        data["approvedDate"] = this.approvedDate ;
        data["linkDetID"]=this.linkDetID;
        data["poDocNo"]=this.poDocNo;
        data["ordNo"]= this.ordNo;
        data["recDocNo"]= this.recDocNo;
        data["freight"]= this.freight;
        data["addExp"]= this.addExp;
        data["ccid"]= this.ccid;
        data["addDisc"]= this.addDisc;
        data["addLeak"]= this.addLeak;
        data["addFreight"]= this.addFreight;
        data["onHold"]= this.onHold;
        data["active"] = this.active;
        data["audtUser"] = this.audtUser;
        data["audtDate"] = this.audtDate ;
        data["createdBy"] = this.createdBy;
        data["createDate"] = this.createDate ;
        data["id"] = this.id;
        return data; 
    }
}

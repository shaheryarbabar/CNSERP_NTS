import {
    Component,
    ViewChild,
    Injector,
    Output,
    EventEmitter
} from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "@shared/common/app-component-base";
import * as moment from "moment";
import { AutoWidthCalculator, GridOptions } from "ag-grid-community";
import { FinanceLookupTableModalComponent } from "@app/finders/finance/finance-lookup-table-modal.component";
import { CreateOrEditLCExpensesHeaderDto } from "@app/main/finance/shared/dto/lcExpensesHeader-dto";
import { CreateOrEditLCExpensesDetailDto } from "@app/main/finance/shared/dto/lcExpensesDetail-dto";
import { LCExpensesHeaderService } from "@app/main/finance/shared/services/lcExpensesHeader.service";
import { LCExpensesDetailsServiceProxy } from "@app/main/finance/shared/services/lcExpensesDetail.service";
import { AgGridExtend } from "@app/shared/common/ag-grid-extend/ag-grid-extend";
import {
    CreateOrEditGLTRDetailDto,
    CreateOrEditGLTRHeaderDto,
    VoucherEntryDto,
    VoucherEntryServiceProxy
} from "@shared/service-proxies/service-proxies";
import { GlChequesService } from "@app/main/finance/shared/services/glCheques.service";
import { InventoryLookupTableModalComponent } from "@app/finders/supplyChain/inventory/inventory-lookup-table-modal.component";
import { CommonServiceLookupTableModalComponent } from "@app/finders/commonService/commonService-lookup-table-modal.component";
import { param } from "jquery";
import { debug } from "console";

@Component({
    selector: "createOrEditLCExpensesHDModal",
    templateUrl: "./create-or-edit-LCExpensesHD-modal.component.html"
})
export class CreateOrEditLCExpensesHDModalComponent extends AppComponentBase {
    @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
    @ViewChild("FinanceLookupTableModal", { static: true })
    FinanceLookupTableModal: FinanceLookupTableModalComponent;
    @ViewChild("inventoryLookupTableModal", { static: true })
    inventoryLookupTableModal: InventoryLookupTableModalComponent;
    @ViewChild("commonserviceLookuptable", { static: true })
    commonserviceLookuptable: CommonServiceLookupTableModalComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    protected jsonParseReviver:
        | ((key: string, value: any) => any)
        | undefined = undefined;

    active = false;
    saving = false;
    processing = false;
    private setParms;

    lcExpensesHeader: CreateOrEditLCExpensesHeaderDto = new CreateOrEditLCExpensesHeaderDto();
    lcExpensesDetail: CreateOrEditLCExpensesDetailDto = new CreateOrEditLCExpensesDetailDto();
    agGridExtend: AgGridExtend = new AgGridExtend();
    gltrHeader: CreateOrEditGLTRHeaderDto = new CreateOrEditGLTRHeaderDto();
    gltrDetail: CreateOrEditGLTRDetailDto = new CreateOrEditGLTRDetailDto();
    gltrDetailArr: CreateOrEditGLTRDetailDto[] = Array<
        CreateOrEditGLTRDetailDto
    >();
    voucherEntry: VoucherEntryDto = new VoucherEntryDto();

    public gridOptions: GridOptions;

    target: string;
    isUpdate: boolean;
    payableAccDesc: string;
    locDesc: string;
    bankDesc: string;
    docDate: Date;
    shipDate: Date;
    totalAmount: number;
    allPost: boolean = true;
    JvAmt: number;
    DisplayExp: string;
    amountCount: number = 0;
    linkid: number = 0;
    GrowNo: number = 0;
    payableSLName :string ;

    constructor(
        injector: Injector,
        private _lcExpensesHeaderService: LCExpensesHeaderService,
        private _lcExpensesDetailService: LCExpensesDetailsServiceProxy,
        private _service: GlChequesService,
        private _voucherEntryServiceProxy: VoucherEntryServiceProxy
    ) {
        super(injector);
        this.totalAmount = 0;
    }

    approve() {
        debugger
        if (this.JvAmt > 0 && this.DisplayExp != null && this.DisplayExp != "") {
            if (this.lcExpensesHeader.id && !this.linkid) {
                this.processing = true;
                debugger;
                this.message.confirm(
                    'Document Posted',
                    (isConfirmed) => {
                        if (isConfirmed) {
                            this._voucherEntryServiceProxy.getBaseCurrency().subscribe(result => {
                                debugger;
                                if (result) {
                                    this.voucherEntry.gltrHeader = new CreateOrEditGLTRHeaderDto();
                                    this.voucherEntry.gltrDetail = new Array<
                                        CreateOrEditGLTRDetailDto
                                    >();
                                    this.voucherEntry.gltrHeader.curid = result.id;
                                    this.voucherEntry.gltrHeader.currate = result.currRate;
                                    this._voucherEntryServiceProxy
                                        .getMaxDocId(
                                            "JV",
                                            true,
                                            moment(this.lcExpensesHeader.docDate).format("LLLL")
                                        )
                                        .subscribe(result => {
                                            this.voucherEntry.gltrHeader.docNo = this.lcExpensesHeader.docNo;
                                            this.voucherEntry.gltrHeader.fmtDocNo = result;
                                            this.voucherEntry.gltrHeader.docDate = moment(
                                                this.lcExpensesHeader.docDate
                                            );
                                            this.voucherEntry.gltrHeader.amount = this.JvAmt;
                                            this.voucherEntry.gltrHeader.configID = 0;
                                            //this.voucherEntry.gltrHeader.chNumber = this.lcExpensesHeader.chequeNo;
                                            //this.voucherEntry.gltrHeader.reference = this.lcExpensesHeader.partyName;
                                            // this.voucherEntry.gltrHeader.chType = this.lcExpensesHeader.ch;
                                            this.voucherEntry.gltrHeader.locId = this.lcExpensesHeader.locID;
                                            this.voucherEntry.gltrHeader.approved = true;
                                            //this.voucherEntry.gltrHeader.curid = "PKR";
                                            debugger;
                                            this.voucherEntry.gltrHeader.docMonth =
                                                moment(this.lcExpensesHeader.docDate).month() + 1;
                                            // this.voucherEntry.gltrHeader.currate = 1;
                                            this.voucherEntry.gltrHeader.posted = false;
                                            this.voucherEntry.gltrHeader.bookID = "JV";
                                            this.voucherEntry.gltrHeader.auditTime = moment();
                                            this.voucherEntry.gltrHeader.auditUser = this.appSession.user.userName;
                                            this.voucherEntry.gltrHeader.narration =
                                                "LC - Voucher No :" +
                                                this.lcExpensesHeader.docNo.toString() +
                                                ", LC Number: " +
                                                this.lcExpensesHeader.lcNumber;

                                            //if(this.glCheques.typeID=="1"){
                                            this.gltrDetailArr = new Array<
                                                CreateOrEditGLTRDetailDto
                                            >();
                                            this.gltrDetail = new CreateOrEditGLTRDetailDto();
                                            this.gltrDetail.accountID = this.lcExpensesHeader.accountID;
                                            this.gltrDetail.subAccID = this.lcExpensesHeader.subAccID;
                                            this.gltrDetail.amount = -this.JvAmt;
                                            //this.gltrDetail.chequeNo = this.voucherEntry.gltrHeader.chNumber;
                                            this.gltrDetail.isAuto = false;
                                            this.gltrDetail.locId = this.lcExpensesHeader.locID;
                                            this.gltrDetailArr.push(this.gltrDetail);

                                            this.gltrDetail = new CreateOrEditGLTRDetailDto();
                                            this.gltrDetail.accountID = this.lcExpensesHeader.payableAccID;
                                            this.gltrDetail.subAccID = this.lcExpensesHeader.payableSL;
                                            this.gltrDetail.amount = this.JvAmt;
                                            this.gltrDetail.chequeNo = this.voucherEntry.gltrHeader.chNumber;
                                            this.gltrDetail.isAuto = false;
                                            this.gltrDetail.locId = this.lcExpensesHeader.locID;
                                            this.gltrDetailArr.push(this.gltrDetail);

                                            this.voucherEntry.gltrDetail.unshift(
                                                ...this.gltrDetailArr
                                            );
                                            //  }

                                            if (!this.voucherEntry.gltrHeader.id) {
                                                this.gltrHeader.createdOn = moment();
                                                this.gltrHeader.createdBy = this.appSession.user.userName;
                                            }

                                            this._service
                                                .ProcessVoucherEntry(this.voucherEntry)
                                                .pipe(
                                                    finalize(() => {
                                                        this.saving = false;
                                                    })
                                                )
                                                .subscribe(res => {
                                                    this.notify.info(this.l("SavedSuccessfully"));
                                                    debugger
                                                    this.lcExpensesHeader.lcExpensesDetail.forEach(element => {
                                                        debugger
                                                        if (element.id == this.GrowNo) {
                                                            element.linkID = res["result"][0]["id"];
                                                        }
                                                    });
                                                    // this.lcExpensesHeader.linkDetID =
                                                    //     res["result"][0]["id"];
                                                    // this.lcExpensesHeader.posted = true;
                                                    // debugger;
                                                    this._lcExpensesHeaderService
                                                        .createOrEditLCExpensesHeader(
                                                            this.lcExpensesHeader
                                                        )
                                                        .pipe(
                                                            finalize(() => {
                                                                this.saving = false;
                                                            })
                                                        )
                                                        .subscribe(() => {
                                                            debugger
                                                            this.gridApi.forEachNode(element => {
                                                                debugger
                                                                if (element.data.id == this.GrowNo) {
                                                                    element.data.ColProcess = "Posted";
                                                                }
                                                            });
                                                            this.gridApi.refreshCells();
                                                            this.notify.info(
                                                                this.l("SavedSuccessfully")
                                                            );
                                                            this.processing = false;

                                                            //this.close();
                                                            //this.modalSave.emit(null);
                                                        });
                                                });
                                        });
                                }
                            });
                        }
                    });
            } else {
                if (this.linkid) {
                    this.message.info("Document Already Posted!!");
                } else {

                    this.message.info("Please Save Document !");
                }
            }

        } else {
            this.message.info("Please Enter Expense and Amount!");
        }


    }


    show(flag: boolean | undefined, lcExpensesHeaderId?: number): void {
        debugger;
        this.totalAmount = 0;

        if (!flag) {
            debugger;
            this.lcExpensesHeader = new CreateOrEditLCExpensesHeaderDto();
            this.lcExpensesHeader.id = lcExpensesHeaderId;
            this._lcExpensesHeaderService.getMaxDocNo().subscribe(result => {
                this.lcExpensesHeader.docNo = result;
            });
            this.docDate = new Date();
            // this.shipDate=new Date();
            this.lcExpensesHeader.flag = flag;
            this.rowData = [];
            this.active = true;
            this.modal.show();
        } else {
            this._lcExpensesHeaderService
                .getLCExpensesHeaderForEdit(lcExpensesHeaderId)
                .subscribe(result => {
                    debugger;
                    this.lcExpensesHeader = result.lcExpensesHeader;
                    if (this.lcExpensesHeader.locID) {
                        this._lcExpensesHeaderService
                            .getLocationName(this.lcExpensesHeader.locID)
                            .subscribe(result => {
                                this.locDesc = result;
                            });
                    }
                    if (this.lcExpensesHeader.payableAccID) {
                        this._lcExpensesHeaderService
                            .getPayableAccName(
                                this.lcExpensesHeader.payableAccID
                            )
                            .subscribe(result => {
                                this.payableAccDesc = result;
                            });
                    }
                    //console.log(result.lcExpensesHeader.lcExpensesDetail);
                    this.docDate = moment(
                        this.lcExpensesHeader.docDate
                    ).toDate();
                    this.shipDate = this.lcExpensesHeader.shipDate != null ? moment(
                        this.lcExpensesHeader.shipDate
                    ).toDate() : new Date();
                    this.rowData = result.lcExpensesHeader.lcExpensesDetail;
                    debugger
                    this.allPost = true;
                    this.rowData.forEach(element => {
                        debugger
                        this.totalAmount += element.amount;
                        debugger
                        element.ColProcess = element.linkID > 0 ? "Posted" : "Post";
                        if (element.linkID == null || element.linkID < 0) {
                            this.allPost = false;
                        }

                    });
                    this.lcExpensesHeader.flag = flag;
                    this.isUpdate = flag;
                    this.active = true;
                    this.modal.show();
                });
        }
    }
    //==================================Grid=================================
    private gridApi;
    private gridColumnApi;
    private rowData;
    private rowSelection;
    columnDefs = [
        {
            headerName: this.l("SrNo"),
            field: "srNo",
            sortable: true,
            width: 20,
            valueGetter: "node.rowIndex+1"
        },
        {
            headerName: this.l(''),
            field: 'addExpense',
            filter: true,
            width: 20,
            editable: false,
            resizable: false,
            cellRenderer: this.addIconCellRendererFunc
        },
        {
            headerName: this.l("LCExpenses"),
            field: "expDesc",
            sortable: true,
            width: 120,
            editable: false,
            resizable: true
        },
        {
            headerName: this.l("Amount"),
            field: "amount",
            width: 80,
            type: "numericColumn",
            editable: true,
            resizable: true,
            valueFormatter: this.agGridExtend.formatNumber
        }, {
            headerName: this.l('Status'),
            field: 'ColProcess',
            filter: true,
            width: 30,
            editable: false,
            resizable: false,
            // cellRenderer: this.addBtnCellRendererFunc
        }, {
            headerName: this.l(''),
            field: 'linkId',
            filter: false,
            visible: false,
            width: 20

        }
    ];
    addIconCellRendererFunc(params) {
        debugger;
        return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
    }
    addBtnCellRendererFunc(params) {
        debugger;
        return '<i class="fa fa-process" >Post</i>';
    }
    onGridReady(params) {
        debugger;
        this.rowData = [];
        if (this.isUpdate) {
            this.rowData = this.lcExpensesHeader.lcExpensesDetail;
        }
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
        this.rowSelection = "multiple";
    }

    onAddRow(): void {
        debugger;
        var index = this.gridApi.getDisplayedRowCount();
        var newItem = this.createNewRowData();
        this.gridApi.updateRowData({ add: [newItem] });
        this.gridApi.refreshCells();
        //this.onBtStartEditing(index, "addEmployeeId");
    }

    onCellClicked(params) {
        switch (params.column["colId"]) {
            case "addExpense":
                debugger
                this.setParms = params;
                this.openSelectItemModal(params.data.transId);
                break;
            case "ColProcess":
                debugger
                this.JvAmt = params.data.amount;
                this.DisplayExp = params.data.expDesc;
                this.linkid = params.data.linkID;
                this.GrowNo = params.data.id;
                if (params.data.ColProcess != "") {
                    this.approve();
                } else {
                    this.message.info("First Save Document", "Save Document");
                }

        }
    }


    openSelectItemModal(data: any) {
        debugger;
        this.target = "LcExpence";
        this.inventoryLookupTableModal.displayName = this.setParms.data.expDesc;
        this.inventoryLookupTableModal.show(this.target, data);
    }
    getNewInventoryModal() {
        var ConStatus = false;
        this.gridApi.forEachNode(node => {
            debugger
            if (node.data.expDesc != '' && node.data.expDesc != null) {
                // if(node.data.expDesc==this.inventoryLookupTableModal.displayName){
                //     this.message.warn("This Expense Has Already Exist At Row No "+ Number(node.rowIndex+1),"Expense Duplicate!");
                //     ConStatus=true;
                //     return;
                // }
            }
        });

        if (ConStatus == false) {
            this.getNewItemId();
        }

    }
    getNewItemId() {
        debugger;
        this.setParms.data.expDesc = this.inventoryLookupTableModal.displayName;
        this.gridApi.refreshCells();
    }
    // addIconCellRendererFunc(params) {
    //     debugger;
    //     return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
    // }

    // onBtStartEditing(index, col) {
    //     debugger;
    //     this.gridApi.setFocusedCell(index, col);
    //     this.gridApi.startEditingCell({
    //         rowIndex: index,
    //         colKey: col
    //     });
    // }

    onRemoveSelected() {
        debugger;
        var selectedData = this.gridApi.getSelectedRows();
        var linkid = JSON.parse(JSON.stringify(selectedData[0]));
        var id = linkid.linkID;
        if (id != null && id != undefined && id != 0) {
            this.message.info("You Can't Removed!.", " JV has created!");
        } else {
            this.gridApi.updateRowData({ remove: selectedData });
            this.gridApi.refreshCells();
        }

    }

    createNewRowData() {
        debugger;
        var newData = {
            expenseDesc: "",
            amount: 0,
            ColProcess: ""

        };
        return newData;
    }

    onCellValueChanged(params) {
        debugger;
        this.calculations();
        this.gridApi.refreshCells();
    }
    onCellEditingStarted(params) {
        debugger;
    }

    //==================================Grid=================================

    save(): void {
        this.message.confirm("Save LC Expenses", isConfirmed => {
            if (isConfirmed) {
                debugger;
                var count = this.gridApi.getDisplayedRowCount();

                if (count == 0) {
                    this.notify.error(this.l("Please Enter Grid Data"));
                    return;
                }

                // this.gridApi.forEachNode(node => {
                //     if (node.data.beginAcc == "" || node.data.endAcc == "") {
                //         this.notify.error(this.l('Please Enter From and To Details'));
                //         this.check = true;
                //     }
                //     else {
                //         this.check = false;
                //     }
                // });
                // if (this.check) {
                //     return;
                // }


                this.amountCount = 0;
                this.gridApi.forEachNode(node => {
                    if (node.data.amount == 0 || node.data.amount == null) {
                        this.amountCount += 1;
                    }
                });

                if (this.amountCount == this.gridApi.getDisplayedRowCount()) {
                    this.notify.error(this.l("Please Enter Amount in at Least One Row of Grid"));
                    return;
                }

                this.saving = true;

                var rowData = [];
                this.gridApi.forEachNode(node => {
                    if (node.data.amount != 0 && node.data.amount != null) {
                        rowData.push(node.data);
                    }
                });

                this.lcExpensesHeader.audtDate = moment();
                this.lcExpensesHeader.audtUser = this.appSession.user.userName;

                this.lcExpensesHeader.docDate = moment(this.docDate);
                this.lcExpensesHeader.shipDate = moment(this.shipDate);

                if (!this.lcExpensesHeader.id) {
                    this.lcExpensesHeader.createDate = moment();
                    this.lcExpensesHeader.createdBy = this.appSession.user.userName;
                }
                this.lcExpensesHeader.lcExpensesDetail = rowData;



                this.lcExpensesHeader.lcExpensesDetail.forEach(element => {
                    debugger;
                    element.locID = this.lcExpensesHeader.locID;
                    element.docNo = this.lcExpensesHeader.docNo;
                });


                debugger;
                this._lcExpensesHeaderService
                    .createOrEditLCExpensesHeader(this.lcExpensesHeader)
                    .pipe(
                        finalize(() => {
                            this.saving = false;
                        })
                    )
                    .subscribe(() => {
                        debugger
                        this.notify.info(this.l("SavedSuccessfully"));
                        this.processing = false;
                        this.close();
                        this.modalSave.emit(null);
                    });
            }
        });
    }
    calculations() {
        var amount = 0;
        //this.lcExpensesHeader.expDetail = "";
        this.gridApi.forEachNode(node => {
            // if(this.lcExpensesHeader.expDetail != "")
            // {
            //      this.lcExpensesHeader.expDetail += " , "
            // }
            //this.lcExpensesHeader.expDetail += node.data.expDesc+" : ";
            if (node.data.amount != "" && node.data.amount != null) {
                amount += parseFloat(node.data.amount);
                //this.lcExpensesHeader.expDetail += node.data.amount;
            }
        });
        this.totalAmount = amount;
    }
    processLCExpenses(): void {
        debugger;
        this._lcExpensesDetailService.getLCExpenses().subscribe(result => {
            debugger;
            this.rowData = result.items;
        });
        this.totalAmount = 0;
    }
    postLCExpense(id: number, flag: boolean) {
        debugger;
        this._voucherEntryServiceProxy.postLCExpense(id, flag).subscribe((result) => {
            //data = result["result"];
            debugger
            this.notify.info(this.l("Complete Successfully!"));
            //this.processing = false;
            this.close();
            this.modalSave.emit(null);
        });
    }
    // processLCExpensesHD():void{
    //     debugger;
    //     this.processing = true;

    //     this._lcExpensesDetailService.processLCExpensesHD(this.lcExpensesHeader.userID, this.lcExpensesHeader.id).subscribe(result => {
    //         debugger
    //         if (result == "done") {
    //             this.processing = false;
    //             this.notify.info(this.l('Processed Successfully'));
    //         } else {
    //             this.processing = false;
    //             this.notify.error(this.l('Process Failed'));
    //         }
    //     });
    // }
    getNewFinanceModal() {
        debugger;
        switch (this.target) {
            case "GLLocation":
                this.getNewLocation();
                break;
            case "ChartOfAccount":
                this.getNewAccountID();
                break;
            case "SubLedger":
                this.getNewLCSub();
                break;
            case "PayableAcc":
                this.getNewPayableAcc();
                break;
            case "PayableSubLedger":
                this.getNewPayableSL();
                break;
            // case "LCPIH":
            //    this.getPidoc();
            // break;
            default:
                break;
        }
    }
    // getPidoc(){
    //     this.lcExpensesHeader.pIDocNo = Number(this.FinanceLookupTableModal.id);
    // }
    //---------------------Location-------------------------//
    openLocationModal() {
        this.target = "GLLocation";
        this.FinanceLookupTableModal.id = String(this.lcExpensesHeader);
        this.FinanceLookupTableModal.displayName = this.locDesc;
        this.FinanceLookupTableModal.show(this.target);
    }
    openbankModal() {
        this.target = "Bank";
        debugger
        this.commonserviceLookuptable.id = String(this.lcExpensesHeader.bankId);
        this.commonserviceLookuptable.displayName = this.bankDesc;
        this.commonserviceLookuptable.show(this.target);
    }
    openPIModal() {
        this.target = "LCPIH";
        debugger
        this.FinanceLookupTableModal.show(this.target, "true");
    }
    opencurrencyModal() {
        this.target = "Currency";
        debugger
        this.commonserviceLookuptable.id = String(this.lcExpensesHeader.bankId);
        this.commonserviceLookuptable.displayName = this.bankDesc;
        this.commonserviceLookuptable.show(this.target);
    }
    setbankNull() {
        this.lcExpensesHeader.bankId = null;
        this.bankDesc = "";
    }
    setcurrencyNull() {
        this.lcExpensesHeader.curId = null;

    }
    // setPINull() {
    //     this.lcExpensesHeader.pIDocNo = null;

    // }
    setLocationNull() {
        this.lcExpensesHeader.locID = null;
        this.locDesc = "";
    }
    getNewBank() {
        debugger;
        if (this.target == "Bank") {
            this.lcExpensesHeader.bankId = this.commonserviceLookuptable.id;
            this.bankDesc = this.commonserviceLookuptable.displayName;
        }
        if (this.target == "Currency") {
            this.lcExpensesHeader.curId = this.commonserviceLookuptable.id;
        }


    }
    getNewLocation() {
        debugger;
        if (this.target == "GLLocation") {
            this.lcExpensesHeader.locID = Number(this.FinanceLookupTableModal.id);
            this.locDesc = this.FinanceLookupTableModal.displayName;
        }

    }
    //------------------------------------------------------//
    //=====================Chart of Ac Model================
    openAccountIDModal() {
        debugger;
        this.target = "ChartOfAccount";
        this.FinanceLookupTableModal.id = this.lcExpensesHeader.accountID;
        this.FinanceLookupTableModal.show(this.target);
    }

    setAccountIDNull() {
        this.lcExpensesHeader.accountID = "";
        this.setLCSubNull();
    }

    getNewAccountID() {
        debugger;
        this.lcExpensesHeader.accountID = this.FinanceLookupTableModal.id;
    }
    //=====================Chart of Ac Model================//
    //=====================Sub Account Model================
    openLCSubModal() {
        debugger;
        var account = this.lcExpensesHeader.accountID;
        if (account == "" || account == null) {
            this.message.warn(
                this.l("Please select account first"),
                "Account Required"
            );
            return;
        }
        this.target = "SubLedger";
        this.FinanceLookupTableModal.id = String(
            this.lcExpensesHeader.subAccID
        );
        this.FinanceLookupTableModal.displayName = this.lcExpensesHeader.lcNumber;
        this.FinanceLookupTableModal.show(this.target, account);
    }

    setLCSubNull() {
        this.lcExpensesHeader.subAccID = null;
        this.lcExpensesHeader.lcNumber = "";
    }

    getNewLCSub() {
        this.lcExpensesHeader.subAccID = Number(
            this.FinanceLookupTableModal.id
        );
        this.lcExpensesHeader.lcNumber = this.FinanceLookupTableModal.displayName;
    }
    //=====================Sub Account Model================

    /////////////////////////////////////////////////////////Chart of Acc/////////////////////////////////////////////////////
    openPayableAccModal() {
        debugger;
        this.target = "PayableAcc";
        this.FinanceLookupTableModal.id = this.lcExpensesHeader.payableAccID;
        this.FinanceLookupTableModal.displayName = this.payableAccDesc;
        this.FinanceLookupTableModal.show("ChartOfAccount");
    }

    setPayableAccNull() {
        this.lcExpensesHeader.payableAccID = null;
        this.payableAccDesc = "";
    }

    getNewPayableAcc() {
        debugger;
        this.lcExpensesHeader.payableAccID = this.FinanceLookupTableModal.id;
        this.payableAccDesc = this.FinanceLookupTableModal.displayName;
    }
    ///////////////////////////////////////////////////////Chart of Acc/////////////////////////////////////////////////////
    //=====================Payable Sub Account Model================
    openPayableSLModal() {
        debugger;
        var account = this.lcExpensesHeader.payableAccID;
        if (account == "" || account == null) {
            this.message.warn(this.l("Please select account first"),"Account Required");
            return;
        }
        this.target = "PayableSubLedger";
        this.FinanceLookupTableModal.id = String(this.lcExpensesHeader.payableSL);
        this.FinanceLookupTableModal.displayName = this.lcExpensesHeader.payableSLName;
        this.FinanceLookupTableModal.show(this.target, account);
    }

    setPayableSLNull() {
        this.lcExpensesHeader.payableSL = null;
        this.lcExpensesHeader.payableSLName = "aaaa";
    }

    getNewPayableSL() {
        this.lcExpensesHeader.payableSL = Number(this.FinanceLookupTableModal.id);
        this.lcExpensesHeader.payableSLName = this.FinanceLookupTableModal.displayName;
    }
    //=====================Payable Sub Account Model================
    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

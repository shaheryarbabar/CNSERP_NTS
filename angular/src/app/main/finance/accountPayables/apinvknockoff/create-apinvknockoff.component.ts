import {
    Component,
    ViewChild,
    Injector,
    Output,
    EventEmitter,
    OnInit,
    ElementRef,
    AfterViewInit,
} from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { AppComponentBase } from "@shared/common/app-component-base";
import { Opt4LookupTableModalComponent } from "@app/main/supplyChain/inventory/FinderModals/opt4-lookup-table-modal.component";
import {
    APINVKNOCKDDto,
    APINVKNOCKHDto,
} from "../../shared/dto/apinvoiceknockh-dto";
import { apinvoiceKnockOffService } from "../../shared/services/apinvoiceknock.service";
import { throwIfEmpty } from "rxjs/operators";
import { InventoryLookupTableModalComponent } from "@app/finders/supplyChain/inventory/inventory-lookup-table-modal.component";
import { FinanceLookupTableModalComponent } from "@app/finders/finance/finance-lookup-table-modal.component";
import { GLTRHeadersServiceProxy } from "@shared/service-proxies/service-proxies";
import { Lightbox } from "ngx-lightbox";
import { AppConsts } from "@shared/AppConsts";
import { CommonServiceLookupTableModalComponent } from "@app/finders/commonService/commonService-lookup-table-modal.component";
import { TaxAuthoritiesComponent } from "@app/main/commonServices/taxAuthorities/taxAuthorities.component";
import { debug } from "console";
import { AgGridExtend } from "@app/shared/common/ag-grid-extend/ag-grid-extend";
import * as moment from "moment";
import { DirectInvoiceServiceProxy } from "../../shared/services/directinvoice.service";
import { runInThisContext } from "vm";
import { nodeName, param } from "jquery";
import { noUndefined } from "@angular/compiler/src/util";
import { ApprovalService } from "@app/main/supplyChain/periodics/shared/services/approval-service.";

@Component({
    selector: "app-create-apinvknockoff",
    templateUrl: "./create-apinvknockoff.component.html",
})
export class CreateApinvknockoffComponent
    extends AppComponentBase
    implements OnInit, AfterViewInit
{
    @ViewChild("inventoryLookupTableModal", { static: true })
    inventoryLookupTableModal: InventoryLookupTableModalComponent;
    @ViewChild("FinanceLookupTableModal", { static: true })
    FinanceLookupTableModal: FinanceLookupTableModalComponent;
    @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
    @ViewChild("commonServiceLookupTableModal", { static: true })
    commonServiceLookupTableModal: CommonServiceLookupTableModalComponent;
    @ViewChild("opt4LookupTableModal", { static: true })
    opt4LookupTableModal: Opt4LookupTableModalComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    totalItems: number;
    editMode: boolean = false;
    totalQty: number=0;
    advanceTotal: number=0;
    poAdvAmtTotal: number=0;
    remAmtTotal: number = 0;
    remAdv: number = 0;
    remGRN: number = 0;
    active = false;
    saving = false;
    customerName: string;
    isButtonVisible = false;
    PONumber: number=null;
    totalAdv: number = 0;
    grnTotalG: number=0;
    advTotalG: number=0;
    typeDesc: string;
    adjustTotal: number=0;
    grnAmtTotal: number = 0;
    chAccountIDDesc: string;
    chAccountIDDesc1: string;
    priceListChk: boolean = false;
    invoiceKnockOffH: APINVKNOCKHDto;
    invoiceKnockOffD: APINVKNOCKDDto;
    invoiceKnockOffD2: APINVKNOCKDDto;
    invoiceKnockOffDData: APINVKNOCKDDto[] = new Array<APINVKNOCKDDto>();
    agGridExtend: AgGridExtend = new AgGridExtend();
    tabMode: any;
    gridApi;
    private setParms;
    gridColumnApi;
    rowData;
    rowSelection;
    checkedval: boolean;
    paramsData;

    LocCheckVal: boolean;

    fgIndex: number = 0;
    rmIndex: number = 0;
    bpIndex: number = 0;
    type: string;
    editState: Boolean = false;

    appId = 11;
    appName = "OEQEntry";
    uploadedFiles = [];
    checkImage = true;
    image = [];
    target: string;
    locDesc: string;
    url: string;
    description: string;
    uploadUrl: string;

    columnDefs = [
        {
            headerName: this.l("GRN No"),
            editable: false,
            field: "gRNNo",
            sortable: true,
            width: 50,
            resizable: true,
        },
        {
            headerName: this.l("GRN Date"),
            editable: false,
            field: "gRNDate",
            sortable: true,
            width: 100,
            resizable: true,
        },
        {
            headerName: this.l("PO No"),
            editable: false,
            field: "poNo",
            sortable: true,
            width: 50,
            resizable: true,
        },
        {
            headerName: this.l("GRN Amount"),
            editable: false,
            field: "amount",
            sortable: true,
            width: 60,
            resizable: true,
            valueFormatter: this.agGridExtend.formatNumber,
        },
        {
            headerName: this.l("Adv Paid"),
            editable: false,
            field: "poAdvAmt",
            sortable: true,
            width: 60,
            resizable: true,
            valueFormatter: this.agGridExtend.formatNumber,
        },
        {
            headerName: this.l("Adv Adjusted"),
            editable: false,
            field: "advAdjusted",
            width: 80,
            resizable: true,
            valueFormatter: this.agGridExtend.formatNumber,
        },
        {
            headerName: this.l("GRN Adjusted"),
            editable: false,
            field: "grnAdjusted",
            width: 80,
            resizable: true,
            valueFormatter: this.agGridExtend.formatNumber,
        },
        {
            headerName: this.l("Adv Pending"),
            editable: false,
            field: "advPending",
            sortable: true,
            width: 80,
            resizable: true,
            valueFormatter: this.agGridExtend.formatNumber,
        },
        {
            headerName: this.l("GRN Pending"),
            editable: false,
            field: "grnPending",
            sortable: true,
            width: 80,
            resizable: true,
            valueFormatter: this.agGridExtend.formatNumber,
        },
        {
            headerName: this.l("Advance Adjust"),
            editable: true,
            field: "advadjust",
            sortable: true,
            width: 80,
            resizable: true,
            valueFormatter: this.agGridExtend.formatNumber,
        },
        {
            headerName: this.l("GRN Adjust"),
            editable: true,
            field: "grnadjust",
            sortable: true,
            width: 80,
            resizable: true,
            valueFormatter: this.agGridExtend.formatNumber,
        },
        {
            headerName: "Check",
            field: "isCheck",
            editable: false,
            width: 70,
            cellRenderer: (params) => {
                return `<input type='checkbox' ${
                    params.value ? "checked" : ""
                } />`;
            },
        },
    ];
    formValid: boolean = false;
    constructor(
        injector: Injector,
        private _invoiceKnockOffService: apinvoiceKnockOffService,
        private _lightbox: Lightbox,
        private _approvelService: ApprovalService,
        private _directInvoiceServiceProxy: DirectInvoiceServiceProxy // private _approvelService: ApprovalService, //  private _gltrHeadersServiceProxy: GLTRHeadersServiceProxy
    ) {
        super(injector);
        // this.gatePassDetailData.length = 0;
        // this.gatePassDetailDataTemp.length = 0;
    }
    ngOnInit(): void {
        this.rowData = [];
    }
    addIconCellRendererFunc(params) {
        debugger;
        return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
    }
    ngAfterViewInit() {}
    openSelectCustomerModal() {
        if (
            (this.invoiceKnockOffH.vendorCtrlAc == "" ||
                this.invoiceKnockOffH.vendorCtrlAc == null) &&
            (this.invoiceKnockOffH.liabilityCtrlAc == "" ||
                this.invoiceKnockOffH.liabilityCtrlAc == null)
        ) {
            this.message.warn(
                this.l("Please select Creditor & Liability Control a/c first"),
                "Account Required"
            );
            return;
        }
        this.target = "SubLedger";
        this.type = "SubLedger";
        this.FinanceLookupTableModal.id = String(
            this.invoiceKnockOffH.vendorID
        );
        this.FinanceLookupTableModal.displayName = this.customerName;
        this.FinanceLookupTableModal.show(
            this.target,
            this.invoiceKnockOffH.vendorCtrlAc
        );
    }
    setCustomerIDNull() {
        this.invoiceKnockOffH.vendorID = null;
        this.customerName = "";
    }
    openSelectChartofACModal(ac) {
        this.target = "ChartOfAccount";
        this.type = ac;
        debugger;
        this.FinanceLookupTableModal.id = this.invoiceKnockOffH.vendorCtrlAc;
        this.FinanceLookupTableModal.displayName = this.chAccountIDDesc;
        this.FinanceLookupTableModal.show(this.target, "", "Vendors");
    }
    getNewCommonServiceModal() {
        switch (this.target) {
            case "Bank":
            case "Cash":
                this.getNewBankId();
                break;
            case "Currency":
                this.getNewCurrencyRateId();
                break;
            default:
                break;
        }
    }

    //=====================Bank Model==================
    openSelectBankIdModal() {
        debugger;
        this.target = this.invoiceKnockOffH.paymentOption;
        this.commonServiceLookupTableModal.id = this.invoiceKnockOffH.bankID;
        this.commonServiceLookupTableModal.accountId =
            this.invoiceKnockOffH.bAccountID;
        this.commonServiceLookupTableModal.show(this.target,this.invoiceKnockOffH.paymentOption == "Bank" ? "1" : "CP");
    }

    setBankIdNull() {
        this.invoiceKnockOffH.bankID = "";
        this.invoiceKnockOffH.bAccountID = "";
    }

    getNewBankId() {
        debugger;
        this.invoiceKnockOffH.bankID = this.commonServiceLookupTableModal.id;
        this.invoiceKnockOffH.bAccountID =
            this.commonServiceLookupTableModal.accountId;
    }

    //=====================Currency Rate Model================
    openSelectCurrencyRateModal() {
        debugger;
        this.target = "Currency";
        this.commonServiceLookupTableModal.id = this.invoiceKnockOffH.curID;
        this.commonServiceLookupTableModal.currRate =
            this.invoiceKnockOffH.curRate;
        this.commonServiceLookupTableModal.show(this.target);
    }

    setCurrencyRateIdNull() {
        this.invoiceKnockOffH.curID = "";
        this.invoiceKnockOffH.curRate = null;
    }

    getNewCurrencyRateId() {
        debugger;
        this.invoiceKnockOffH.curID = this.commonServiceLookupTableModal.id;
        this.invoiceKnockOffH.curRate =
            this.commonServiceLookupTableModal.currRate;
    }
    //================Currency Rate Model===============

    openInstrumentNo() {
        if (
            this.invoiceKnockOffH.bAccountID != "" &&
            this.invoiceKnockOffH.bAccountID != null
        ) {
            this.target = "ChequeBookDetail";
            this.type = "ChequeBookDetail";
            this.FinanceLookupTableModal.id = "";
            this.FinanceLookupTableModal.displayName = "";
            this.FinanceLookupTableModal.show(
                "ChequeBookDetail",
                this.invoiceKnockOffH.bAccountID,
                "",
                " Instrument No"
            );
        } else {
            this.message.confirm("Please select account first");
        }
    }
    getChequeBookDetail() {
        debugger;
        this.invoiceKnockOffH.insNo = this.FinanceLookupTableModal.id;
    }

    GetPostedInvoices() {
        if (
            this.invoiceKnockOffH.vendorCtrlAc == "" ||
            this.invoiceKnockOffH.vendorCtrlAc == null ||
            this.invoiceKnockOffH.vendorID == 0 ||
            this.invoiceKnockOffH.vendorID == undefined
        ) {
            this.message.warn(
                this.l("Please select Creditor and Vendor First"),
                "Account Required"
            );
            return;
        }
        this._invoiceKnockOffService
            .GetPostedInvoices(
                this.invoiceKnockOffH.vendorCtrlAc,
                this.invoiceKnockOffH.vendorID
            )
            .subscribe((res) => {
                var result = res["result"];
                debugger;

                if (result.length > 0) {
                    this.addProcessRecordToGrid(res["result"]);
                } else {
                    this.message.warn("No Record Found.");
                }
            });
    }
    ///Approve And Unapprove
    // approveDoc(id: number,mode, approve) {
    //   debugger;
    //   this.message.confirm(
    //       '',
    //       (isConfirmed) => {
    //           if (isConfirmed) {
    //               this._approvelService.ApprovalData("SaleQuotation", [id], mode, approve)
    //                   .subscribe(() => {
    //                       if (approve == true) {
    //                           this.notify.success(this.l('SuccessfullyApproved'));
    //                           this.close();
    //                           this.modalSave.emit(null);
    //                       } else {
    //                           this.notify.success(this.l('SuccessfullyUnApproved'));
    //                           this.close();
    //                           this.modalSave.emit(null);
    //                       }
    //                   });
    //           }
    //       }
    //   );
    // }
    ///
    //=====================Transaction Type Model================
    show(id?: number): void {
        debugger;
        this.active = true;
        this.invoiceKnockOffH = new APINVKNOCKHDto();
        this.invoiceKnockOffDData = new Array<APINVKNOCKDDto>();

        this.invoiceKnockOffD = new APINVKNOCKDDto();
        this.invoiceKnockOffDData = new Array<APINVKNOCKDDto>();
        this.editMode = false;
        this.totalQty = 0;
        this.tabMode = 0;
        this.chAccountIDDesc1 = "";
        this.adjustTotal = 0;
        this.advanceTotal = 0;
        this.poAdvAmtTotal = 0;
        this.formValid = false;
        this.invoiceKnockOffH.paymentOption = "Bank";
        this.url = null;
        this.image = [];
        this.uploadedFiles = [];
        this.uploadUrl = null;
        this.checkImage = true;
        this.locDesc = undefined;
        this.chAccountIDDesc = undefined;
        this.customerName = undefined;
        this.typeDesc = undefined;
        if (!id) {
            this._invoiceKnockOffService.GetDocId().subscribe((res) => {
                debugger;
                this.invoiceKnockOffH.docNo = res["result"];
                this.invoiceKnockOffH.docDate = new Date();
                this.invoiceKnockOffH.postDate = new Date();
                this.isButtonVisible = false;
                //this.invoiceKnockOffH.mDocDate = new Date();
            });
        } else {
            this.editMode = true;
            this._invoiceKnockOffService
                .getDataForEdit(id)
                .subscribe((data: any) => {
                    
                    this.gridApi.refreshCells();
                    this.invoiceKnockOffH.id =
                        data["result"]["apinvknockh"]["id"];

                    this.invoiceKnockOffH = data["result"]["apinvknockh"];
                    this.locDesc = data["result"]["apinvknockh"]["locDesc"];
                    this.invoiceKnockOffH.gLLOCID =
                        data["result"]["apinvknockh"]["gllocid"];
                    this.chAccountIDDesc =
                        data["result"]["apinvknockh"]["vendorCtrlAcDesc"];
                    this.chAccountIDDesc1 =
                        data["result"]["apinvknockh"]["liabilityCtrlAcDesc"];
                    this.customerName =
                        data["result"]["apinvknockh"]["vendorDesc"];
                    // this.invoiceKnockOffH.totalAmount=data["result"]["apinvknockh"]["totalAmount"]
                    this.invoiceKnockOffH.docDate = new Date(
                        data["result"]["apinvknockh"]["docDate"]
                    );
                    this.invoiceKnockOffH.postDate = new Date(
                        data["result"]["apinvknockh"]["postDate"]
                    );
                    debugger
                    this.addRecordToGrid(
                        data["result"]["apinvknockh"][
                            "invoiceKnockOffDetailDto"
                        ]
                    );
                    debugger
                    this.isButtonVisible = this.invoiceKnockOffH.posted;
                    



                });
                
        }
        debugger
        this.modal.show();
        
    }

    getAdvPending(poNo, poAdvAmt){
        debugger
        var advAdjSum = 0;
        var pendAdv = 0;
        this.gridApi.forEachNode((node)=>{
            if(node.poNo == poNo){
                advAdjSum += node.advAdj
            }
            
        });
        pendAdv = poAdvAmt - advAdjSum;

        this.gridApi.forEachNode((node)=>{
            if(node.poNo == poNo){
                node.advPending = pendAdv
            }
        });
    }

    getGRNPending(poNo, poAdvAmt){
        debugger
        var GRNAdjSum = 0;
        var pendGRN = 0;
        this.gridApi.forEachNode((node)=>{
            if(node.poNo == poNo){
                GRNAdjSum += node.advAdj
            }
            
        });
        pendGRN = poAdvAmt - GRNAdjSum;

        this.gridApi.forEachNode((node)=>{
            if(node.poNo == poNo){
                node.advPending = pendGRN
            }
        });
    }
    close(): void {
        this.active = false;
        this.modal.hide();
        this._lightbox.close();
        this.grnAmtTotal=0;
        this.advanceTotal=0;
        this.remAmtTotal=0;
    }
    getIndex(transType) {
        if (transType == 7) return ++this.fgIndex;
        else if (transType == 9) return ++this.rmIndex;
        else if (transType == 8) return ++this.bpIndex;
    }

    addProcessRecordToGrid(record: any) {
        //this.editState = true;
        if (record != undefined) {
            var rData = [];
            record.forEach((val, index) => {
                debugger
                var newData;
                newData = {
                    gRNNo: val.grnNo,
                    gRNDate: val.grnDate,
                    amount: val.amount,
                    poAdvAmt: val.poAdvAmt,
                    grnAdjusted: val.grnAdjusted,
                    advAdjusted: val.advAdjusted,
                    advPending: val.advPending,
                    grnPending: val.grnPending,
                    poNo: val.poNo,
                    advadjust: 0,
                    grnadjust: 0,
                    isCheck: false,
                };
                rData.push(newData);

                this.grnAmtTotal += val.amount;
                val.advPending += val.poAdvAmt - val.advAdjusted;
                if (this.PONumber != val.poNo) {
                    this.poAdvAmtTotal += val.poAdvAmt;
                }
                this.PONumber = val.poNo;
                //this.gridApi.updateRowData({ add: [newData] });
            });
            debugger;
            this.remAmtTotal =
                this.invoiceKnockOffH.totalAmount - this.grnAmtTotal;
            this.rowData = [];
            this.rowData = rData;
            //this.editState = false;
        }
    }
    addRecordToGrid(record: any) {
        //this.editState = true;
        debugger
        if (
            record != undefined &&
            (this.invoiceKnockOffH.id != undefined ||
                this.invoiceKnockOffH.id > 0)
        ) {
            var rData = [];
            var grnamount = 0;
            var advamount = 0;
            var advamount1 = 0;
            var poAdvAmt = 0;
            var adjustTotal =0;
            var adjustTotal1 =0;
            var sumAdvAdj =0;
            var poNo =0;
            record.forEach((val, index) => {
                debugger
                if (val.grnAdjust != "") {
                    grnamount += parseFloat(val.grnAdjust);
                }
                if (val.advAdjust != "") {
                    advamount += parseFloat(val.advAdjust);
                }
                if (val.advAdjusted != "") {
                    if(val.advAdjusted == null || val.advAdjusted==undefined){
                        val.advAdjusted=0;
                    }
                    advamount1 += parseFloat(val.advAdjusted);
                }
                if (val.poAdvAmt != "") {
                    poAdvAmt += parseFloat(val.poAdvAmt);
                }
                if(val.grnAdjust !=null){
                    adjustTotal +=parseFloat(val.grnAdjust)
                }
                if(val.grnAdjust !=null){
                    adjustTotal1 +=parseFloat(val.grnAdjusted)
                }
                // if(this.editMode==true)
                // {
                //     val.advAdjusted = val.advAdjust;
                //     val.grnAdjusted = val.grnAdjust;
                //     val.advAdjust=0;
                //     val.grnAdjust=0;
                // }
                var newData;
                newData = {
                    
                    gRNNo: val.grnNo,
                    gRNDate: val.grnDate,
                    poNo: val.poNo,
                    amount: val.amount,
                    poAdvAmt: val.poAdvAmt,
                    grnAdjusted: val.grnAdjusted,
                    advAdjusted: val.advAdjusted,
                    advPending: val.advPending,
                    grnPending: val.grnPending,
                    advadjust: val.advAdjust,
                    grnadjust: val.grnAdjust,
                    isCheck: true,
                };
                debugger
                rData.push(newData);
                this.grnAmtTotal += val.amount;
                debugger
                if (this.PONumber != val.poNo) {
                    this.poAdvAmtTotal += val.poAdvAmt;
                }
                this.PONumber = val.poNo;
                //this.gridApi.updateRowData({ add: [newData] });
                
            });

            
            debugger

            // record.forEach((val, index) => {
            //     this.SetPO_PendingAmount(rData, val.poNo, val.poAdvAmt);
            //     //this.SetGRN_PendingAmount(rData, val.amount, val.grnAdjusted, val.advAdjusted);
            // });


            //this.adjustTotal = amount;
            this.adjustTotal = grnamount + adjustTotal1;
            //this.grnTotalG = this.adjustTotal;

            this.advanceTotal = advamount + advamount1;
            //this.advanceTotal = advamount ;
            this.advTotalG = this.advanceTotal ;
            if(poAdvAmt == null || poAdvAmt== undefined){
                poAdvAmt=0;
                this.poAdvAmtTotal = poAdvAmt;
            }
            
            //this.adjustTotal = adjustTotal + adjustTotal1;
            //this.remAmtTotal = this.grnAmtTotal - this.adjustTotal;
            this.remAdv = this.poAdvAmtTotal - this.advanceTotal;
            this.remGRN = this.grnAmtTotal - this.advanceTotal -this.adjustTotal ; 
            this.rowData = [];
            this.rowData = rData;
        }
    }

    

    // SetGRN_PendingAmount(rdata: any[], GRNAmount, GRNAdv,AdvAdjust)
    // {
    //     debugger

    //     rdata.forEach((val, index) => {
            
    //         val.grnPending = GRNAmount - GRNAdv - AdvAdjust ;
            
    //     });
    // } 


    
    // addOrUpdateRecordToDetailData(data: any, type: string) {
    //   debugger
    //   if (type == "record") {
    //   } else {
    //       var filteredData = this.SaleQutationDData.find(
    //           x => x.srNo == data.srNo
    //       );
    //       if (filteredData.srNo != undefined) {

    //           filteredData.itemID = data.itemID;
    //           filteredData.remarks = data.remarks;
    //           filteredData.conver = data.conver;
    //           filteredData.description = data.description;
    //           filteredData.unit = data.unit;
    //           filteredData.rate=data.rate;
    //           filteredData.amount=data.amount;
    //           filteredData.transType=data.transId;
    //           filteredData.transName=data.transType;
    //           filteredData.qty = data.qty;
    //           filteredData.taxAuth=data.taxAuth;
    //           filteredData.taxClass=data.taxClass,
    //           filteredData.taxClassDesc=data.taxClassDesc;
    //           filteredData.taxRate=data.taxRate,
    //           filteredData.netAmount=data.netAmount,
    //           filteredData.taxAmt=data.taxAmt

    //       }

    //   }

    //   //this.totalItems = this.SaleQutationDData.length;

    // }

    onGridReady(params) {
        this.rowData = [];
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
        this.rowSelection = "multiple";
    }

    onRowDoubleClicked(params) {
        this.type = "item";
        //this.ItemPricingLookupTableModal.show("GatePassItem");
        this.inventoryLookupTableModal.show("Items");
        this.paramsData = params;
    }

    //=====================Item Model================
    openSelectItemModal(data: any) {
        debugger;
        this.target = "ItemsQ";
        this.inventoryLookupTableModal.id = this.setParms.data.itemID;
        this.inventoryLookupTableModal.displayName =
            this.setParms.data.description;
        this.inventoryLookupTableModal.unit = this.setParms.data.unit;
        this.inventoryLookupTableModal.conver = this.setParms.data.conver;
        this.inventoryLookupTableModal.show(this.target, data);
    }
    openTransTypeModal() {
        debugger;
        this.target = "TransType";
        this.inventoryLookupTableModal.id = this.setParms.data.transId;
        this.inventoryLookupTableModal.displayName =
            this.setParms.data.transType;

        this.inventoryLookupTableModal.show(this.target);
    }

    setItemIdNull() {
        this.setParms.data.itemID = null;
        this.setParms.data.itemDesc = "";
        this.setParms.data.unit = "";
        this.setParms.data.conver = "";
    }

    getNewItemId() {
        debugger;
        this.setParms.data.itemID = this.inventoryLookupTableModal.id;
        this.setParms.data.description =
            this.inventoryLookupTableModal.displayName;
        this.setParms.data.unit = this.inventoryLookupTableModal.unit;
        this.setParms.data.conver = this.inventoryLookupTableModal.conver;
        // if (this.oesaleHeader.priceList != null && this.oesaleHeader.priceList != "") {
        //     this.getItemPriceRate(this.oesaleHeader.priceList, this.setParms.data.itemID);
        // }
        this.gridApi.refreshCells();
        //this.addOrUpdateRecordToDetailData(this.setParms.data, "");
        this.onBtStartEditing(this.setParms.rowIndex, "qty");
    }
    getOpt4() {
        debugger;
        this.setParms.data.transId = this.inventoryLookupTableModal.id;
        this.setParms.data.transName =
            this.inventoryLookupTableModal.displayName;
        this.gridApi.refreshCells();
        //this.addOrUpdateRecordToDetailData(this.setParms.data, "");
    }
    onBtStartEditing(index, col) {
        debugger;
        this.gridApi.setFocusedCell(index, col);
        this.gridApi.startEditingCell({
            rowIndex: index,
            colKey: col,
        });
    }

    //================Item Model===============

    getSum(PONumber) {
        let PoAdvSum: number = 0;
        this.gridApi.forEachNode((node) => {
            if (node.data.poNo == PONumber) {
                PoAdvSum = parseFloat(node.data.advadjust) + PoAdvSum;
            }
        });
        return PoAdvSum;
    }

    onCellValueChanged(params) {
        debugger;
        let adjustedSum : number =0;
        let POAdvAdjustment_Sum: number;
        this.PONumber = params.data.poNo;

        POAdvAdjustment_Sum = this.getSum(this.PONumber);
        debugger;
        if (params.data.amount < params.data.advadjust) {
            this.message.error(
                "Advance Adjust cannot be greater then GRN Amount"
            );
            params.data.advadjust = 0;
        }
        if(params.data.poAdvAmt !=null)
        {if (POAdvAdjustment_Sum > params.data.poAdvAmt) {
            this.message.error(
                "Advance Adjust cannot be greater then Advance paid"
            );
            params.data.advadjust = 0;
        }
        if(params.data.advadjust!=null && params.data.grnadjust !=null){
            adjustedSum= (parseFloat(params.data.advadjust) + parseFloat(params.data.grnadjust))
            if(params.data.grnPending < adjustedSum){
                this.message.error(
                    "Total of Advance-Adjust and GRN-Adjust cannot be greater then Pending-GRN"
                );
                params.data.grnadjust=0;
                params.data.advadjust=0;
            }
        }

        if(params.data.grnadjust > params.data.grnPending || params.data.grnadjust > this.invoiceKnockOffH.totalAmount ){
            this.message.error(
                "GRN-Adjust cannot be greater then Pending-GRN and Amount"
            );
            params.data.grnadjust=0;
        }
    
    }
        
        this.calculations();
        this.gridApi.refreshCells();
    }

 


    calculations() {
        debugger;
        var grnamount = 0;
        var grnamount1 = 0;
        var advamount = 0;
        var advamount1 = 0;
        var poAdAmt = 0;

        this.gridApi.forEachNode((node) => {
            debugger;
            if (node.data.grnadjust != "") {
                grnamount += parseFloat(node.data.grnadjust);
            }
            if (node.data.grnadjust != "") {
                grnamount1 += parseFloat(node.data.grnAdjusted);
            }
            if (node.data.advadjust != "") {
                advamount += parseFloat(node.data.advadjust);
            }
            if (node.data.advadjust != "") {
                advamount1 += parseFloat(node.data.advAdjusted);
            }
            if (node.data.podvAmt != "") {
                poAdAmt = parseFloat(node.data.poAdvAmt);
            }
        });
        if(this.editMode == true){
            this.adjustTotal = this.grnTotalG;
            this.advanceTotal = this.advTotalG;
            this.adjustTotal =  this.adjustTotal + grnamount;
            this.advanceTotal =  this.advanceTotal + advamount;

            this.remAmtTotal = this.invoiceKnockOffH.totalAmount- grnamount;
            this.remGRN = this.grnAmtTotal - this.advanceTotal - this.adjustTotal;
        }
        else{
            this.adjustTotal = grnamount + grnamount1;
        this.advanceTotal = advamount + advamount1;
        debugger;
        this.remAdv = this.poAdvAmtTotal - this.advanceTotal;
        this.remGRN = this.grnAmtTotal - this.adjustTotal;
        this.remAmtTotal = this.invoiceKnockOffH.totalAmount- grnamount;
        }
        
       
        
    }

    getNewInventoryModal() {
        debugger;
        switch (this.target) {
            case "ItemsQ":
                this.getNewItemId();
                break;
            case "loc":
                this.invoiceKnockOffH.gLLOCID =
                    Number(this.inventoryLookupTableModal.id) == 0
                        ? undefined
                        : Number(this.inventoryLookupTableModal.id);
                this.locDesc = this.inventoryLookupTableModal.displayName;
                break;
            default:
                break;
        }
    }

    //---------------------Location-------------------------//
    openLocationModal() {
        this.target = "GLLocation";
        this.type = "GLLocation";
        this.FinanceLookupTableModal.id = String(this.invoiceKnockOffH.gLLOCID);
        this.FinanceLookupTableModal.displayName = this.locDesc;
        this.FinanceLookupTableModal.show(this.target);
    }
    setLocationNull() {
        this.invoiceKnockOffH.gLLOCID = null;
        this.locDesc = "";
    }
    getNewLocation() {
        debugger;
        this.invoiceKnockOffH.gLLOCID = Number(this.FinanceLookupTableModal.id);
        this.locDesc = this.FinanceLookupTableModal.displayName;
    }

    getLookUpData() {
        debugger;
        if (this.type == "GLLocation") {
            this.getNewLocation();
        } else if (this.type == "item") {
            debugger;
            this.paramsData.data.itemID = this.inventoryLookupTableModal.id;
            this.paramsData.data.description =
                this.inventoryLookupTableModal.displayName;
            this.paramsData.data.unit = this.inventoryLookupTableModal.unit;
            this.paramsData.data.conver = this.inventoryLookupTableModal.conver;
            // this.paramsData.data.item = this.ItemPricingLookupTableModal.data.itemId;
            // this.paramsData.data.description = this.ItemPricingLookupTableModal.data.descp;
            // this.paramsData.data.unit = this.ItemPricingLookupTableModal.data.stockUnit;
            // this.paramsData.data.conver = this.ItemPricingLookupTableModal.data.conver;
            this.gridApi.refreshCells();
            //this.addOrUpdateRecordToDetailData(this.paramsData.data, "");
        } else if (this.type == "SubLedger") {
            this.getNewCustomer();
        } else if (this.type == "Creditor") {
            this.invoiceKnockOffH.vendorCtrlAc =
                this.FinanceLookupTableModal.id;
            this.chAccountIDDesc = this.FinanceLookupTableModal.displayName;
        } else if (this.type == "Liability") {
            this.invoiceKnockOffH.liabilityCtrlAc =
                this.FinanceLookupTableModal.id;
            this.chAccountIDDesc1 = this.FinanceLookupTableModal.displayName;
        } else if (this.type == "ChequeBookDetail") {
            this.getChequeBookDetail();
        }
    }
    setCAIdNull1() {
        this.invoiceKnockOffH.liabilityCtrlAc = null;
        this.chAccountIDDesc1 = "";
    }
    setCAIdNull() {
        this.invoiceKnockOffH.vendorCtrlAc = null;
        this.chAccountIDDesc = "";
    }
    getNewCustomer() {
        debugger;
        if (this.FinanceLookupTableModal.id != "null") {
            this.invoiceKnockOffH.vendorID = Number(
                this.FinanceLookupTableModal.id
            );
            this.customerName = this.FinanceLookupTableModal.displayName;

            this._directInvoiceServiceProxy
                .getClosingBalance(
                    this.invoiceKnockOffH.vendorCtrlAc,
                    this.invoiceKnockOffH.vendorID,
                    moment(new Date())
                )
                .subscribe((result) => {
                    debugger;

                    this.invoiceKnockOffH.closingBalance = Math.abs(result);
                });

            // if ( this.invoiceKnockOffH.vendorCtrlAc != "" && this.invoiceKnockOffH.vendorID != undefined) {

            //   var accountsid = this.invoiceKnockOffH.vendorCtrlAc + "$" + this.invoiceKnockOffH.liabilityCtrlAc + "$" + this.invoiceKnockOffH.vendorID;
            //   this._invoiceKnockOffService.isCheckCtrlAcc(accountsid).subscribe(c => {
            //     debugger
            //     if (c["result"] == true) {
            //       this._directInvoiceServiceProxy.getClosingBalance(this.invoiceKnockOffH.liabilityCtrlAc, this.invoiceKnockOffH.vendorID, moment(new Date())).subscribe(result => {
            //         debugger;

            //         this.invoiceKnockOffH.closingBalance = Math.abs(result);
            //       });
            //     } else {
            //       this.message.info("vendor ID did'nt Match in Both Ctrl Account!");
            //       this.invoiceKnockOffH.vendorID = undefined;
            //       this.customerName = "";
            //     }

            //   });

            // }
        }
    }

    changeOption(value) {
        this.invoiceKnockOffH.bankID = "";
        this.invoiceKnockOffH.bAccountID = "";
        this.invoiceKnockOffH.insNo = "";
        this.invoiceKnockOffH.insType = null;
    }
    processInv(target: string): void {
        debugger;
        this.message.confirm("Process " + target, (isConfirmed) => {
            if (isConfirmed) {
                this.saving = true;

                this._invoiceKnockOffService
                    .processInvoice(this.invoiceKnockOffH)
                    .subscribe((result) => {
                        debugger;
                        if (result["result"] == "Save") {
                            this.saving = false;
                            this.notify.info(this.l("ProcessSuccessfully"));
                            this.close();
                            this.modalSave.emit(null);
                        } else {
                            this.saving = false;
                            this.notify.error(this.l("ProcessFailed"));
                        }
                    });
            }
        });
    }

    SetPO_PendingAmount(rowData:any[], PONumber, POAdvanceAmount)
    {
        debugger

// Section 1 : Get Pending Amount
        var PoAdvAdjSum = 0;

        rowData.forEach((val, index) => {
            if (val.poNo == PONumber) {
                PoAdvAdjSum = parseFloat(val.advAdjusted) + PoAdvAdjSum;
            }
        });

        var PoPendingAmount = 0;
        PoPendingAmount = POAdvanceAmount - PoAdvAdjSum;
        
// Section 2 : Set Pending Amount

rowData.forEach((val, index) => {
            if (val.poNo == PONumber) {
                val.advPending = PoPendingAmount;
            }
debugger
                val.grnPending = val.amount - val.grnAdjusted - val.advAdjusted;
        });
       
    } 
    save() {
        this.message.confirm("Save", (isConfirmed) => {
            if (isConfirmed) {
                this.saving = true;
                debugger;
                // Validations
                if (this.invoiceKnockOffH.totalAmount != this.adjustTotal) {
                    this.message.warn(
                        "Adjusted amount should be equal to GRN Total"
                    );
                    this.saving = false;
                    
                }
                debugger;
                if (
                    this.invoiceKnockOffH.closingBalance == undefined ||
                    this.invoiceKnockOffH.closingBalance == 0
                ) {
                    this.message.warn("Closing Balance is Zero.");
                    this.saving = false;
                    return;
                }
                var no = 0;
                this.gridApi.forEachNode((node) => {
                    if (
                        node.data.isCheck == true &&
                        node.data.grnadjust != undefined
                    ) {
                        no++;
                    }
                });
                if (no == 0) {
                    this.message.warn(
                        "Please select row and Add Adjust Amount"
                    );
                    this.saving = false;
                    return;
                }

                var rowData = [];
                var grnamount=0;
                this.gridApi.forEachNode((node) => {
                   
                    if (
                        node.data.isCheck == true &&
                        node.data.grnadjust != undefined
                    ) {
                        rowData.push(node.data);
                    }
                    debugger;
                    if(this.editMode == false){
                        node.data.advAdjusted = node.data.advadjust;
                        node.data.grnAdjusted = node.data.grnadjust;
                        this.SetPO_PendingAmount(rowData, node.data.poNo, node.data.poAdvAmt );
                        
                        node.data.grnAdjust=0;
                        node.data.advAdjust=0;
                        

                    }
                    if (node.data.grnadjust != "") {
                        grnamount += parseFloat(node.data.grnadjust);
                    }
                   
                    
                });
                debugger
                if(grnamount != this.invoiceKnockOffH.totalAmount){
                    this.message.error("Total of GRN-Adjust Should be Equal to Amount");
                    this.saving = false;
                return;
                }
                
                this.invoiceKnockOffH.invoiceKnockOffDetailDto = rowData;
                debugger;
                this._invoiceKnockOffService
                    .create(this.invoiceKnockOffH)
                    .subscribe(() => {
                        this.saving = false;
                        this.notify.info(this.l("SavedSuccessfully"));
                        this.close();
                        this.modalSave.emit(null);
                    });
                this.close();
                this.tabMode = 7;
            }
        });
    }
    onCellClicked(params) {
        if (params.column["colId"] == "isCheck") {
            var isCheck = params.data.isCheck;
            if (isCheck == false) {
                params.data.isCheck = true;
            } else if (isCheck == true) {
                params.data.isCheck = false;
            }
        }
        //this.gridApi.refreshCells();
    }
    removeRecordFromGrid() {
        var selectedData = this.gridApi.getSelectedRows();
        this.gridApi.updateRowData({ remove: selectedData });
        this.gridApi.refreshCells();

        debugger;
        // var filteredDataIndex = this.invoiceKnockOffDData.findIndex(
        //     x => x.srNo == selectedData[0].srNo
        // );
        // this.invoiceKnockOffDData.splice(filteredDataIndex, 1);
        // this.gridApi.updateRowData({ remove: selectedData });
        //     this.gridApi.refreshCells();

        // this.totalItems = this.invoiceKnockOffDData.length;
        // //this.calculateTotalQty();
        // this.editState = false;
    }

    // dateChange(event: any) {
    //     this.assembly.docDate = event;
    // }

    openlookUpModal() {
        // if(this.LocCheckVal==true){
        this.target = "loc";
        this.type = "loc";
        this.inventoryLookupTableModal.show("Location");
        // }
    }

    cellEditingStarted(params) {
        //  this.formValid = false;
    }

    onUpload(event): void {
        this.checkImage = true;
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
    }
    //===========================File Attachment=============================
    open(): void {
        this._lightbox.open(this.image);
    }

    approveDoc(id: number,mode, approve) {
        debugger;
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._approvelService.ApprovalData("apinknock", [id], mode, approve)
                        .subscribe(() => {
                            if (approve == true) {
                                this.notify.success(this.l('SuccessfullyApproved'));
                                this.close();
                                this.modalSave.emit(null);
                            } else {
                                this.notify.success(this.l('SuccessfullyUnApproved'));
                                this.close();
                                this.modalSave.emit(null);
                            }
                        });
                }
            }
        );
    }
}

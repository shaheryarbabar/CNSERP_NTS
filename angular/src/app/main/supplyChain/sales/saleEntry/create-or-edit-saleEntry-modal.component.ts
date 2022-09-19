import { Component, ViewChild, Injector, Output, EventEmitter, ɵpublishDefaultGlobalUtils } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { FinanceLookupTableModalComponent } from '@app/finders/finance/finance-lookup-table-modal.component';
import { CommonServiceLookupTableModalComponent } from '@app/finders/commonService/commonService-lookup-table-modal.component';
import { InventoryLookupTableModalComponent } from '@app/finders/supplyChain/inventory/inventory-lookup-table-modal.component';
import { CreateOrEditOESALEHeaderDto } from '../shared/dtos/oesaleHeader-dto';
import { CreateOrEditOESALEDetailDto } from '../shared/dtos/oesaleDetails-dto';
import { SaleEntryDto } from '../shared/dtos/saleEntry-dto';
import { OESALEHeadersService } from '../shared/services/oesaleHeader.service';
import { OESALEDetailsService } from '../shared/services/oesaleDetail.service';
import { SaleEntryServiceProxy } from '../shared/services/saleEntry.service';
import { SalesLookupTableModalComponent } from '@app/finders/supplyChain/sales/sales-lookup-table-modal.component';
import { ConsumptionServiceProxy } from '@app/main/supplyChain/inventory/shared/services/consumption.service';
import { ApprovalService } from '../../periodics/shared/services/approval-service.';
import { LogComponent } from '@app/finders/log/log.component';
import { EditableColumn } from 'primeng/table';
import { param } from 'jquery';
import { saleQutationService } from '../shared/services/saleQutation.service';
import { CreateOrEditOETermsDto } from '../shared/dtos/salesTerm-dto';
@Component({
    selector: 'createOrEditSaleEntryModal',
    templateUrl: './create-or-edit-saleEntry-modal.component.html'
})
export class CreateOrEditSaleEntryModalComponent extends AppComponentBase {


    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('FinanceLookupTableModal', { static: true }) FinanceLookupTableModal: FinanceLookupTableModalComponent;
    @ViewChild('CommonServiceLookupTableModal', { static: true }) CommonServiceLookupTableModal: CommonServiceLookupTableModalComponent;
    @ViewChild('InventoryLookupTableModal', { static: true }) InventoryLookupTableModal: InventoryLookupTableModalComponent;
    @ViewChild('SalesLookupTableModal', { static: true }) SalesLookupTableModal: SalesLookupTableModalComponent;
    @ViewChild('LogTableModal', { static: true }) LogTableModal: LogComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    target: string ="";
    description = '';
    totalQty = 0;
    totalAmount = 0;
    netAmount = 0;
    totalItems = 0;
    venderTax = 0;
    private setParms;
    locations: any;
    LockDocDate: Date;
    typeDesc: string;
    locDesc: string;
    whTermDesc: string;
    taxAuthorityDesc: string;
    taxClassDesc: string;
    transType: number;
    transStatus:string;
    status = "Incomplete";
    ItemSearch:any;
    allterm:string;

    priceRate: string;
    testDto: CreateOrEditOETermsDto = new CreateOrEditOETermsDto();

    oesaleHeader: CreateOrEditOESALEHeaderDto = new CreateOrEditOESALEHeaderDto();
    oesaleDetail: CreateOrEditOESALEDetailDto = new CreateOrEditOESALEDetailDto();
    saleEntry: SaleEntryDto = new SaleEntryDto();

    auditTime: Date;
    docDate: Date;
    processing = false;
    customerName: string;
    errorFlag: boolean;
    IsVenderID: boolean;
    priceListDesc: string;
    refName: string;
    allcheckLoc: boolean;



    constructor(
        injector: Injector,
        private _oesaleHeadersServiceProxy: OESALEHeadersService,
        private _oesaleDetailServiceProxy: OESALEDetailsService,
        private _saleEntryServiceProxy: SaleEntryServiceProxy,
        private _consumptionServiceProxy :ConsumptionServiceProxy,
        private _SaleQutationService: saleQutationService,
        private _approvelService: ApprovalService
    ) {
        super(injector);
    }

    show(oesaleHeaderId?: number, maxId?: number): void {
        this.auditTime = null;
        debugger;

        if (!oesaleHeaderId) {
            this.oesaleHeader = new CreateOrEditOESALEHeaderDto();
            this.oesaleHeader.id = oesaleHeaderId;
            this.oesaleHeader.docDate = moment().endOf('day');
            this.oesaleHeader.paymentDate = moment().endOf('day');
            this.oesaleHeader.delvTerms=(0).toString();
            this.oesaleHeader.docNo = maxId;
            this.oesaleHeader.totalQty = 0;
            this.oesaleHeader.totAmt = 0;
            this.oesaleHeader.amount = 0;
            this.oesaleHeader.tax = 0;
            this.oesaleHeader.addTax = 0;
            this.oesaleHeader.disc = 0;
            this.oesaleHeader.tradeDisc = 0;
            this.oesaleHeader.freight = 0;
            this.oesaleHeader.margin = 0;
            this.totalItems = 0;

            this.active = true;
            this.modal.show();
        } else {
            this._oesaleHeadersServiceProxy.getOESALEHeaderForEdit(oesaleHeaderId).subscribe(result => {
                this.oesaleHeader = result;
                debugger;
                if (this.oesaleHeader.audtDate) {
                    this.auditTime = this.oesaleHeader.audtDate.toDate();
                }

                this.typeDesc = result.typeDesc;
                this.locDesc = result.locDesc;
                this.customerName = result.customerName;

                this.LockDocDate = this.oesaleHeader.docDate.toDate();

                this._oesaleDetailServiceProxy.getOESaleDData(oesaleHeaderId).subscribe(resultD => {
                    debugger;
                    var rData = [];
                    var qty = 0;
                    var amount = 0;
                    var items = 0;
                    var taxAmt = 0;
                    var disc = 0;
                    resultD["items"].forEach(element => {
                        rData.push(element);
                        qty += element.qty;
                        amount += element.amount;
                        taxAmt += element.taxAmt;
                        disc += element.disc;
                        items += items + 1;
                    });

                    this.rowData = [];
                    this.rowData = rData;

                    this.totalItems = items;
                    this.oesaleHeader.totalQty = qty;
                    this.oesaleHeader.amount = amount;
                    this.oesaleHeader.tax = taxAmt;
                    this.oesaleHeader.disc = disc;
                });

                this.active = true;
                this.modal.show();
            });
        }
    }
    SearchItem(event:any){
        debugger
        if(event.keyCode == 13){
          this.GetItemBySearch();
          event.preventDefault();
       }
    }

    GetItemBySearch(){
        debugger
        this._saleEntryServiceProxy.GetSearchItem(this.ItemSearch)
        .subscribe((res) => {
           debugger
           var existItem=false;
           this.gridApi.forEachNode(node=>{
               if(node.data.itemID==res["result"][0]["itemId"]){
                existItem=true;
                node.data.qty=node.data.qty+1;
               }
           })
           if(existItem==false){
            var newItem = this.createNewRowData();
            newItem.itemID=res["result"][0]["itemId"];
            newItem.itemDesc=res["result"][0]["descp"];
            newItem.qty=res["result"][0]["qty"];
            newItem.unit=res["result"][0]["stockUnit"].trim();
            newItem.conver=res["result"][0]["conver"];
            if(this.oesaleHeader.locID>0 && this.oesaleHeader.locID!=undefined){
                this._consumptionServiceProxy.GetQtyInHand(this.oesaleHeader.locID,newItem.itemID,new Date().toLocaleString()).subscribe(
                    res => {
                       debugger
                        newItem.inHand = res["result"]; 
                        // if (this.oesaleHeader.priceList != null && this.oesaleHeader.priceList != "") {
                        //     this._saleEntryServiceProxy.getItemPriceRate(this.oesaleHeader.priceList, newItem.itemID).subscribe(result => {
                        //         debugger;
                        //         newItem.rate = result.toString();
                        //         this.gridApi.updateRowData({ add: [newItem] });
                        //     });
                        // }else{
                        //     this.message.info("Please select Price List");
                        // }
                        this._saleEntryServiceProxy.getItemPriceRate(this.oesaleHeader.priceList, newItem.itemID).subscribe(result => {
                            debugger;
                            newItem.rate = result.toString();
                            this.gridApi.updateRowData({ add: [newItem] });
                        })
                    }
                )
            }else{
                this.message.info("Please select Location");
            }
           
           

            


           }
         
           this.gridApi.refreshCells();
         
        });
     
    }

    SetDefaultRecord(result: any) {
        console.log(result);
        debugger
        this.oesaleHeader.locID = result.currentLocID;
        this.locDesc = result.currentLocName;
        this.oesaleHeader.typeID = result.transType;
        this.typeDesc = result.transTypeName;
        this.allcheckLoc = result.allowLocID;
    }


    ngOnInit(): void {
        //this.rowData = [];
        this.getTermName("GetTermsList")
    }
 ////////////////////////////////////
    getTermName(target: string){
        this._SaleQutationService.getTerms(target).subscribe(result => {
          debugger
          this.allterm = result;
      });
      }
    setTermsNull(){
        this.oesaleHeader.delvTerms=null;
        this.allterm="";
    }
    //////////////////////////////////
    //==================================Grid=================================
    private gridApi;
    private gridColumnApi;
    private rowData;
    private rowSelection;
    columnDefs = [
        { headerName: this.l('ID'), field: 'id', sortable: true, width: 50, valueGetter: 'node.rowIndex+1' },
        { headerName: this.l('ItemId'), field: 'itemID', sortable: true, filter: true, width: 100, editable: false, resizable: true },
        { headerName: this.l(''), field: 'addItemId', width: 15, editable: false, cellRenderer: this.addIconCellRendererFunc, resizable: false },
        { headerName: this.l('Description'), field: 'itemDesc', sortable: true, filter: true, width: 200, resizable: true },
        { headerName: this.l('UOM'), field: 'unit', sortable: true, filter: true, width: 80, editable: false, resizable: true },
        // { headerName: this.l(''), field: 'addUOM', width: 15, editable: false, cellRenderer: this.addIconCellRendererFunc, resizable: false },
        { headerName: this.l('Conversion'), field: 'conver', sortable: true, filter: true, width: 100, resizable: true },
        { headerName: this.l('InHand'), field: 'inHand', editable: false, sortable: true, filter: true, width: 100, type: "numericColumn", resizable: true },
        // { headerName: this.l('ProcessInHand'), field: 'processInHand', editable: false, sortable: true, filter: true, width: 100, type: "numericColumn", resizable: true },
        { headerName: this.l('Qty'), field: 'qty', editable: true, sortable: true, filter: true, width: 100, type: "numericColumn", resizable: true },
        { headerName: this.l('Rate'), field: 'rate', editable: (params) => { return (this.oesaleHeader.priceList != "" && this.oesaleHeader.priceList != undefined) ? false : true }, sortable: true, filter: true, width: 100, type: "numericColumn", resizable: true },
        { headerName: this.l('Amount'), field: 'amount', sortable: true, width: 100, editable: false, type: "numericColumn", resizable: true },
        { headerName: this.l('Discount'), field: 'disc', sortable: true, width: 100, editable: true, type: "numericColumn", resizable: true },
        { headerName: this.l('TAXAUTH'), field: 'taxAuth', sortable: true, width: 100, editable: false, resizable: true },
        { headerName: this.l(''), field: 'addTaxAuth', width: 15, editable: false, cellRenderer: this.addIconCellRendererFunc, resizable: false },
        { headerName: this.l('ClassId'), field: 'taxClass', sortable: true, width: 100, editable: false, resizable: true },
        { headerName: this.l(''), field: 'addTaxClass', width: 15, editable: false, cellRenderer: this.addIconCellRendererFunc, resizable: false },
        { headerName: this.l('TaxClass'), field: 'taxClassDesc', sortable: true, width: 100, editable : false, resizable: true },
        { headerName: this.l('TaxRate'), field: 'taxRate', sortable: true, width: 100, editable: params=>params.data.transType == 4? true: false, resizable: true },
        { headerName: this.l('TaxAmt'), field: 'taxAmt', sortable: true, width: 100, editable: params=>params.data.transType == 4? true: false, resizable: true },
        { headerName: this.l('NetAmt'), field: 'netAmount', sortable: true, width: 100, editable: false, resizable: true },
        { headerName: this.l('Remarks'), field: 'remarks', editable: true, resizable: true,maxLength:10 },
        { headerName: this.l('TransactionType'), field: 'transType', editable: false, resizable: true,maxLength:8 }
    ];

    onGridReady(params) {
        debugger;
        this.rowData = [];
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
        this.calculations();
        this.gridApi.refreshCells();
        this.onBtStartEditing(index, "addItemId");
    }

    cellClicked(params) {
        debugger;
        switch (params.column["colId"]) {
            case "addItemId":
                this.setParms = params;
                this.openSelectItemModal();
                break;
            case "addUOM":
                this.setParms = params;
                this.openSelectICUOMModal();
                break;
            case "addTaxAuth":
                this.setParms = params;
                this.openSelectTaxAuthorityGridModal();
                break;
            case "addTaxClass":
                this.setParms = params;
                this.openSelectTaxClassGridModal();
                break;
            default:
                break;
        }
    }

    addIconCellRendererFunc(params) {
        debugger;
        return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
    }
 

    onBtStartEditing(index, col) {
        debugger;
        this.gridApi.setFocusedCell(index, col);
        this.gridApi.startEditingCell({
            rowIndex: index,
            colKey: col
        });
    }
//=====================Qutation Model================
openSelectQutationModal() {
    debugger;
    this.target = "Qutation";
    this.InventoryLookupTableModal.id = this.oesaleHeader.qutationDoc;
    this.InventoryLookupTableModal.show(this.target);
}

setQutationNull() {
    this.oesaleHeader.qutationDoc = "";
   
}

getNewQutation() {
    this.oesaleHeader.qutationDoc = this.InventoryLookupTableModal.id;
    
    this._saleEntryServiceProxy
    .getDataHeaderForWorkorder(this.oesaleHeader.qutationDoc).subscribe(result => {
       this.oesaleHeader.typeID=result["result"]["typeID"];
       this.oesaleHeader.custID=result["result"]["custID"];
       this.customerName=result["result"]["customerDesc"];
       this.typeDesc=result["result"]["saleTypeDesc"];
       this.oesaleHeader.basicStyle = result["result"]["basicStyle"];
       this.oesaleHeader.license = result["result"]["license"];
       this.oesaleHeader.narration = result["result"]["narration"];
       this.oesaleHeader.delvTerms = result["result"]["delvTerms"];
    });
 


    this._saleEntryServiceProxy
    .getDataForWorkorder(this.oesaleHeader.qutationDoc).subscribe(result => {
        var rData = [];
        var qty = 0;
        var totalAmount = 0;
        var amount = 0;
        var items = 0;
        debugger
        result["result"]["items"].forEach(element => {
            debugger
            rData.push(element);
            qty += element.qty;
            totalAmount += element.netAmount;
            amount += element.amount;
            items++;
        });

        this.rowData = [];
        this.rowData = rData;
        this.oesaleHeader.amount = amount;
        this.oesaleHeader.totalQty = qty;
        this.oesaleHeader.totAmt = totalAmount;
        this.totalItems = items;
    });
 
}
    onRemoveSelected() {
        debugger;
        var selectedData = this.gridApi.getSelectedRows();
        this.gridApi.updateRowData({ remove: selectedData });
        this.gridApi.refreshCells();
        this.calculations();
    }

    createNewRowData() {
        debugger;
        var newData = {
            itemID: "",
            itemDesc: "",
            unit: "",
            conver: "",
            inHand: '0',
            qty: '0',
            rate: '0',
            amount: '0',
            disc: '0',
            taxAuth: "",
            taxClass: "",
            taxRate: '0',
            taxAmt: '0',
            netAmount: '0',
            remarks: '',
            transType:0
        };
        return newData;
    }

    calculations() {
       
        var items = 0;
        var qty = 0;
        var amount = 0;
        var taxAmt = 0;
        var disc = 0;
        this.gridApi.forEachNode(node => {
            debugger;
            if ((node.data.amount != "" || node.data.qty != "") && node.data.itemID != "") {
                qty += parseFloat(node.data.qty);
                amount += parseFloat(node.data.amount);
            }
            items = items + 1;
            taxAmt += parseFloat(node.data.taxAmt);
            disc += parseFloat(node.data.disc);
        });
        this.totalItems = items;
        this.oesaleHeader.totalQty = qty;
        this.oesaleHeader.amount = amount;
        this.oesaleHeader.disc = disc;
        this.oesaleHeader.tax = taxAmt;
        this.oesaleHeader.totAmt = this.oesaleHeader.freight + this.oesaleHeader.margin + this.oesaleHeader.tax + this.oesaleHeader.addTax + this.oesaleHeader.amount - this.oesaleHeader.disc - this.oesaleHeader.tradeDisc;
    }

    calculatetotal() {
        debugger;
        this.oesaleHeader.totAmt = this.oesaleHeader.freight + this.oesaleHeader.margin + this.oesaleHeader.tax + this.oesaleHeader.addTax + this.oesaleHeader.amount - this.oesaleHeader.disc - this.oesaleHeader.tradeDisc;
    }

    onCellValueChanged(params) {


        if (params.data.qty != null && params.data.rate != null) {
            params.data.amount = (parseFloat(params.data.qty) * parseFloat(params.data.rate));
        }

        if(params.data.discPercentage!=null){
            params.data.disc = params.data.amount * params.data.discPercentage/100;
        }

        if (params.data.amount != null && params.data.disc != null) {
            params.data.grossAmount = parseFloat(params.data.amount) - parseFloat(params.data.disc);
        }

        if (params.data.taxRate != null  && params.data.taxAmt != null) {
            params.data.taxAmt = Math.round((parseFloat(params.data.grossAmount) * parseFloat(params.data.taxRate)) / 100);
            params.data.netAmount = parseFloat(params.data.grossAmount) + parseFloat(params.data.taxAmt) ;
        }

        // if (params.data.taxRate != null  && params.data.taxAmt != null) {
        //     params.data.taxAmt = Math.round((parseFloat(params.data.amount) * parseFloat(params.data.taxRate)) / 100);
        //     params.data.netAmount = parseFloat(params.data.amount) + parseFloat(params.data.taxAmt) ;
        // }

        // if (params.data.qty != null && params.data.rate != null) {
        //     params.data.amount = parseFloat(params.data.qty) * parseFloat(params.data.rate);
        // }
        // if (params.data.taxRate != null && params.data.disc != null && params.data.taxAmt != null) {
        //     params.data.taxAmt = Math.round((parseFloat(params.data.amount) * parseFloat(params.data.taxRate)) / 100);
        //     params.data.netAmount = parseFloat(params.data.amount) + parseFloat(params.data.taxAmt) - parseFloat(params.data.disc);
        // }
        if (params.data.remarks.length > 150) {
            this.message.warn("Remarks Length", "Enter Only 150 Character!");

            var id = params.rowIndex;
            var rowNode = this.gridApi.getRowNode(id);
            var newData = {
                itemID: params.data.itemID,
                itemDesc: params.data.itemDesc,
                unit: params.data.unit,
                conver: params.data.conver,
                inHand: params.data.inHand,
                qty: params.data.qty,
                rate: params.data.rate,
                amount: params.data.amount,
                discPercentage: params.data.discPercentage,
                disc: params.data.disc,
                grossAmount: params.data.grossAmount,
                taxAuth: params.data.taxAuth,
                taxClass: params.data.taxClass,
                taxRate: params.data.taxRate,
                taxAmt: params.data.taxAmt,
                netAmount: params.data.netAmount,
                remarks: params.data.remarks.substring(0, 150)
            };
            rowNode.setData(newData);
            return;
        }
        this.calculations();
        this.gridApi.refreshCells();
        this.CheckOnQtyInHand();
    }

    // onCellValueChanged(params) {
        
    //     var colname = params.column["colId"];

    //     if (params.data.qty != null && params.data.rate != null) {
    //         params.data.amount = parseFloat(params.data.qty) * parseFloat(params.data.rate);
    //     }
    //     debugger
    //     if (colname == "taxRate") {
    //         params.data.taxAmt = Math.round((parseFloat(params.data.amount) * parseFloat(params.data.taxRate)) / 100);
    //         params.data.netAmount = parseFloat(params.data.amount) + parseFloat(params.data.taxAmt) - parseFloat(params.data.disc);
    //     }
    //     debugger
    //     if (colname == "taxAmt") {
    //         params.data.taxRate = Math.round((parseFloat(params.data.taxAmt) * 100) / parseFloat(params.data.amount));
    //         params.data.netAmount = parseFloat(params.data.amount) + parseFloat(params.data.taxAmt) - parseFloat(params.data.disc);
    //     }

    //     // debugger
    //     // if (params.data.taxRate != null && params.data.disc != null && params.data.taxAmt != null) {
    //     //     params.data.taxAmt = Math.round((parseFloat(params.data.amount) * parseFloat(params.data.taxRate)) / 100);
    //     //     params.data.netAmount = parseFloat(params.data.amount) + parseFloat(params.data.taxAmt) - parseFloat(params.data.disc);
    //     // }
    //     // debugger
    //     // if ( params.data.taxRate == null || params.data.taxRate == 0 && params.data.disc !=null ) {
    //     //     params.data.taxRate = Math.round((parseFloat(params.data.taxAmt) * 100 ) / params.data.amount);
    //     //     params.data.taxAmt = Math.round((parseFloat(params.data.amount) * parseFloat(params.data.taxRate)) / 100);
    //     //     params.data.netAmount = parseFloat(params.data.amount) + parseFloat(params.data.taxAmt) - parseFloat(params.data.disc);
    //     // }
    //     if (params.data.remarks.length>150) {
    //         this.message.warn("Remarks Length", "Enter Only 150 Character!");
           
    //         var id=params.rowIndex;
    //         var rowNode = this.gridApi.getRowNode(id);
    //         var newData={
    //             itemID: params.data.itemID,
    //             itemDesc: params.data.itemDesc,
    //             unit: params.data.unit,
    //             conver: params.data.conver,
    //             inHand: params.data.inHand,
    //             qty: params.data.qty,
    //             rate: params.data.rate,
    //             amount: params.data.amount,
    //             disc: params.data.disc,
    //             taxAuth: params.data.taxAuth,
    //             taxClass: params.data.taxClass,
    //             taxRate: params.data.taxRate,
    //             taxAmt: params.data.taxAmt,
    //             netAmount: params.data.netAmount,
    //             remarks: params.data.remarks.substring(0,150),
    //             transType:params.data.transType
    //         };
    //         rowNode.setData(newData);
    //         return;
    //     }
    //     this.calculations();
    //     debugger
    //     this.gridApi.refreshCells();
    //     this.CheckOnQtyInHand();
    // }
    CheckOnQtyInHand() {

        this.gridApi.forEachNode(node => {
            debugger

            if (parseInt(node.data.qty) > parseInt(node.data.inHand)) {
                this.errorFlag=true;
                this.message.error("Qty Not Greater than Qty In Hand at Row No"+ Number(node.rowIndex+1),"Qty Greater");
                throw new Error();
            } else {
                this.errorFlag = false;

            }
        });
    }
   
    //==================================Grid=================================

    save(): void {
        debugger;
        if(!this.errorFlag){
        this.message.confirm(
            'Save Sale Entry',
            (isConfirmed) => {
                if (isConfirmed) {

                    // if(moment(this.oesaleHeader.docDate)>moment().endOf('day')){
                    //     this.message.warn("Document date greater than current date","Document Date Greater");
                    //     return;
                    // }

                    // if(moment(this.oesaleHeader.paymentDate)>moment().endOf('day')){ 
                    //     this.message.warn("Payment date greater than current date","Payment Date Greater"); 
                    //     return;
                    // } 

                    if ((moment(this.LockDocDate).month() + 1) != (moment(this.oesaleHeader.docDate).month() + 1) && this.oesaleHeader.id != null) {
                        this.message.warn('Document month not changeable', "Document Month Error");
                        return;
                    }

                    if (this.oesaleHeader.locID == null || this.oesaleHeader.locID == 0) {
                        this.message.warn("Please select location", "Location Required");
                        return;
                    }

                    if (this.gridApi.getDisplayedRowCount() <= 0) {
                        this.message.warn("No items details found", "Items Details Required");
                        return;
                    }

                    this.gridApi.forEachNode(node => {
                        debugger
                        if (node.data.itemID == "") {
                            this.message.warn("Item not found at row " + Number(node.rowIndex + 1), "Item Required");
                            this.errorFlag = true;
                            return;
                            // }else if(node.data.qty<=0){
                            //     this.message.warn("Qty not greater than zero at row "+ Number(node.rowIndex+1),"Qty Zero");
                            //     this.errorFlag=true;
                            //     return;
                        } else if (node.data.poQty != 0 && node.data.poQty < node.data.qty) {
                            this.message.warn("Qty not greater than POQty at row " + Number(node.rowIndex + 1), "Qty Greater");
                            this.errorFlag = true;
                            return;
                        } else {
                            this.errorFlag = false;
                        }
                    });

                    if (this.errorFlag) {
                        return;
                    }

                    if (this.oesaleHeader.totAmt <= 0 || this.oesaleHeader.totalQty <= 0) {
                        this.message.warn("Qty OR Amount not less than OR equal to zero", "Qty OR Amount Zero");
                        return;
                    }

                    this.saving = true;

                    var rowData = [];
                    this.gridApi.forEachNode(node => {
                        rowData.push(node.data);
                    });

                    if (moment(new Date()).format("A") === "AM" && !this.oesaleHeader.id && (moment(new Date()).month() + 1) == (moment(this.oesaleHeader.docDate).month() + 1)) {
                        this.oesaleHeader.docDate = moment(this.oesaleHeader.docDate);
                    } else {
                        this.oesaleHeader.docDate = moment(this.oesaleHeader.docDate).endOf('day');
                    }

                    this.oesaleHeader.active = true;

                    this.saleEntry.oesaleDetail = rowData;
                    this.saleEntry.oesaleHeader = this.oesaleHeader;

                    this._saleEntryServiceProxy.createOrEditSaleEntry(this.saleEntry)
                        .pipe(finalize(() => { this.saving = false; }))
                        .subscribe(() => {
                            this.notify.info(this.l('SavedSuccessfully'));
                            this.close();
                            this.modalSave.emit(null);
                        });

                }
            }
        );

    }else{
        this.message.warn("Qty not greater than Qty in Hand ","Qty Greater");
     }
    }

    processSaleEntry(): void {
        debugger;
        this.message.confirm(
            'Process Sale Entry',
            (isConfirmed) => {
                if (isConfirmed) {
                    this.processing = true;
                    debugger;

                    if (moment(new Date()).format("A") === "AM" && !this.oesaleHeader.id && (moment(new Date()).month() + 1) == (moment(this.oesaleHeader.docDate).month() + 1)) {
                        this.oesaleHeader.docDate = moment(this.oesaleHeader.docDate);
                    } else {
                        this.oesaleHeader.docDate = moment(this.oesaleHeader.docDate).endOf('day');
                    }

                    this._saleEntryServiceProxy.processSaleEntry(this.oesaleHeader).subscribe(result => {
                        debugger
                        if (result == "Save") {
                            this.saving = false;
                            this.notify.info(this.l('ProcessSuccessfully'));
                            this.close();
                            this.modalSave.emit(null);
                        } else if (result == "NoAccount") {
                            this.message.warn("Account not found", "Account Required");
                            this.processing = false;
                        } else {
                            this.message.error("Input not valid", "Verify Input");
                            this.processing = false;
                        }
                    });
                }
            }
        );
    }

    getNewFinanceModal() {
        debugger;
        switch (this.target) {
            case "Customer":
                this.getNewCustomer();
                break;
            default:
                break;
        }
    }
    getNewCommonServiceModal() {
        debugger
        switch (this.target) {
            case "TaxAuthorityGrid":
                this.getNewTaxAuthorityGrid();
                break;
            case "TaxClassGrid":
                this.getNewTaxClassGrid();
                break;
            default:
                break;
        }
    }

    getNewInventoryModal() {
        switch (this.target) {
            case "Items":
                this.getNewItemId();
                break;
            case "UOM":
                this.getNewICUOM();
                break;
            case "Location":
                this.getNewLocation();
                break;
            case "TransactionType":
                this.getNewTransaction();
                break;
            case "PriceList":
                this.getNewPriceList();
                break;
            case "Qutation":
                this.getNewQutation();
                break;
            default:
                break;
        }
    }

    getNewSalesModal() {
        debugger;
        this.getNewReference();
    }

    //=====================Tax Authority Grid Model================
    openSelectTaxAuthorityGridModal() {
        debugger;
        this.target = "TaxAuthority";
        this.CommonServiceLookupTableModal.id = this.setParms.data.taxAuth;
        this.CommonServiceLookupTableModal.show(this.target);
        this.target = "TaxAuthorityGrid";
    }

    setTaxAuthorityIdGridNull() {
        debugger;
        this.setParms.data.taxAuth = '';
        this.setTaxClassIdGridNull();
    }

    getNewTaxAuthorityGrid() {
        debugger;
        if (this.CommonServiceLookupTableModal.id != this.setParms.data.taxAuth)
            this.setTaxClassIdGridNull();
        this.setParms.data.taxAuth = this.CommonServiceLookupTableModal.id;
        this.gridApi.refreshCells();
        this.onBtStartEditing(this.setParms.rowIndex, "addTaxClass");
    }
    //=====================Tax Authority Grid Model================

    //=====================Tax Class Grid================
    openSelectTaxClassGridModal() {
        debugger
        if (this.setParms.data.taxAuth == "" || this.setParms.data.taxAuth == null) {
            this.message.warn(this.l('Please select Tax authority first at row ' + Number(this.setParms.rowIndex + 1)), 'Tax Authority Required');
            return;
        }
        
        debugger
        this.target = "TaxClass";
        this.CommonServiceLookupTableModal.id = String(this.setParms.data.taxClass);
        this.CommonServiceLookupTableModal.displayName = this.setParms.data.taxClassDesc;
        this.CommonServiceLookupTableModal.transType = this.setParms.data.transType;
        this.CommonServiceLookupTableModal.taxRate = this.setParms.data.taxRate;
       
        this.CommonServiceLookupTableModal.show(this.target, this.setParms.data.taxAuth);
        this.target = "TaxClassGrid";
    }
    getNewTaxClassGrid() {
        debugger;
        
        this.target = "TaxClass";
        this.transType = this.CommonServiceLookupTableModal.transType ;
        this.setParms.data.taxClass = Number(this.CommonServiceLookupTableModal.id);
        this.setParms.data.taxClassDesc = this.CommonServiceLookupTableModal.displayName;
        this.setParms.data.transType = this.CommonServiceLookupTableModal.transType;
        this.setParms.data.taxRate = this.CommonServiceLookupTableModal.taxRate;
        this.onBtStartEditing(this.setParms.rowIndex, "remarks");
        this.onCellValueChanged(this.setParms);
    }
    setTaxClassIdGridNull() {
        this.setParms.data.taxClass = '';
        this.setParms.data.taxClassDesc = '';
        this.setParms.data.taxRate = 0;
        this.setParms.data.transType=0;
    }
    //=====================Tax Class Grid================

    //=====================Item Model================
    openSelectItemModal() {
        debugger;
        this.target = "Items";
        this.InventoryLookupTableModal.id = this.setParms.data.itemID;
        this.InventoryLookupTableModal.displayName = this.setParms.data.itemDesc;
        this.InventoryLookupTableModal.unit = this.setParms.data.unit;
        this.InventoryLookupTableModal.conver = this.setParms.data.conver;
        this.InventoryLookupTableModal.show(this.target);
    }


    setItemIdNull() {
        this.setParms.data.itemID = null;
        this.setParms.data.itemDesc = '';
        this.setParms.data.unit = '';
        this.setParms.data.conver = '';
    }

    OpenLog(){
        debugger
       this.LogTableModal.show(this.oesaleHeader.docNo,'SaleEntry');
    }

    getNewItemId() {
        debugger;
       
        var ConStatus = false;
        this.gridApi.forEachNode(node => {
            debugger
            if (node.data.itemID != '' && node.data.itemID != null) {
                if (node.data.itemID == this.InventoryLookupTableModal.id) {
                    this.message.warn("Item Has Already Exist At Row No " + Number(node.rowIndex + 1), "Item Duplicate!");
                    ConStatus = true;
                    return;
                }
            }
        });
        if (ConStatus == false) {
        this.setParms.data.itemID = this.InventoryLookupTableModal.id;
        this.setParms.data.itemDesc = this.InventoryLookupTableModal.displayName;
        this.setParms.data.unit = this.InventoryLookupTableModal.unit;
        this.setParms.data.conver = this.InventoryLookupTableModal.conver;
        if (this.oesaleHeader.priceList != null && this.oesaleHeader.priceList != "") {
            this.getItemPriceRate(this.oesaleHeader.priceList, this.setParms.data.itemID);
        }
        debugger
        this._consumptionServiceProxy.GetQtyInHand(this.oesaleHeader.locID,this.setParms.data.itemID,this.oesaleHeader.docDate.format("YYYY-MM-DD")).subscribe(
			res => {
                debugger
				this.setParms.data.inHand = res["result"]; 
				this.gridApi.refreshCells();
				//this.onBtStartEditing(this.setParms.rowIndex,"qty");
			}
		)
        // this._consumptionServiceProxy.GetQtyProcessInHand(this.oesaleHeader.locID,this.setParms.data.itemID,this.oesaleHeader.docDate.format("YYYY-MM-DD")).subscribe(
		// 	res => {
        //         debugger
		// 		this.setParms.data.processInHand = res["result"]; 
		// 		this.gridApi.refreshCells();
		// 		//this.onBtStartEditing(this.setParms.rowIndex,"qty");
		// 	}
		// )
        }
        this.gridApi.refreshCells();
        this.onBtStartEditing(this.setParms.rowIndex, "qty");
    }
    //================Item Model===============

    //=====================UOM Model================
    openSelectICUOMModal() {
        debugger;
        this.target = "UOM";
        this.InventoryLookupTableModal.unit = this.setParms.data.unit;
        this.InventoryLookupTableModal.conver = this.setParms.data.conver;
        this.InventoryLookupTableModal.show(this.target);
    }


    setICUOMNull() {
        this.setParms.data.unit = '';
        this.setParms.data.conver = '';
    }


    getNewICUOM() {
        debugger;
        this.setParms.data.unit = this.InventoryLookupTableModal.unit;
        this.setParms.data.conver = this.InventoryLookupTableModal.conver;
        this.gridApi.refreshCells();
        this.onBtStartEditing(this.setParms.rowIndex, "qty");
    }
    //================UOM Model===============

    //=====================Customer Model================
    openSelectCustomerModal() {
        if (this.oesaleHeader.typeID == null || this.oesaleHeader.typeID == "") {
            this.message.warn("Please select transaction Id", "Transaction ID Required");
            return;
        }
        this.target = "Customer";
        this.FinanceLookupTableModal.id = String(this.oesaleHeader.custID);
        this.FinanceLookupTableModal.displayName = this.customerName;
        this.FinanceLookupTableModal.show(this.target, this.oesaleHeader.typeID);
    }
    getNewCustomer() {
        debugger;
        if (this.FinanceLookupTableModal.id != "null") {
            this.oesaleHeader.custID = Number(this.FinanceLookupTableModal.id);
            this.customerName = this.FinanceLookupTableModal.displayName;
        }
    }
    setCustomerIDNull() {
        this.oesaleHeader.custID = null;
        this.customerName = "";

    }
    //=====================Customer Model================

    //=====================Location Model================
    openSelectLocationModal() {
        if (this.allcheckLoc == true) {
            this.target = "Location";
            this.InventoryLookupTableModal.id = String(this.oesaleHeader.locID);
            this.InventoryLookupTableModal.displayName = this.locDesc;
            this.InventoryLookupTableModal.show(this.target);
        }

    }
    getNewLocation() {
        debugger;
        this.oesaleHeader.locID = Number(this.InventoryLookupTableModal.id);
        this.locDesc = this.InventoryLookupTableModal.displayName;
    }
    setLocationIDNull() {
        this.oesaleHeader.locID = null;
        this.locDesc = "";

    }
    //=====================Location Model================

    //=====================Transaction Type Model================
    openSelectTransactionModal() {
        this.target = "TransactionType";
        this.InventoryLookupTableModal.id = this.oesaleHeader.typeID;
        this.InventoryLookupTableModal.displayName = this.typeDesc;
        this.InventoryLookupTableModal.show(this.target);
    }
    getNewTransaction() {
        debugger;
        this.oesaleHeader.typeID = this.InventoryLookupTableModal.id;
        this.typeDesc = this.InventoryLookupTableModal.displayName;
        this.setCustomerIDNull();
    }
    setTransactionIDNull() {
        this.oesaleHeader.typeID = "";
        this.typeDesc = "";
        this.setCustomerIDNull();
    }
    //=====================Transaction Type Model================

    //=====================Price List Model================
    openSelectPriceListModal() {
        this.target = "PriceList";
        this.InventoryLookupTableModal.id = this.oesaleHeader.priceList;
        this.InventoryLookupTableModal.displayName = this.priceListDesc;
        this.InventoryLookupTableModal.show(this.target);
    }
    getNewPriceList() {
        debugger;
        this.oesaleHeader.priceList = this.InventoryLookupTableModal.id;
        this.priceListDesc = this.InventoryLookupTableModal.displayName;
    }
    setPriceListIDNull() {
        this.oesaleHeader.priceList = "";
        this.priceListDesc = "";

    }
    //=====================Price List Model================

    //=====================Sale Refrence Model================
    openSelectReferenceModal() {
        this.target = "Reference";
        this.SalesLookupTableModal.id = this.oesaleHeader.refID;
        this.SalesLookupTableModal.displayName = this.refName;
        this.SalesLookupTableModal.show(this.target,"OE");
    }
    getNewReference() {
        debugger;
        this.oesaleHeader.refID = this.SalesLookupTableModal.id;
        this.refName = this.SalesLookupTableModal.displayName;
    }
    setReferenceIDNull() {
        this.oesaleHeader.refID = "";
        this.refName = "";
    }
    //=====================Sale Refrence Model================

    getItemPriceRate(priceList, item) {
        debugger;
        this._saleEntryServiceProxy.getItemPriceRate(priceList, item).subscribe(result => {
       
            this.setParms.data.rate = result;
            this.gridApi.refreshCells();
        });
       
       
    }

    close(): void {

        this.active = false;
        this.modal.hide();
    }


    approveDoc(id: number,mode, approve) {
        debugger;
        this.message.confirm(
            approve?'Approve SaleEntry':'Unapprove SaleEntry',
            (isConfirmed) => {
                if (isConfirmed) {
                    debugger
                    this._approvelService.ApprovalData("saleEntry", [id], mode, approve)
                        .subscribe(() => {
                            debugger
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

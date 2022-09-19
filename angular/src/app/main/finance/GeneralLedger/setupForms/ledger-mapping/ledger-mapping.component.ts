import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FinanceLookupTableModalComponent } from '@app/finders/finance/finance-lookup-table-modal.component';
import { LegderTypeComboboxService } from '@app/shared/common/legdertype-combobox/legdertype-combobox.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AccountSubLedgersServiceProxy, CreateOrEditAccountSubLedgerDto } from '@shared/service-proxies/service-proxies';
import { AccountSubledgerLookupComponent } from '../accountSubLedgers/account-subledger-lookup.component';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { voRevservices } from '@app/main/finance/shared/services/voRev.service';
import { voRevdto } from '@app/main/finance/shared/dto/voRev-dto';
import { Lightbox } from 'ngx-lightbox';
import { ModalDirective } from 'ngx-bootstrap';
import { ledgerMappDto } from '@app/main/finance/shared/dto/ledgerMapp-dto';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-ledger-mapping',
  templateUrl: './ledger-mapping.component.html',
  animations: [appModuleAnimation()],
})
export class LedgerMappingComponent extends AppComponentBase {


  @ViewChild("accountSubledgerLookup", { static: true })
  accountSubledgerLookup: AccountSubledgerLookupComponent;
  @ViewChild("FinanceLookupTableModal", { static: true })
  FinanceLookupTableModal: FinanceLookupTableModalComponent;
  @ViewChild("ParentaccountModal", { static: true })
  ParentaccountModal: FinanceLookupTableModalComponent;
  dropdownSettings: IDropdownSettings = {};
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();


  accountSubLedger: CreateOrEditAccountSubLedgerDto = new CreateOrEditAccountSubLedgerDto();
  revdto: voRevdto = new voRevdto();
  ledgerdto: ledgerMappDto = new ledgerMappDto();
  dtolist: Array<ledgerMappDto> = new Array<ledgerMappDto>();


  LinkedAccountName: string = "";
  LinkedSubAccountName: string;
  chartofControlAccountName = "";
  ledgerTypes: any[];
  target: string;
  saving: false;
  active: false;
  private setParms

  constructor(
    injector: Injector,
    private _accountSubLedgersServiceProxy: AccountSubLedgersServiceProxy,
    private _LegderTypeComboboxService: LegderTypeComboboxService,
    private _voReversalServiceProxy: voRevservices,
    private _lightbox: Lightbox,
  ) {
    super(injector);
  }

  // //==================================Grid=================================
  private gridApi;
  private gridColumnApi;
  private rowData;
  private rowSelection;
  columnDefs = [

    { headerName: this.l('Account ID'), field: 'id', sortable: true, filter: true, width: 100, editable: false, resizable: true },
    { headerName: this.l('Description'), field: 'accountName', sortable: true, filter: true, width: 200, resizable: true },
    { headerName: 'Check', field: 'isCheck', editable: false, width: 20, cellRenderer: params => { return `<input type='checkbox' ${params.value ? 'checked' : ''} />`; } },
    //{ headerName: 'Check', field: 'isCheck', editable: false, width: 20,headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true ,
    //checkboxSelection: true, cellRenderer: params => { return `<input  ${params.value ? 'checked' : ''} />`; } },
  ];

  onGridReady(params) {
    debugger;
    this.rowData = [];
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    this.rowSelection = "multiple";
  }

  //==================SubID==========
  openSelectSubLedgerAccountModal() {
    this.accountSubledgerLookup.id = this.accountSubLedger.accountID;
    this.accountSubledgerLookup.displayName = this.LinkedSubAccountName;
    this.accountSubledgerLookup.show(this.accountSubLedger.accountID);
  }
  getNewSubledgerId() {
    debugger;
    this.accountSubLedger.subAccID = (
      this.accountSubledgerLookup.id
    );
    this.LinkedSubAccountName = this.accountSubledgerLookup.displayName;
    this.accountSubLedger.slType = parseInt(this.accountSubledgerLookup.slType);
    this.accountSubLedger.slDesc = this.accountSubledgerLookup.slDesc;
  }
  setAccountSubledgerIdNull(clear: boolean) {
    debugger;
    if (!this.accountSubLedger.linked || !clear) {
      this.accountSubLedger.subAccID = null;
      this.LinkedSubAccountName = "";
      this.accountSubLedger.slType = 0;
      this.accountSubLedger.slDesc = "";
      this.setItemIdNull()
    }
  }
  //===============SubID================



  //==============ParentID=====================

  openSelectAccountModal() {
    debugger
    this.ParentaccountModal.id = this.accountSubLedger.accountID;
    this.ParentaccountModal.displayName = this.LinkedAccountName;
    this.ParentaccountModal.show("ChartOfAccount");
  }
  getNewParentAccountId() {
    debugger;
    this.accountSubLedger.accountID = this.ParentaccountModal.id;
    this.LinkedAccountName = this.ParentaccountModal.displayName;
  }
  setAccountIdNull(clear: boolean) {
    debugger;
    if (!this.accountSubLedger.linked || !clear) {
      this.accountSubLedger.accountID = null;
      this.LinkedAccountName = "";
      this.accountSubLedger.subAccID = null;
      this.LinkedSubAccountName = "";
      this.accountSubLedger.slType = 0;
      this.accountSubLedger.slDesc = "";
      this.setItemIdNull()
    }
  }
  //==============ParentID=====================

  getAllAcc() {
    debugger
    this._voReversalServiceProxy.getAllSubAcc(this.accountSubLedger.slType).subscribe(resultD => {
      debugger;


      var rData = [];
      var accID = "";
      var accDesc = "";
      var isCheck = null;
      resultD.forEach(element => {
        debugger
        var newData = {
          id: element.id,
          accountName: element.accountName,
          isCheck: false
        }

        rData.push(newData);

      });
      this.rowData = rData;
    });

    debugger;
    //this.accountSubLedger.accountID = this.rowData.id;
    this.ledgerdto.slType = this.accountSubLedger.slType;
    this.ledgerdto.subAccID = this.accountSubLedger.subAccID;
    this.ledgerdto.subAccName = this.accountSubLedger.subAccName;

  }
  close(): void {
    this.active = false;
    this.modal.hide();
    this._lightbox.close();
  }

  onCellClicked(params) {
    debugger
    if (params.column["colId"] == "isCheck") {
      var isCheck = params.data.isCheck;
      if (isCheck == false) {
        params.data.isCheck = true;
      } else if (isCheck == true) {
        params.data.isCheck = false;
      }
    }
  }

  // bulk(params){
  //   if(params.checked==true){
  //     params.ischeck=true;
  //   }
  //   else{
  //     params.ischeck=false;
  //   }
  // }
  insertSubAcc() {

    var rowData = [];
    this.dtolist = [];
    this.gridApi.forEachNode(node => {
      debugger
      if (node.data.isCheck == true && node.data.id != undefined) {
        rowData.push(node.data);
        this.ledgerdto = new ledgerMappDto();
        this.ledgerdto.accountID = node.data.id;
        this.ledgerdto.parentID = this.accountSubLedger.parentID;
        this.ledgerdto.parentID = this.accountSubLedger.accountID;
        this.ledgerdto.slType = this.accountSubLedger.slType;
        this.ledgerdto.subAccID = this.accountSubLedger.subAccID;
        this.ledgerdto.subAccName = this.LinkedSubAccountName;
        this.dtolist.push(this.ledgerdto);
      }
    });
    debugger
    if (this.dtolist.length != 0) {
      this._voReversalServiceProxy.ProcessSubAcc(this.dtolist).subscribe(result => {
        if (result["result"] == "save") {
          this.saving = false;
          debugger
          this.notify.info(this.l('ProcessSuccessfully'));
          this.setItemIdNull();
          this.close();
          this.modalSave.emit(null);


        }
        else {
          this.message.error("Not Process");
        }
      });
    }
    else{
      this.message.error("Please Select Items")
    }
  }

  setItemIdNull() {
    this.rowData = [];
  }
}
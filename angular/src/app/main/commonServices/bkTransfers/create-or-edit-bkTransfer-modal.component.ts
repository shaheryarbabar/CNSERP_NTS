import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { BkTransfersServiceProxy, CreateOrEditBkTransferDto, FiscalCalendarsServiceProxy, FiscalCalendersServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { BkTransferBankLookupTableModalComponent } from './bkTransfer-bank-lookup-table-modal.component';
import { BkTransferBankLookupTableModalComponent1 } from './bkTransfer-bank-lookup-table-modal.component1';
import { MomentFormatPipe } from '@shared/utils/moment-format.pipe';
import { formatMoment } from 'ngx-bootstrap/chronos/format';
import { FinanceLookupTableModalComponent } from '@app/finders/finance/finance-lookup-table-modal.component';


@Component({
    selector: 'createOrEditBkTransferModal',
    templateUrl: './create-or-edit-bkTransfer-modal.component.html'
})
export class CreateOrEditBkTransferModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('bkTransferBankLookupTableModal', { static: true }) bkTransferBankLookupTableModal: BkTransferBankLookupTableModalComponent;
    @ViewChild('bkTransferBankLookupTableModal1', { static: true }) bkTransferBankLookupTableModal1: BkTransferBankLookupTableModalComponent1;
    @ViewChild("FinanceLookupTableModal", { static: true }) FinanceLookupTableModal: FinanceLookupTableModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    processing = false;
    dateValid:boolean = false;
    bkTransfer: CreateOrEditBkTransferDto = new CreateOrEditBkTransferDto();
    bkStatus: boolean;
    audtdate: Date;
    bankBANKNAME = '';
    BankAccount = '';
    BankAddress = '';
    availableLimit;
    bankBANKNAME1 = '';
    BankAccount1 = '';
    BankAddress1 = '';
    duplicateBank = false;
    validTransfer = false;
    target: any;
    chname: string;
    accountID = "";
    bkbankID = "";
    constructor(
        injector: Injector,
        private _bkTransfersServiceProxy: BkTransfersServiceProxy,
        private _fiscalCalendarsServiceProxy: FiscalCalendersServiceProxy
    ) {
        super(injector);
    }
    getDateParams(val?, checkForDocId?) {
        debugger
		this._fiscalCalendarsServiceProxy.getFiscalYearStatus(this.bkTransfer.transferdate, 'GL').subscribe(
			result => {
				if (result != true) {
					this.notify.info("This Date Is Locked");
					this.dateValid = false;
                }
                else
                {
                    this.dateValid = true;
                }
			}
		)
	}
    show(bkTransferId?: number, txStatus?: boolean): void {
        this.audtdate = null;
        this.bkStatus = txStatus;
        if (!bkTransferId) {
            this.bkTransfer = new CreateOrEditBkTransferDto();
            this.bkTransfer.id = bkTransferId;
            this.bkTransfer.docdate = moment().startOf('day');
            this.bkTransfer.transferdate = moment().startOf('day');
            this.bankBANKNAME = '';
            this.bankBANKNAME1 = '';
            this.BankAccount = '';
            this.BankAddress = '';
            this.BankAccount1 = '';
            this.BankAddress1 = '';
            this.validTransfer = false;
            this._bkTransfersServiceProxy.getDataForCreateForm().subscribe(
                res => {
                    this.bkTransfer.docid = res.docId;
                }
            )
            this.active = true;
            this.modal.show();
            this.getDateParams();
        } else {
            this._bkTransfersServiceProxy.getBkTransferForEdit(bkTransferId).subscribe(result => {
                this.bkTransfer = result.bkTransfer;

                if (this.bkTransfer.audtdate) {
                    this.audtdate = this.bkTransfer.audtdate.toDate();
                }
                this.bankBANKNAME = result.fromBankName;
                this.BankAddress = result.fromBankAddress;
                this.BankAccount = result.fromBankAccount;
                this.bankBANKNAME1 = result.toBankName;
                this.BankAddress1 = result.toBankAddress;
                this.BankAccount1 = result.toBankAccount;
                this.validTransfer = true;
                this.active = true;
                this.modal.show();
                this.getDateParams();
            });
        }
    }
    processBKTransfer(): void {
        debugger;
        this.message.confirm(
            'Process Bank Transfer',
            (isConfirmed) => {
                if (isConfirmed) {
                    this.processing = true;

                    if(moment(new Date()).format("A")==="AM" && !this.bkTransfer.id   && (moment(new Date()).month()+1)==(moment(this.bkTransfer.docdate).month()+1)){
                        this.bkTransfer.docdate =moment(this.bkTransfer.transferdate);
                    }else{
                        this.bkTransfer.docdate =moment(this.bkTransfer.transferdate).endOf('day');
                    }

                    this._bkTransfersServiceProxy.processBkTransfer(this.bkTransfer).subscribe(result => {
                        if (result == "Save") {
                            this.saving = false;
                            this.notify.info(this.l('ProcessSuccessfully'));
                            this.close();
                            this.modalSave.emit(null);
                        } else {
                            this.saving = false;
                            this.notify.error(this.l('ProcessFailed'));
                        }
                    });
                }
            }
        );
    }

    save(): void {
        this.saving = true;


        if (this.audtdate) {
            if (!this.bkTransfer.audtdate) {
                this.bkTransfer.audtdate = moment(this.audtdate).startOf('day');
            }
            else {
                this.bkTransfer.audtdate = moment(this.audtdate);
            }
        }
        else {
            this.bkTransfer.audtdate = null;
        }

        if(moment(new Date()).format("A")==="AM" && !this.bkTransfer.id   && (moment(new Date()).month()+1)==(moment(this.bkTransfer.docdate).month()+1)){
            this.bkTransfer.docdate =moment(this.bkTransfer.docdate);
            this.bkTransfer.transferdate =moment(this.bkTransfer.transferdate);
        }else{
            this.bkTransfer.docdate =moment(this.bkTransfer.docdate).endOf('day');
            this.bkTransfer.transferdate =moment(this.bkTransfer.transferdate).endOf('day');
        }

        this._bkTransfersServiceProxy.createOrEdit(this.bkTransfer)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
        this.close();
    }
    getNewFinanceModal() {
        debugger;
        switch (this.target) {
            // case "ChequeBook":
            //     this.getNewCheckBook();
            //     break;
            case "ChequeBookNumber":
                this.getNewCheckNo();
                break;

            default:
                break;
        }
    }
    //=====================CheckBook Model================
    // openSelectCheckBookModal() {
    //     debugger;
    //     this.target = "ChequeBook";
    //     this.FinanceLookupTableModal.id = this.bkTransfer.chbook;
    //     this.FinanceLookupTableModal.accountID = "";
    //     this.FinanceLookupTableModal.displayName = "";
    //     this.FinanceLookupTableModal.show(this.target, this.bkbankID);
    // }

    // setCheckBookNull() {
    //     this.bkTransfer.chbook = "";
    // }

    // getNewCheckBook() {
    //     this.bkTransfer.chbook = this.FinanceLookupTableModal.displayName;
    //     this.accountID = this.FinanceLookupTableModal.accountID;
    // }
    //=====================CheckBook Model=================

    //////////////////////////////////////InstrumentNO//////////////////////////////////////
    openCheckNo() {
        debugger
        this.target = "ChequeBookNumber";
        this.FinanceLookupTableModal.id = this.bkTransfer.chnumber;
        this.FinanceLookupTableModal.displayName = this.chname;
        this.FinanceLookupTableModal.show(this.target, this.bkbankID);
        //this.FinanceLookupTableModal.show(this.target,this.accountIdC);
    }
    setCheckNoNull(){
        this.bkTransfer.chnumber = "";        
    }
    getNewCheckNo() { 
        this.bkTransfer.chnumber = this.FinanceLookupTableModal.id;
    }
    //////////////////////////////////////InstrumentNO//////////////////////////////////////

    openSelectBankModal() {
        this.bkTransferBankLookupTableModal.displayName = this.bankBANKNAME;
        this.bkTransferBankLookupTableModal.id = this.bkTransfer.bankId;
        this.bkTransferBankLookupTableModal.bankAccount = this.BankAccount;
        this.bkTransferBankLookupTableModal.address = this.BankAddress;
        this.bkTransferBankLookupTableModal.show();
    }


    openSelectBankModal1() {
        this.bkTransferBankLookupTableModal1.id = this.bkTransfer.bankId;
        this.bkTransferBankLookupTableModal1.displayName = this.bankBANKNAME1;
        this.bkTransferBankLookupTableModal1.bankAccount = this.BankAccount1;
        this.bkTransferBankLookupTableModal1.address = this.BankAddress1;
        this.bkTransferBankLookupTableModal1.show();
    }


    setBankIdNull() {
        this.bkTransfer.bankId = null;
        this.bankBANKNAME = '';
    }


    getNewBankId() {
        debugger
        this.bkTransfer.bankId = this.bkTransferBankLookupTableModal.id;
        this.bankBANKNAME = this.bkTransferBankLookupTableModal.displayName;
        this.BankAddress = this.bkTransferBankLookupTableModal.address;
        this.BankAccount = this.bkTransferBankLookupTableModal.bankAccount;
        this.bkTransfer.frombankid = this.bkTransferBankLookupTableModal.id
        this.bkTransfer.fromconfigid = 1;
        this.bkTransfer.availlimit = this.bkTransferBankLookupTableModal.availableLimit;
        this.bkbankID = this.bkTransferBankLookupTableModal.bankID;
        this.checkDuplicateBank();
    }

    getNewBankId1() {
        this.bkTransfer.bankId = this.bkTransferBankLookupTableModal1.id;
        this.bankBANKNAME1 = this.bkTransferBankLookupTableModal1.displayName;
        this.BankAddress1 = this.bkTransferBankLookupTableModal1.address;
        this.BankAccount1 = this.bkTransferBankLookupTableModal1.bankAccount;
        this.bkTransfer.tobankid = this.bkTransferBankLookupTableModal1.id;
        this.bkTransfer.toconfigid = 1;
        this.checkDuplicateBank();
    }

    chkTransfer() {
        debugger
        if (this.bkTransfer.availlimit >= this.bkTransfer.transferamount)
            this.validTransfer = true;
        else
            this.validTransfer = false;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }


    checkDuplicateBank() {
        if (this.bankBANKNAME === this.bankBANKNAME1) {
            this.duplicateBank = true;
        }
        else {
            this.duplicateBank = false;
        }
    }

    docDate(event: any) {
        this.getDateParams(null);
        this.bkTransfer.docdate = event;
        this.bkTransfer.transferdate = moment(this.bkTransfer.transferdate,"dd/mm/yyyy");
        this.bkTransfer.docdate = moment(this.bkTransfer.docdate,"dd/mm/yyyy");
       
        if (this.bkTransfer.transferdate != undefined &&
            this.bkTransfer.transferdate < this.bkTransfer.docdate) {
            // this.validDate = false;
            this.message.warn("Transfer date cannot be less than Voucher date");
            this.validTransfer=false;
        }

     
    }

    transferDate(event: any) {
        this.getDateParams(null);
        this.bkTransfer.transferdate = event;
        this.bkTransfer.transferdate = moment(this.bkTransfer.transferdate,"dd/mm/yyyy");
        this.bkTransfer.docdate = moment(this.bkTransfer.docdate,"dd/mm/yyyy");
       
        if (this.bkTransfer.docdate != undefined &&
            this.bkTransfer.transferdate < this.bkTransfer.docdate) {
            // this.validDate = false;
            this.message.warn("Transfer date cannot be less than Voucher date");
            this.validTransfer=false;
        }

     
    }

}

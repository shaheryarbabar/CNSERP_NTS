import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { CreateOrEditDepartmentDto } from '../shared/dto/department-dto';
import { DepartmentsServiceProxy } from '../shared/services/department.service';
import { CreateOrEditemployeeLoansDto } from '../shared/dto/employeeLoans-dto';
import { EmployeeLoansService } from '../shared/services/employeeLoans.service';
import { PayRollLookupTableModalComponent } from '@app/finders/payRoll/payRoll-lookup-table-modal.component';
import { LogComponent } from '@app/finders/log/log.component';

@Component({
    selector: 'createOrEditEmployeeLoansModal',
    templateUrl: './create-or-edit-employeeLoans-modal.component.html'
})
export class CreateOrEditEmployeeLoansModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('LogTableModal', { static: true }) LogTableModal: LogComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('PayRollLookupTableModal', { static: true }) payRollLookupTableModal: PayRollLookupTableModalComponent;
    active = false;
    saving = false;
    loanDate: Date;
    employeeName: string = '';
    employeeLoansTypeName: string = '';
    employeeLoans: CreateOrEditemployeeLoansDto = new CreateOrEditemployeeLoansDto();
    target: string = ''
        ; constructor(
            injector: Injector,
            private _employeeLoansService: EmployeeLoansService
        ) {
        super(injector);
    }
    openEmployeeModal() {
        this.target = "Employee";
        this.payRollLookupTableModal.id = String(this.employeeLoans.EmployeeID);
        this.payRollLookupTableModal.displayName = String(this.employeeName);
        this.payRollLookupTableModal.show(this.target);
    }
    openEmployeeLoansTypeModal() {
        this.target = "EmployeeLoansType";
        this.payRollLookupTableModal.id = String(this.employeeLoans.loanTypeID);
        this.payRollLookupTableModal.displayName = String(this.employeeLoansTypeName);
        this.payRollLookupTableModal.show(this.target);
    }
    show(loanId?: number): void {
        debugger;

        if (!loanId) {
            this.employeeLoans = new CreateOrEditemployeeLoansDto();
            this.employeeLoans.id = loanId;
            this.loanDate = new Date();
            this.employeeLoansTypeName = '';
            this.employeeName = '';
            // this._employeeLoansService.getMaxDeptId().subscribe(result => {
            //     this.employeeLoans.LoanID = result;
            // });
            this.active = true;
            this.modal.show();
        } else {
            debugger
            this._employeeLoansService.getEmployeeLoansForEdit(loanId).subscribe(result => {
                this.employeeLoans = result.employeeLoans;
                this.loanDate = moment(this.employeeLoans.LoanDate).toDate();
                this.employeeLoansTypeName = this.employeeLoans.employeeLoanTypeName;
                this.employeeName = this.employeeLoans.employeeName;
                this.active = true;
                this.modal.show();
            });
        }
    }
    setEmployeeNull() {
        this.employeeLoans.EmployeeID = null;
        this.employeeName = "";
    }
    setEmployeeLoansTypeNull() {
        this.employeeLoans.loanTypeID = null;
        this.employeeLoansTypeName = "";
    }


    getNewEmployee() {
        this.employeeLoans.EmployeeID = Number(this.payRollLookupTableModal.id);
        this.employeeName = this.payRollLookupTableModal.displayName;
    }

    getNewEmployeeLoans() {
        this.employeeLoans.loanTypeID = Number(this.payRollLookupTableModal.id);
        this.employeeLoansTypeName = this.payRollLookupTableModal.displayName;
    }
    getNewPayRollModal() {
        switch (this.target) {
            case "Employee":
                this.getNewEmployee();
                break;
            case "EmployeeLoansType":
                this.getNewEmployeeLoans();
                break;
            default:
                break;
        }
    }
    OpenLog(){
        debugger
       this.LogTableModal.show(this.employeeLoans.LoanID,'Loan');
    }

    setApprove(id:number,status:number){
        this._employeeLoansService.appUnAppLoan(id,status).subscribe((res)=>{
   
                    this.saving = false;
                    if(status==1){
                       this.notify.info(this.l('Approved Successfully!!'));
                    }else{
   
                       this.notify.info(this.l('Unapproved Successfully!!'));
                    }
                   
                   this.close();
                   this.modalSave.emit(null);
        })
       }
    CreateJV(){
        this._employeeLoansService.ProcessLoan(this.employeeLoans.id).subscribe((result)=>{
            debugger
            if (result == "Save") {
                this.saving = false;
                this.notify.info(this.l('ProcessSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            } else if (result == "NoAccount") {
                this.message.warn("Account not found Against Item Segment", "Account Required");
                //this.processing = false;
            } else {
                this.message.error("Input not valid", "Verify Input");
               // this.processing = false;
            }

        });
    }
    save(): void {
        debugger;
        this.saving = true;
        this.employeeLoans.LoanDate = this.loanDate.toDateString();
        this._employeeLoansService.createOrEdit(this.employeeLoans)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }
    MakeInstAmt() {
        if (this.employeeLoans.Amount > 0 && this.employeeLoans.insAmt > 0)
            this.employeeLoans.NOI = Math.ceil(this.employeeLoans.Amount / this.employeeLoans.insAmt);
    }

    close(): void {
        debugger;
        this.active = false;
        this.modal.hide();
    }
}

import {
    Component,
    Injector,
    ViewEncapsulation,
    ViewChild,
    EventEmitter,
    Output,
    OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { AppComponentBase } from "@shared/common/app-component-base";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import * as _ from "lodash";
import * as moment from "moment";
import { FiscalDateService } from "@app/shared/services/fiscalDate.service";
import { ReportviewrModalComponent } from "@app/shared/common/reportviewr-modal/reportviewr-modal.component";
import { PayRollLookupTableModalComponent } from "@app/finders/payRoll/payRoll-lookup-table-modal.component";
import { ReportFilterServiceProxy } from "@shared/service-proxies/service-proxies";
import { result } from "lodash";
@Component({
    templateUrl: "./salaryReports.component.html",
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class SalaryReportsComponent extends AppComponentBase implements OnInit {
    @ViewChild("reportView", { static: true })
    reportView: ReportviewrModalComponent;
    @ViewChild("PayRollLookupTableModal", { static: true })
    PayRollLookupTableModal: PayRollLookupTableModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    target: any;
    type: string = "";
    typeID: number = 0;
    empTypeName: string = "";
    fromSalary = "0";
    toSalary = "999999";
    fromLocId = "0";
    toLocId = "999999"

    fromEmpID = "0";
    fromEmpName = "";
    toEmpID = "99999";
    toEmpName = "";
    fromDeptID = "0";
    loanTypeName = "";
    toloanTypeName = "";
    loanTypeId = '0';
    tolaonTypeId = '99999';
    fromDeptName = "";
    toDeptID = "99999";
    toDeptName = "";
    fromSecID = "0";
    fromSecName = "";
    toSecID = "99999";
    toSecName = "";
    reportCheck: string;
    fromLocationName: string;
    tolocationName: string;
    empTypeId: number;

    Employee_PaymentMode!: string | undefined;
    PaymentMode: number;
    fromlocID = "0";
    tolocID = "99999";
    yearAndMonth = new Date();
    salaryYear: number;
    salaryMonth: number;
    empType;

    showFromSalary: boolean = true;
    showToSalary: boolean = true;
    showFromEmployee: boolean = true;
    showToEmployee: boolean = true;
    showFromDep: boolean = true;
    showToDep: boolean = true;
    showFromSec: boolean = true;
    showToSec: boolean = true;
    showFromLoc: boolean = true;
    showToLoc: boolean = true;
    showFromEmptype: boolean = true;
    showLoantype: boolean = true;
    selectyear: boolean = true;
    paymode: boolean = true;
    loantype: boolean = true;
    showtoloantype: boolean = true;
    constructor(injector: Injector, private route: Router,
        private reportFilterServiceProxy: ReportFilterServiceProxy) {
        super(injector);
    }

    onOpenCalendar(container) {
        container.monthSelectHandler = (event: any): void => {
            container._store.dispatch(container._actions.select(event.date));
        };
        container.setViewMode("month");
    }
    openLocationModal(type) {
        ;
        this.target = "Location";
        this.type = type;
        this.PayRollLookupTableModal.id = String(this.fromlocID);
        this.PayRollLookupTableModal.displayName = this.fromLocationName;
        this.PayRollLookupTableModal.show(this.target);
    }

    ngOnInit(): void {
        this.reportFilterServiceProxy.getLoanTypes().subscribe(
            data => {
                console.log(data);
                this.empType = data["result"];
                this.empTypeId = 1;
                debugger;



            }
        );


    }

    getNewLocation() {
        if (this.type == "fromLoc") {
            this.fromlocID = this.PayRollLookupTableModal.id;
            this.fromLocationName = this.PayRollLookupTableModal.displayName;
            this.tolocID = this.fromlocID;
            this.tolocationName = this.fromLocationName;
        } else if (this.type == "ToLoc") {
            this.tolocID = this.PayRollLookupTableModal.id;
            this.tolocationName = this.PayRollLookupTableModal.displayName;
            //this.TlocID=this.locID;
            //this.TlocationName=this.locationName;
        }

    }
    setLocationNull(type) {
        this.type = type;
        if (this.type == "fromLoc") {
            this.fromlocID = "0";
            this.fromLocationName = "";
        } else if (this.type == "ToLoc") {
            this.tolocID = "99999";
            this.tolocationName = "";
        }

    }



    getReport() {
        debugger;




        switch (this.reportCheck) {
            case "salarySheet":
                this.processReport("SalarySheet");
                break;

            case "deductionRegister":
                this.processReport("DeductionRegister");
                break;
            case "allowanceRegister":
                this.processReport("AllowanceRegister");
                break;

            case "salarySheetSummary":
                this.processReport("SalarySheetSummary");
                break;
            // case "disbursmentSummary":
            //     this.processReport("disbursmentSummary");
            //     break;
            case "salarySlips":
                this.processReport("SalarySlips");
                break;
            case "bankAdvicePermanent":
                this.processReport("BankAdvicePermanent");
                break;
            case "bankAdviceContract":
                this.processReport("BankAdviceContract");
                break;
            case "loanLedger":
                this.processReport("LoanLedger");
                break;
            case "loantype":
                this.processReport("LoanType");
                break;
            default:
                break;
        }
    }

    processReport(report: string) {
        debugger;
        if (this.yearAndMonth == null) {
            this.notify.error(this.l("Please Select Year and Month"));
            return;
        }
        let repParams = "";
        this.salaryYear = this.yearAndMonth.getFullYear();
        this.salaryMonth = this.yearAndMonth.getMonth() + 1;
        switch (report) {
            case "SalarySheet":
                if (this.fromEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.fromEmpID) + "$";
                if (this.toEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.toEmpID) + "$";
                if (this.fromDeptID !== undefined)
                    repParams += encodeURIComponent("" + this.fromDeptID) + "$";
                if (this.toDeptID !== undefined)
                    repParams += encodeURIComponent("" + this.toDeptID) + "$";
                if (this.fromSecID !== undefined)
                    repParams += encodeURIComponent("" + this.fromSecID) + "$";
                if (this.toSecID !== undefined)
                    repParams += encodeURIComponent("" + this.toSecID) + "$";
                if (this.fromSalary !== undefined)
                    repParams += encodeURIComponent("" + this.fromSalary) + "$";
                if (this.toSalary !== undefined)
                    repParams += encodeURIComponent("" + this.toSalary) + "$";
                if (this.salaryYear !== undefined)
                    repParams += encodeURIComponent("" + this.salaryYear) + "$";
                if (this.salaryMonth !== undefined)
                    repParams += encodeURIComponent("" + this.salaryMonth) + "$";
                if (this.fromlocID !== undefined)
                    repParams += encodeURIComponent("" + this.fromlocID) + "$";
                if (this.tolocID !== undefined)
                    repParams += encodeURIComponent("" + this.tolocID) + "$";
                if (this.typeID !== undefined)
                    repParams += encodeURIComponent("" + this.typeID) + "$";
                var payment = $('#Employee_PaymentMode').val();

                if (payment !== undefined)
                    repParams += encodeURIComponent("" + payment) + "$";
                repParams += encodeURIComponent("false") + "$";
                repParams = repParams.replace(/[?$]&/, "");
                break;

            case "DeductionRegister":
                if (this.fromEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.fromEmpID) + "$";
                if (this.toEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.toEmpID) + "$";
                if (this.fromDeptID !== undefined)
                    repParams += encodeURIComponent("" + this.fromDeptID) + "$";
                if (this.toDeptID !== undefined)
                    repParams += encodeURIComponent("" + this.toDeptID) + "$";
                if (this.fromSecID !== undefined)
                    repParams += encodeURIComponent("" + this.fromSecID) + "$";
                if (this.toSecID !== undefined)
                    repParams += encodeURIComponent("" + this.toSecID) + "$";
                if (this.fromSalary !== undefined)
                    repParams += encodeURIComponent("" + this.fromSalary) + "$";
                if (this.toSalary !== undefined)
                    repParams += encodeURIComponent("" + this.toSalary) + "$";
                if (this.salaryYear !== undefined)
                    repParams += encodeURIComponent("" + this.salaryYear) + "$";
                if (this.salaryMonth !== undefined)
                    repParams += encodeURIComponent("" + this.salaryMonth) + "$";
                if (this.fromlocID !== undefined)
                    repParams += encodeURIComponent("" + this.fromlocID) + "$";
                if (this.tolocID !== undefined)
                    repParams += encodeURIComponent("" + this.tolocID) + "$";
                if (this.typeID !== undefined)
                    repParams += encodeURIComponent("" + this.typeID) + "$";
                repParams += encodeURIComponent("false") + "$";
                repParams = repParams.replace(/[?$]&/, "");
                break;

            case "AllowanceRegister":
                if (this.fromEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.fromEmpID) + "$";
                if (this.toEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.toEmpID) + "$";
                if (this.fromDeptID !== undefined)
                    repParams += encodeURIComponent("" + this.fromDeptID) + "$";
                if (this.toDeptID !== undefined)
                    repParams += encodeURIComponent("" + this.toDeptID) + "$";
                if (this.fromSecID !== undefined)
                    repParams += encodeURIComponent("" + this.fromSecID) + "$";
                if (this.toSecID !== undefined)
                    repParams += encodeURIComponent("" + this.toSecID) + "$";
                if (this.fromSalary !== undefined)
                    repParams += encodeURIComponent("" + this.fromSalary) + "$";
                if (this.toSalary !== undefined)
                    repParams += encodeURIComponent("" + this.toSalary) + "$";
                if (this.salaryYear !== undefined)
                    repParams += encodeURIComponent("" + this.salaryYear) + "$";
                if (this.salaryMonth !== undefined)
                    repParams += encodeURIComponent("" + this.salaryMonth) + "$";
                if (this.fromlocID !== undefined)
                    repParams += encodeURIComponent("" + this.fromlocID) + "$";
                if (this.tolocID !== undefined)
                    repParams += encodeURIComponent("" + this.tolocID) + "$";
                if (this.typeID !== undefined)
                    repParams += encodeURIComponent("" + this.typeID) + "$";
                repParams += encodeURIComponent("false") + "$";
                repParams = repParams.replace(/[?$]&/, "");
                break;

            case "SalarySheetSummary":
                // if (this.salaryYear !== undefined)
                //     repParams += encodeURIComponent("" + this.salaryYear) + "$";
                // if (this.salaryMonth !== undefined)
                //     repParams += encodeURIComponent("" + this.salaryMonth) + "$";
                // repParams = repParams.replace(/[?$]&/, "");

                if (this.fromEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.fromEmpID) + "$";
                if (this.toEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.toEmpID) + "$";
                if (this.fromDeptID !== undefined)
                    repParams += encodeURIComponent("" + this.fromDeptID) + "$";
                if (this.toDeptID !== undefined)
                    repParams += encodeURIComponent("" + this.toDeptID) + "$";
                if (this.fromSecID !== undefined)
                    repParams += encodeURIComponent("" + this.fromSecID) + "$";
                if (this.toSecID !== undefined)
                    repParams += encodeURIComponent("" + this.toSecID) + "$";
                if (this.fromSalary !== undefined)
                    repParams += encodeURIComponent("" + this.fromSalary) + "$";
                if (this.toSalary !== undefined)
                    repParams += encodeURIComponent("" + this.toSalary) + "$";
                if (this.salaryYear !== undefined)
                    repParams += encodeURIComponent("" + this.salaryYear) + "$";
                if (this.salaryMonth !== undefined)
                    repParams += encodeURIComponent("" + this.salaryMonth) + "$";
                if (this.fromlocID !== undefined)
                    repParams += encodeURIComponent("" + this.fromlocID) + "$";
                if (this.tolocID !== undefined)
                    repParams += encodeURIComponent("" + this.tolocID) + "$";
                if (this.typeID !== undefined)
                    repParams += encodeURIComponent("" + this.typeID) + "$";
                var payment = $('#Employee_PaymentMode').val();

                if (payment !== undefined)
                    repParams += encodeURIComponent("" + payment) + "$";
                if (this.typeID !== undefined)
                    repParams += encodeURIComponent("" + this.typeID) + "$";
                repParams += encodeURIComponent("true") + "$";
                repParams = repParams.replace(/[?$]&/, "");

                break;
                // case "disbursmentSummary":
                if (this.salaryYear !== undefined)
                    repParams += encodeURIComponent("" + this.salaryYear) + "$";
                if (this.salaryMonth !== undefined)
                    repParams +=
                        encodeURIComponent("" + this.salaryMonth) + "$";
                repParams = repParams.replace(/[?$]&/, "");

                break;

            case "SalarySlips":
                if (this.fromEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.fromEmpID) + "$";
                if (this.toEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.toEmpID) + "$";
                if (this.fromDeptID !== undefined)
                    repParams += encodeURIComponent("" + this.fromDeptID) + "$";
                if (this.toDeptID !== undefined)
                    repParams += encodeURIComponent("" + this.toDeptID) + "$";
                if (this.fromSecID !== undefined)
                    repParams += encodeURIComponent("" + this.fromSecID) + "$";
                if (this.toSecID !== undefined)
                    repParams += encodeURIComponent("" + this.toSecID) + "$";
                if (this.fromSalary !== undefined)
                    repParams += encodeURIComponent("" + this.fromSalary) + "$";
                if (this.toSalary !== undefined)
                    repParams += encodeURIComponent("" + this.toSalary) + "$";
                if (this.salaryYear !== undefined)
                    repParams += encodeURIComponent("" + this.salaryYear) + "$";
                if (this.salaryMonth !== undefined)
                    repParams +=
                        encodeURIComponent("" + this.salaryMonth) + "$";
                repParams = repParams.replace(/[?$]&/, "");
                break;

            case "LoanLedger":
                if (this.fromEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.fromEmpID) + "$";
                if (this.toEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.toEmpID) + "$";
                if (this.toEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.empTypeId) + "$";

                repParams = repParams.replace(/[?$]&/, "");
                break;

            case "BankAdvicePermanent":
                if (this.salaryMonth !== undefined)
                    repParams +=
                        encodeURIComponent("" + this.salaryMonth) + "$";
                if (this.salaryYear !== undefined)
                    repParams += encodeURIComponent("" + this.salaryYear) + "$";
                //repParams += encodeURIComponent("" + 1) + "$";

                repParams = repParams.replace(/[?$]&/, "");
                break;

            case "BankAdviceContract":
                if (this.salaryMonth !== undefined)
                    repParams +=
                        encodeURIComponent("" + this.salaryMonth) + "$";
                if (this.salaryYear !== undefined)
                    repParams += encodeURIComponent("" + this.salaryYear) + "$";
                //repParams += encodeURIComponent("" + 2) + "$";

                repParams = repParams.replace(/[?$]&/, "");
                break;


            case "LoanType":
                if (this.fromEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.fromEmpID) + "$";
                if (this.toEmpID !== undefined)
                    repParams += encodeURIComponent("" + this.toEmpID) + "$";
                if (this.fromDeptID !== undefined)
                    repParams += encodeURIComponent("" + this.fromDeptID) + "$";
                if (this.toDeptID !== undefined)
                    repParams += encodeURIComponent("" + this.toDeptID) + "$";
                if (this.fromSecID !== undefined)
                    repParams += encodeURIComponent("" + this.fromSecID) + "$";
                if (this.toSecID !== undefined)
                    repParams += encodeURIComponent("" + this.toSecID) + "$";
                if (this.fromSalary !== undefined)
                    repParams += encodeURIComponent("" + this.fromSalary) + "$";
                if (this.toSalary !== undefined)
                    repParams += encodeURIComponent("" + this.toSalary) + "$";
                if (this.salaryYear !== undefined)
                    repParams += encodeURIComponent("" + this.salaryYear) + "$";
                if (this.salaryMonth !== undefined)
                    repParams +=
                        encodeURIComponent("" + this.salaryMonth) + "$";
                repParams = repParams.replace(/[?$]&/, "");
                if (this.fromlocID !== undefined)
                    repParams += encodeURIComponent("" + this.fromlocID) + "$";
                if (this.tolocID !== undefined)
                    repParams += encodeURIComponent("" + this.tolocID) + "$";
                if (this.loanTypeId !== undefined)
                    repParams += encodeURIComponent("" + this.loanTypeId) + "$";
                if (this.tolaonTypeId !== undefined)
                    repParams += encodeURIComponent("" + this.tolaonTypeId) + "$";

                break;





            default:
                break;
        }
        debugger
        this.reportView.show(report, repParams);
    }

    getNewPayRollModal() {
        debugger;
        switch (this.target) {
            case "Employee":
                this.getNewEmployee();
                break;
            case "Department":
                this.getNewDepartment();
                break;
            case "LoanType":
                this.getNewLoanType();
                break;

            case "Section":
                this.getNewSection();
                break;
            case "Location":
                this.getNewLocation();
            case "EmploymentType":
                this.getNewEmpType();
            default:
                break;
        }
    }
    openEmpTypeModal(type) {
        ;
        this.target = "EmploymentType";
        this.type = type;
        debugger
        if (this.type == 'EmploymentType') {
            this.PayRollLookupTableModal.id = String(this.typeID);
            this.PayRollLookupTableModal.displayName = this.empTypeName;

        }
        this.PayRollLookupTableModal.show(this.target);
    }

    getNewEmpType() {
        debugger
        if (this.type == 'EmpType') {
            this.typeID = Number(this.PayRollLookupTableModal.id);
            this.empTypeName = this.PayRollLookupTableModal.displayName;
        }

    }

    setEmpTypeNull() {
        this.typeID = 0;
        this.empTypeName = "";
    }
    //////////////////////////////////////////////////////Employee//////////////////////////////////////////////////////////////////////////
    openEmployeeModal(type) {
        debugger;
        this.target = "Employee";
        this.type = type;
        if (this.type == "fromEmp") {
            this.PayRollLookupTableModal.id = this.fromEmpID;
            this.PayRollLookupTableModal.displayName = this.fromEmpName;
        } else if (this.type == "toEmp") {
            this.PayRollLookupTableModal.id = this.toEmpID;
            this.PayRollLookupTableModal.displayName = this.toEmpName;
        }
        this.PayRollLookupTableModal.show(this.target);
    }

    getNewEmployee() {
        if (this.type == "fromEmp") {
            this.fromEmpID = this.PayRollLookupTableModal.id;
            this.fromEmpName = this.PayRollLookupTableModal.displayName;
            this.toEmpID = this.fromEmpID;
            this.toEmpName = this.fromEmpName;
        } else if (this.type == "toEmp") {
            this.toEmpID = this.PayRollLookupTableModal.id;
            this.toEmpName = this.PayRollLookupTableModal.displayName;

            //this.toEmpID=this.fromEmpID;
            //this.toEmpName=this.fromEmpName;
        }
    }

    setEmployeeNull(type) {
        if (type == "fromEmp") {
            this.fromEmpID = "0";
            this.fromEmpName = "";
        } else if (type == "toEmp") {
            this.toEmpID = "99999";
            this.toEmpName = "";
        }
    }
    //////////////////////////////////////////////////////Employee////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Department//////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////Department//////////////////////////////////////////////////////////////////////////
    openDepartmentModal(type) {
        debugger;
        this.type = type;
        this.target = "Department";

        if (this.type == "fromDept") {
            this.PayRollLookupTableModal.id = this.fromDeptID;
            this.PayRollLookupTableModal.displayName = this.fromDeptName;
        } else if (this.type == "toDept") {
            this.PayRollLookupTableModal.id = this.toDeptID;
            this.PayRollLookupTableModal.displayName = this.toDeptName;
        }

        this.PayRollLookupTableModal.show(this.target);
    }

    getNewDepartment() {
        if (this.type == "fromDept") {
            this.fromDeptID = this.PayRollLookupTableModal.id;
            this.fromDeptName = this.PayRollLookupTableModal.displayName;
            this.toDeptID = this.fromDeptID;
            this.toDeptName = this.fromDeptName;
        } else if (this.type == "toDept") {
            this.toDeptID = this.PayRollLookupTableModal.id;
            this.toDeptName = this.PayRollLookupTableModal.displayName;

            //this.toDeptID=this.fromDeptID;
            //this.toDeptName=this.fromDeptName;
        }
    }

    setDepartmentNull(type) {
        if (type == "fromDept") {
            this.fromDeptID = "0";
            this.fromDeptName = "";
        } else if (type == "toDept") {
            this.toDeptID = "99999";
            this.toDeptName = "";
        }
    }

    ///////////////////////////////////////////////////////Start LaonType//////////////////////////////////////

    openLoanTypeModal(type) {
        debugger;
        this.type = type;
        this.target = "LoanType";
        this.type == type;
        if (this.type == "loanTypeName") {
            this.PayRollLookupTableModal.id = this.loanTypeId;
            this.PayRollLookupTableModal.displayName = this.loanTypeName;
            this.PayRollLookupTableModal.show(this.target);
        }

        else if (this.type == "toloanTypeName") {
            this.PayRollLookupTableModal.id = this.tolaonTypeId;
            this.PayRollLookupTableModal.displayName = this.toloanTypeName;
        }
        this.PayRollLookupTableModal.show(this.target);
    }
    setLoanTypeNull(type) {
        // this.loanTypeId='';
        // this.loanTypeName='';

        if (type == "loanTypeName") {
            this.loanTypeId = "0";
            this.loanTypeName = "";
        } else if (type == "toloanTypeName") {
            this.tolaonTypeId = "99999";
            this.toloanTypeName = "";
        }

    }

    getNewLoanType() {
        this.loanTypeId = this.PayRollLookupTableModal.id;
        this.loanTypeName = this.PayRollLookupTableModal.displayName;


        if (this.type == "loanTypeName") {
            this.loanTypeId = this.PayRollLookupTableModal.id;
            this.loanTypeName = this.PayRollLookupTableModal.displayName;
            this.tolaonTypeId = this.loanTypeId;
            this.toloanTypeName = this.loanTypeName;
        } else if (this.type == "toloanTypeName") {
            this.tolaonTypeId = this.PayRollLookupTableModal.id;
            this.toloanTypeName = this.PayRollLookupTableModal.displayName;

            //this.toSecID=this.fromSecID;
            //this.toSecName=this.fromSecName;
        }


    }

    //////////////////////////////////////////////////////Department////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Department//////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////Section////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Department//////////////////////////////////////////////////////////////////////////
    openSectionModal(type) {
        debugger;
        this.target = "Section";
        this.type = type;
        if (this.type == "fromSec") {
            this.PayRollLookupTableModal.id = this.fromSecID;
            this.PayRollLookupTableModal.displayName = this.fromSecName;
        } else if (this.type == "toSec") {
            this.PayRollLookupTableModal.id = this.toSecID;
            this.PayRollLookupTableModal.displayName = this.toSecName;
        }
        this.PayRollLookupTableModal.show(this.target);
    }

    getNewSection() {
        if (this.type == "fromSec") {
            this.fromSecID = this.PayRollLookupTableModal.id;
            this.fromSecName = this.PayRollLookupTableModal.displayName;
            this.toSecID = this.fromSecID;
            this.toSecName = this.fromSecName;
        } else if (this.type == "toSec") {
            this.toSecID = this.PayRollLookupTableModal.id;
            this.toSecName = this.PayRollLookupTableModal.displayName;

            //this.toSecID=this.fromSecID;
            //this.toSecName=this.fromSecName;
        }
    }

    setSectionNull(type) {
        if (type == "fromSec") {
            this.fromSecID = "0";
            this.fromSecName = "";
        } else if (type == "toSec") {
            this.toSecID = "99999";
            this.toSecName = "";
        }
    }
    //////////////////////////////////////////////////////Section//////////////////////////////////////////////////////////////////////////
    hideFields() {
        debugger;
        switch (this.reportCheck) {
            case "salarySheet":
                this.loantype = false;
                this.showtoloantype = false;
                this.showFromSalary = false;
                this.showFromSec = false;
                this.showToSec = false;
                this.showFromDep = true;
                this.showToDep = true;
                this.showFromEmployee = true;
                this.showToEmployee = true;
                this.showFromLoc = true;
                this.showToLoc = true;
                this.showFromEmptype = true;
                this.showLoantype = false;
                this.selectyear = true;
                break;
            case "salarySheetSummary":
                this.loantype = false;
                this.showtoloantype = false;
                this.showFromSalary = false;
                this.showFromSec = false;
                this.showToSec = false;
                this.showFromDep = false;
                this.showToDep = false;
                this.showFromEmployee = false;
                this.showToEmployee = false;
                this.showFromLoc = true;
                this.showToLoc = true;
                this.showFromEmptype = false;
                this.showLoantype = false;
                this.selectyear = true;
                this.paymode = true;
                break;
            case "loanLedger":
                this.loantype = false;
                this.showtoloantype = false;
                this.showFromDep = true;
                this.showToDep = true;
                this.showFromEmployee = true;
                this.showToEmployee = true;
                this.showFromSalary = false;
                this.showFromSec = false;
                this.showToSec = false;
                this.showFromLoc = false;
                this.showToLoc = false;
                this.showFromEmptype = false;
                this.showLoantype = false;
                this.selectyear = false;
                break;
            case "loantype":
                this.loantype = true;
                this.showtoloantype = true;
                this.showFromDep = true;
                this.showToDep = true;
                this.showFromEmployee = false;
                this.showToEmployee = false;
                this.showFromSalary = false;
                this.showFromSec = false;
                this.showToSec = false;
                this.showFromLoc = true;
                this.showToLoc = true;
                this.showFromEmptype = false;
                this.showLoantype = false;
                this.selectyear = true;
                this.paymode = false;
                break;
            case "salarySlips":
                this.loantype = false;
                this.showtoloantype = false;
                this.showFromSalary = false;
                this.showToSalary = false;
                this.showFromEmployee = true;
                this.showToEmployee = true;
                this.showFromDep = true;
                this.showToDep = true;
                this.showFromSec = true;
                this.showToSec = true;
                this.showFromLoc = false;
                this.showToLoc = false;
                this.showFromEmptype = false;
                this.showLoantype = false;
                this.selectyear = true;
                break;
            case "bankAdvicePermanent":
                this.loantype = false;
                this.showtoloantype = false;
                this.showFromSalary = true;
                this.showToSalary = true;
                this.showFromEmployee = true;
                this.showToEmployee = true;
                this.showFromDep = true;
                this.showToDep = true;
                this.showFromSec = true;
                this.showToSec = true;
                this.showFromLoc = true;
                this.showToLoc = true;
                this.showFromEmptype = true;
                this.showLoantype = true;
                this.selectyear = true;
                break;
            case "bankAdviceContract":
                this.loantype = false;
                this.showtoloantype = false;
                this.showFromSalary = true;
                this.showToSalary = true;
                this.showFromEmployee = true;
                this.showToEmployee = true;
                this.showFromDep = true;
                this.showToDep = true;
                this.showFromSec = true;
                this.showToSec = true;
                this.showFromLoc = true;
                this.showToLoc = true;
                this.showFromEmptype = true;
                this.showLoantype = true;
                this.selectyear = true;
                break;
            case "deductionRegister":
            case "allowanceRegister":
                this.loantype = false;
                this.showtoloantype = false;
                this.selectyear = true;
                this.showFromDep = true;
                this.showToDep = true;
                this.showFromEmployee = true;
                this.showToEmployee = true;
                this.showFromSalary = false;
                this.showToSalary = false;
                this.showFromSec = false;
                this.showToSec = false;
                this.showFromLoc = false;
                this.showToLoc = false;
                this.showFromEmptype = false;
                this.showLoantype = false;
        }


    }
}

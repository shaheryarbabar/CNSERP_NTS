import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ItemLookupTableModalComponent } from '@app/main/reports/item-lookup-finder/item-lookup-table-modal.component';
import { LocLookupTableModalComponent } from '@app/main/reports/loc-lookup-finder/loc-lookup-table-modal.component';
import { ReportviewrModalComponent } from '@app/shared/common/reportviewr-modal/reportviewr-modal.component';
import { FiscalDateService } from '@app/shared/services/fiscalDate.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';

@Component({
  selector: 'app-sale-activity-reports',
  templateUrl: './sale-activity-reports.component.html'
})
export class SaleActivityReportsComponent extends AppComponentBase {

  @ViewChild("ItemLookupTableModal", { static: true })
  ItemLookupTableModal: ItemLookupTableModalComponent;
  @ViewChild("LocLookupTableModal", { static: true })
  LocLookupTableModal: LocLookupTableModalComponent;
  @ViewChild("reportView", { static: true })
  reportView: ReportviewrModalComponent;
  activityReports: string;
  locIdlist: any;
  fromItem: any;
  toItem: any;
  type: string = "";


  showToDate: boolean = true;
  showFromDate: boolean = true;
  showToDoc: boolean = true;
  showFromDoc: boolean = true;
  showToLoc: boolean = true;
  showFromLoc: boolean = true;
  showToItem: boolean = true;
  showFromItem: boolean = true;

  fromDate: any;
  toDate: any;
  fromDoc: any;
  toDoc: any;
  fromItemName: any;
  toItemName: any;
  fromLoc: any;
  toLoc: any;
  fromLocName: any;
  toLocName: any;


  constructor(injector: Injector, private _reportService: FiscalDateService) {
    super(injector);
  }
  getReport() {
    switch (this.activityReports) {
      case "SaleOrderSummary":
        this.processReport("SaleOrderSummary");
        break;
    }
  }

  hideFields() {
    switch (this.activityReports) {
      case "SaleOrderSummary":
        this.showFromDoc = true;
        this.showToDoc = true;
        this.showFromDate = false;
        this.showToDate = false;
        this.showFromLoc = false;
        this.showToLoc = false;
        this.showFromItem = false;
        this.showToItem = false;


      // case "costsheet":
      //     this.showFromDate = false;
      //     this.showToDate = false;
      //     this.showFromDoc = true;
      //     this.showToDoc = false;
      //     this.showFromLoc = false;
      //     this.actv='disabled';
      //     this.showToLoc = false;
      //     this.showFromItem = false;
      //     this.showToItem = false;

    }
  }
  processReport(report: string) {
    debugger;
    var locstr = "";
    console.log(this.locIdlist);
    if (this.locIdlist != undefined) {
      this.locIdlist.forEach(element => {
        debugger
        locstr = locstr + element.id + ",";
      });
    }

    let repParams = "";
    switch (report) {
      case "SaleOrderSummary":

        // this.rptObj = {
        //     FromDate: new Date(this.fromDate).toLocaleDateString(),
        //     ToDate: new Date(this.toDate).toLocaleDateString(),
        //     FromDoc: this.fromDoc,
        //     ToDoc: this.toDoc,
        //     TenantId: this.appSession.tenant.id
        //     // "address":"Model Town Lahore",
        //     // "phoneNo":"123457894"
        // };
        // if (this.fromDate !== undefined)
        //     repParams +=
        //         "" + moment(this.fromDate).format("YYYY/MM/DD") + "$";
        // if (this.toDate !== undefined)
        //     repParams +=
        //         "" + moment(this.toDate).format("YYYY/MM/DD") + "$";
        debugger
        if (this.fromDoc !== undefined)
          repParams += encodeURIComponent("" + this.fromDoc) + "$";
        if (this.toDoc !== undefined)
          repParams += encodeURIComponent("" + this.toDoc) + "$";

        console.log(repParams);
        repParams = repParams.replace(/[?$]&/, "");
        break;
    }
    this.reportView.show(report, repParams);
    // localStorage.setItem("rptObj", JSON.stringify(this.rptObj));
    // localStorage.setItem("rptName", report);

    // this.route.navigateByUrl("/app/main/reports/ReportView");
  }
  openModal(type) {
    this.type = type;
    if (this.type == "fromLoc" || this.type == "toLoc")
      this.LocLookupTableModal.show();
    else if (this.type == "fromItem" || this.type == "toItem")
      this.ItemLookupTableModal.show();
  }
  getLookUpData() {
    if (this.type == "fromLoc") {
      this.fromLoc = this.LocLookupTableModal.data.locID;
      this.fromLocName = this.LocLookupTableModal.data.locName;
    } else if (this.type == "toLoc") {
      this.toLoc = this.LocLookupTableModal.data.locID;
      this.toLocName = this.LocLookupTableModal.data.locName;
    } else if (this.type == "fromItem") {
      this.fromItem = this.ItemLookupTableModal.data.itemId;
      this.fromItemName = this.ItemLookupTableModal.data.descp;
    } else if (this.type == "toItem") {
      this.toItem = this.ItemLookupTableModal.data.itemId;
      this.toItemName = this.ItemLookupTableModal.data.descp;
    }
  }
  setIdNull(type) {
    this.type = type;
    this.fromLoc = 0;
    this.toLoc = "999999";
    this.fromLocName = "";
    this.toLocName = "";
  }
  ngOnInit() {
    // this._reportService.getDate().subscribe(data => {
    //   this.fromDate = new Date(data["result"]);
    //   this.toDate = new Date();
    // });
    this.fromDoc = 0;
    this.toDoc = 99999;
    // this.fromLoc = "0";
    // this.toLoc = "99999";
    // this.fromItem = "0";
    // this.toItem = "99-999-99-9999";
    this.activityReports = "SaleOrderSummary";
  }

}

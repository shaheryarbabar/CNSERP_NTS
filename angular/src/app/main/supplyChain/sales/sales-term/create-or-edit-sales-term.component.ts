
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { CreateOrEditOETermsDto } from '../shared/dtos/salesTerm-dto';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { SaleTermserviceProxy } from '../shared/services/SaleTerm.service';
import { Paginator } from 'primeng/primeng';



@Component({
  selector: 'CreateOrEditSalesTermComponent',
  templateUrl: './create-or-edit-sales-term.component.html',

})

export class CreateOrEditSalesTermComponent extends AppComponentBase {

  @ViewChild('paginator', { static: true }) paginator: Paginator;
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  filterText = '';
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  TestDto: CreateOrEditOETermsDto = new CreateOrEditOETermsDto();

  createDate: Date;
  audtDate: Date;

  constructor(
    injector: Injector,
    private _SaleTermserviceProxy: SaleTermserviceProxy
  ) {
    super(injector);
  }

  show(id?: number): void {

    debugger;
    if (!id) {
      debugger;
      this.TestDto = new CreateOrEditOETermsDto();
      this._SaleTermserviceProxy.getMaxDocId().subscribe(res => {
        this.TestDto.termID = res["result"];
        
      });

      this.active = true;
      this.modal.show();
    } else {
      debugger;
      this._SaleTermserviceProxy.getDataForEdit(id).subscribe(result => {
        debugger;
        this.TestDto = result["oeTerms"];
        
        this.active = true;
        this.modal.show();
      });
    }
  }

  save(): void {
    this.saving = true;
    debugger;
    this.TestDto.audtDate = moment();
    this.TestDto.aUDTUSER = this.appSession.user.userName;

    if (!this.TestDto.id) {
      this.TestDto.createdDate = moment();
      this.TestDto.createdBy = this.appSession.user.userName;
  }
    this._SaleTermserviceProxy.create(this.TestDto)
      .pipe(finalize(() => { this.saving = false; }))
      .subscribe(() => {
        debugger;
        this.notify.info(this.l('SavedSuccessfully'));

        this.close();
      //this.getAll();
        this.modalSave.emit(null);
        
        
      });
  }


  // getAll(event?: LazyLoadEvent) {
  //   debugger
  //   if (this.primengTableHelper.shouldResetPaging(event)) {
  //     this.paginator.changePage(1);
  //     return;
  //   }
  //   debugger;
  //   this.primengTableHelper.showLoadingIndicator();

  //   this._SaleTermserviceProxy.getAll(
  //     this.filterText,
  //     this.primengTableHelper.getSkipCount(this.paginator, event),
  //     this.primengTableHelper.getMaxResultCount(this.paginator, event),
     
    
  //   ).subscribe(result => {
  //     debugger;
  //     this.primengTableHelper.totalRecordsCount = result.totalCount;
  //     this.primengTableHelper.records = result.items;
  //     this.primengTableHelper.hideLoadingIndicator();

  //   });
  // }

  
  // reloadPage(): void {
  //   this.paginator.changePage(this.paginator.getPage());
  // }
  

  close(): void {
    this.active = false;
    this.modal.hide();
  }
  
}


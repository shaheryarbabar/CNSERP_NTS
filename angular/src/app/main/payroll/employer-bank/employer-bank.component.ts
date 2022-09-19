import { Component, OnInit, ViewEncapsulation, ViewChild, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator, LazyLoadEvent } from 'primeng/primeng';
import * as moment from 'moment';
import { NotifyService } from 'abp-ng2-module/dist/src/notify/notify.service';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { EmployerBankService } from '../shared/services/employer-bank.service';
import { EmployerDto } from '../shared/dto/employer-dto';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateoreditemployerbankComponent } from './createoreditemployerbank.component';

@Component({
  selector: 'app-employer-bank',
  templateUrl: './employer-bank.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
 
})
export class EmployerBankComponent extends AppComponentBase {
  @ViewChild('createOrEditemployerModal', { static: true }) createOrEditemployerModal: CreateoreditemployerbankComponent;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;


  advancedFiltersAreShown = false;
  filterText = '';
  maxDesignationIDFilter: number;
  maxDesignationIDFilterEmpty: number;
  minDesignationIDFilter: number;
  minDesignationIDFilterEmpty: number;
  designationFilter = '';
  activeFilter = -1;
  createdByFilter = '';
  maxCreateDateFilter: moment.Moment;
  minCreateDateFilter: moment.Moment;
  audtUserFilter = '';
  maxAudtDateFilter: moment.Moment;
  minAudtDateFilter: moment.Moment;

  constructor(
    injector: Injector,
    private _employerService: EmployerBankService,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService
  ) {
    super(injector);
  }


  getAllEmployerBank(event?: LazyLoadEvent) {
    debugger;
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }
    this.primengTableHelper.showLoadingIndicator();

    this._employerService.getAll(
      
      this.filterText,
      this.maxDesignationIDFilter == null ? this.maxDesignationIDFilterEmpty : this.maxDesignationIDFilter,
      this.minDesignationIDFilter == null ? this.minDesignationIDFilterEmpty : this.minDesignationIDFilter,

    ).subscribe(result => {
      debugger;
      console.log(result);
      this.primengTableHelper.totalRecordsCount = result.totalCount;
      this.primengTableHelper.records = result.items;
      this.primengTableHelper.hideLoadingIndicator();
    });
  }
  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  createEmployerBank(): void {
    this.createOrEditemployerModal.show(null);
  }

  deleteDesignation(designation: EmployerDto): void {
    debugger;
    this.message.confirm(
      '',
      (isConfirmed) => {
        if (isConfirmed) {
          this._employerService.delete(designation.id)
            .subscribe(() => {
              debugger;
              this.reloadPage();
              this.notify.success(this.l('SuccessfullyDeleted'));
            });
        }
      }
    );
  }

}

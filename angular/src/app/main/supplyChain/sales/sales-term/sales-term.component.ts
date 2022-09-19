
import { Component, ViewEncapsulation, ViewChild, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';

import { AppComponentBase } from '@shared/common/app-component-base';
import { SaleTermserviceProxy } from '../shared/services/SaleTerm.service';
import { CreateOrEditSalesTermComponent} from './create-or-edit-sales-term.component';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
//import {  } from 'primeng/components/paginator/paginator';

@Component({
  selector: 'app-sales-term',
  templateUrl: './sales-term.component.html',
  animations: [appModuleAnimation()],
})

export class SalesTermComponent extends AppComponentBase {

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
 
 @ViewChild('createOrEditModal',{static: true}) createOrEditModal: CreateOrEditSalesTermComponent;
  filterText = '';
 constructor(
    injector: Injector,
    private _testService: SaleTermserviceProxy,
  ) 
  {
    super(injector);
  }

  delete(id:any){
     this._testService.delete(id).subscribe(d=>{

      this.notify.success("Record Deleted.");
      this.getAll();
     })
  }

  getAll(event?: LazyLoadEvent) {
    debugger
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }
    debugger;
    this.primengTableHelper.showLoadingIndicator();


    
    this._testService.getAll(
      this.filterText,
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event),
     
    
    ).subscribe(result => {
      debugger;
      this.primengTableHelper.totalRecordsCount = result.totalCount;
      this.primengTableHelper.records = result.items;
      this.primengTableHelper.hideLoadingIndicator();

    });
  }
  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }
  ngOnInit() {
  }
  Create(){
    debugger;
    this.createOrEditModal.show(undefined);
   }
}

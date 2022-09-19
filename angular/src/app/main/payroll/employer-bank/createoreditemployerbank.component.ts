import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { EmployerBankService } from '../shared/services/employer-bank.service';
import { EmployerDto } from '../shared/dto/employer-dto';

@Component({
  selector: 'app-createoreditemployerbank',
  templateUrl: './createoreditemployerbank.component.html',
  
})
export class CreateoreditemployerbankComponent extends AppComponentBase {

  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  employerdto: EmployerDto = new EmployerDto();

  createDate: Date;
  audtDate: Date;
  constructor(
    injector: Injector,
    private _employerService: EmployerBankService
) {
    super(injector);
}
  

  ngOnInit() {
  }
  show(id?: number): void {

    debugger;
    if (!id) {
        debugger;
        this.employerdto = new EmployerDto();
       
        this.active = true;
        this.modal.show();
    } else {
        debugger;
        this._employerService.getDataForEdit(id).subscribe(result => {
            debugger;
            this.employerdto = result["employerBank"];
  
            this.active = true;
            this.modal.show();
        });
    }
  }
  save(): void {
    this.saving = true;
    debugger;
   
    this._employerService.create(this.employerdto)

        .pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
            debugger;
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
            this.modalSave.emit(null);
        });
        
  }
  
  close(): void {
    this.active = false;
    this.modal.hide();
  }

}

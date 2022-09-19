import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SubCostCenterDto } from '../shared/dto/subCostCenter-dto';



@Component({
    selector: 'viewSubCostCenterModal',
    templateUrl: './view-subCostCenter-modal.component.html'
})
export class ViewSubCostCenterComponent extends AppComponentBase {

    @ViewChild('viewSubCostCenterModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: SubCostCenterDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new SubCostCenterDto();
    }

    show(item: SubCostCenterDto): void {
        this.item = item["subCostCenter"];
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

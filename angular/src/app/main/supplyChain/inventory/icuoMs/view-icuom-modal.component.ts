import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ICUOMDto } from '../shared/dto/ic-uoms-dto';

@Component({
    selector: 'viewICUOMModal',
    templateUrl: './view-icuom-modal.component.html'
})
export class ViewICUOMModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: ICUOMDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new ICUOMDto();
    }

    show(item: ICUOMDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}

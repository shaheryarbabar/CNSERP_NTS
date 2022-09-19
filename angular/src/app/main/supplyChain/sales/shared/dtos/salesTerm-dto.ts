import * as moment from 'moment';
export class CreateOrEditOETermsDto {
    id: number;
    termID: number | null;
    termDesc: string;
    termDays: number | null;
    active: boolean;
    aUDTUSER: string;
    audtDate: moment.Moment | undefined;
    createdBy: string;
    createdDate: moment.Moment | undefined;
    
}
export interface GetOETermsForEditOutput {
    oETerms: CreateOrEditOETermsDto;
}

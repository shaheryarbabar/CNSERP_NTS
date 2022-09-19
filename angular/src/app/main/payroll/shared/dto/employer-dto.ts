export class EmployerDto {
    id:number;
    tenantId:number;
    eBankID	: number;  
    eBankName: string;
    eBankAccNumber:string;
     eBranchID:string;
    active:boolean;
}
export class GetcaderDToOutput {
    employerDTo: EmployerDto
}

export class PagedResultDtocader {
    totalCount: number;
    items: GetcaderDToOutput[]
}
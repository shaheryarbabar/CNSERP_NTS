import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { CreateOrEditAccountSubLedgerDto, API_BASE_URL } from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { map } from "rxjs/operators";
import { ledgerMappDto } from "../dto/ledgerMapp-dto";
import { voRevdto } from "../dto/voRev-dto";


@Injectable({
    providedIn: "root",
})
export class voRevservices {
    private baseUrl: string;
    protected jsonParseReviver:
        | ((key: string, value: any) => any)
        | undefined = undefined;
    constructor(
        private http: HttpClient,
        @Optional() @Inject(API_BASE_URL) baseUrl?: string
    ) {
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    url: string = "";

    // processReversalVoucher(
    //     detID: number | null | undefined,
    //     bookId: string | null | undefined,
    //     newFmtDocNo: number | null | undefined,
    //     newDocNo: number | null | undefined,
    //     newDocMonth: any | null | undefined,
    //     newDocDate: any | null | undefined,
        
    // )
    processReversalVoucher(dto: voRevdto
        
    ){
        debugger;
        this.url = this.baseUrl;
        this.url += "/api/services/app/GLDocRev/Process";
        return this.http.post(this.url, dto); 
    }
    getAll(
        filter: string,
       sorting: string | null | undefined,
       skipCount: number | null | undefined,
       maxResultCount: number | null | undefined
       ) 
      {
       debugger;
       this.url = this.baseUrl;
       this.url += "/api/services/app/GLDocRev/GetAll?";
       this.url += "Filter=" + encodeURIComponent("" + filter) + "&";
       if (sorting !== undefined)
           this.url += "Sorting=" + encodeURIComponent("" + sorting) + "&";
       if (skipCount !== undefined)
           this.url += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
       if (maxResultCount !== undefined)
           this.url += "MaxResultCount=" + encodeURIComponent("" + maxResultCount);
      
       this.url = this.url.replace(/[?&]$/, "");
       return this.http.get(this.url).pipe(map((response: any) => {
           debugger
           return response["result"];
       }));
      }
    
    delete(id: number) {
        debugger
        this.url = this.baseUrl;
        this.url += "/api/services/app/GLDocRev/Delete?Id=" + id;
        return this.http.delete(this.url);
    }

    create(dto: voRevdto) {
        debugger;
        this.url = this.baseUrl;
        this.url += "/api/services/app/GLDocRev/CreateOrEdit";
        return this.http.post(this.url, dto);
    }
    getDocNo(){
        debugger
       this.url=this.baseUrl;
       this.url+="/api/services/app/GLDocRev/GetDocNo";
       this.url = this.url.replace(/[?&]$/, "");
       return this.http.get(this.url).pipe(map((response: any) => {
           return response["result"];
       }));     
   }
   getAllSubAcc(slType: number | null | undefined) 
   {
    debugger;
    this.url = this.baseUrl;
    this.url += "/api/services/app/GLDocRev/GetSubAcc?";      
    if (slType != undefined)
    this.url += "slType=" + encodeURIComponent("" + slType) + "&";  
    this.url = this.url.replace(/[?&]$/, "");
    return this.http.get(this.url).pipe(map((response: any) => {
        debugger
        return response["result"];
    }));
   }
    getDataForEdit(id: number) {
        debugger
        this.url = this.baseUrl;
        this.url += "/api/services/app/GLDocRev/GetGLDocRevForEdit?Id=" + id;
        return this.http.get(this.url).pipe(map((response: any) => {
           
            return response["result"] ;
        }));
    }
    ProcessSubAcc(dto:Array<ledgerMappDto>
        
        ){
            debugger;
            this.url = this.baseUrl;
            this.url += "/api/services/app/GLDocRev/ProcessSubAcc";
            return this.http.post(this.url, dto); 
        }
  
    
}
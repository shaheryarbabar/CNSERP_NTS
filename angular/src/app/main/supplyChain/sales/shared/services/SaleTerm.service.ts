import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { API_BASE_URL } from "@shared/service-proxies/service-proxies";
import { map } from "rxjs/operators";

import { CreateOrEditOETermsDto, GetOETermsForEditOutput } from "../dtos/salesTerm-dto";
@Injectable({
    providedIn: "root",
})
export class SaleTermserviceProxy {
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

    getAll(
        filter: string,
        sorting: number | null | undefined,
        skipCount: number | null | undefined,
       ) 
       {
        debugger;
        this.url = this.baseUrl;
        this.url += "/api/services/app/OETerms/GetAll?";
        this.url += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (sorting !== undefined)
            this.url += "MaxSalaryMonthFilter=" + encodeURIComponent("" + sorting) + "&";
        if (skipCount !== undefined)
            this.url += "MaxSalaryYearFilter=" + encodeURIComponent("" + skipCount) + "&";
        this.url = this.url.replace(/[?&]$/, "");
        return this.http.get(this.url).pipe(map((response: any) => {
            console.log(response);
            return response["result"] ;
        }));
    }
    
    delete(id: number) {
        debugger
        this.url = this.baseUrl;
        this.url += "/api/services/app/OETerms/Delete?Id=" + id;
        return this.http.delete(this.url);
    }

    create(dto: CreateOrEditOETermsDto) {
        debugger;
        this.url = this.baseUrl;
        this.url += "/api/services/app/OETerms/CreateOrEdit";
        return this.http.post(this.url, dto);
    }

    // getDataForEdit(id: number) {
    //     debugger;
    //     this.url = this.baseUrl;
    //     this.url += "/api/services/app/OETerms/GetOETermsForEdit?Id=" + id;
    //     return this.http.get(this.url).pipe(map((response: any) => {
           
    //         return response["result"] ;
    //     }));
    // }
    getDataForEdit(id: number) {
        this.url = this.baseUrl;
        this.url += "/api/services/app/OETerms/GetOETermsForEdit?Id=" + id;
        return this.http.get(this.url).pipe(map((response: any) => {
          debugger
          return response["result"] as GetOETermsForEditOutput;
        }));
      }
    getMaxDocId() {
        debugger
        this.url = this.baseUrl;
        this.url += "/api/services/app/OETerms/GetmaxDocNo";
        this.url = this.url.replace(/[?&]$/, "");
        return this.http.request("get", this.url)
      }
}
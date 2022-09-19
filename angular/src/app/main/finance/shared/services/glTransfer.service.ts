import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, FileDto, throwException } from "@shared/service-proxies/service-proxies";
import { GetGLTransferForViewDto, CreateOrEditGLTransferDto, PagedResultDtoOfGetGLTransferForViewDto, GetGLTransferForEditOutput } from '../dto/glTransfer-dto';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class GLTransferServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;


    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {

        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
    * @param filter (optional) 
    * @param maxDocIDFilter (optional) 
    * @param minDocIDFilter (optional) 
    * @param maxDocDateFilter (optional) 
    * @param minDocDateFilter (optional) 
    * @param audtUserFilter (optional) 
    * @param maxAudtDateFilter (optional) 
    * @param minAudtDateFilter (optional) 
    * @param createdByFilter (optional) 
    * @param maxCreateDateFilter (optional) 
    * @param minCreateDateFilter (optional)  
    * @param sorting (optional) 
    * @param skipCount (optional) 
    * @param maxResultCount (optional) 
    * @return Success
    */
    getAll(filter: string | null | undefined, maxDocIDFilter: number | null | undefined, minDocIDFilter: number | null | undefined,
        maxDocDateFilter: moment.Moment | null | undefined,minDocDateFilter: moment.Moment | null | undefined,audtUserFilter: string | null | undefined,
        maxAudtDateFilter: moment.Moment | null | undefined, minAudtDateFilter: moment.Moment | null | undefined, createdByFilter: string | null | undefined,
        maxCreateDateFilter: moment.Moment | null | undefined, minCreateDateFilter: moment.Moment | null | undefined, sorting: string | null | undefined,
        skipCount: number | null | undefined, maxResultCount: number | null | undefined): Observable<PagedResultDtoOfGetGLTransferForViewDto> {
        debugger;
        let url_ = this.baseUrl + "/api/services/app/GLTransfer/GetAll?";

        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (maxDocIDFilter !== undefined)
            url_ += "maxDocIDFilter=" + encodeURIComponent("" + maxDocIDFilter) + "&";
        if (minDocIDFilter !== undefined)
            url_ += "MinDocIDFilter=" + encodeURIComponent("" + minDocIDFilter) + "&";
        if (maxDocDateFilter !== undefined)
            url_ += "maxDocDateFilter=" + encodeURIComponent(maxDocDateFilter ? "" + maxDocDateFilter.toJSON() : "") + "&";
        if (minDocDateFilter !== undefined)
            url_ += "MinDocDateFilter=" + encodeURIComponent(minDocDateFilter ? "" + minDocDateFilter.toJSON() : "") + "&";
        if (audtUserFilter !== undefined)
            url_ += "AudtUserFilter=" + encodeURIComponent("" + audtUserFilter) + "&";
        if (maxAudtDateFilter !== undefined)
            url_ += "MaxAudtDateFilter=" + encodeURIComponent(maxAudtDateFilter ? "" + maxAudtDateFilter.toJSON() : "") + "&";
        if (minAudtDateFilter !== undefined)
            url_ += "MinAudtDateFilter=" + encodeURIComponent(minAudtDateFilter ? "" + minAudtDateFilter.toJSON() : "") + "&";
        if (createdByFilter !== undefined)
            url_ += "CreatedByFilter=" + encodeURIComponent("" + createdByFilter) + "&";
        if (maxCreateDateFilter !== undefined)
            url_ += "MaxCreateDateFilter=" + encodeURIComponent(maxCreateDateFilter ? "" + maxCreateDateFilter.toJSON() : "") + "&";
        if (minCreateDateFilter !== undefined)
            url_ += "MinCreateDateFilter=" + encodeURIComponent(minCreateDateFilter ? "" + minCreateDateFilter.toJSON() : "") + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
        if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            debugger;
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {

                    return this.processGetAll(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfGetGLTransferForViewDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfGetGLTransferForViewDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfGetGLTransferForViewDto> {
        debugger;
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? PagedResultDtoOfGetGLTransferForViewDto.fromJS(resultData200) : new PagedResultDtoOfGetGLTransferForViewDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfGetGLTransferForViewDto>(<any>null);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    GetGLTransferForView(id: number | null | undefined): Observable<GetGLTransferForViewDto> {
        let url_ = this.baseUrl + "/api/services/app/GLTransfer/GetGLTransferForView?";
        if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetGLTransferForView(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetGLTransferForView(<any>response_);
                } catch (e) {
                    return <Observable<GetGLTransferForViewDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetGLTransferForViewDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetGLTransferForView(response: HttpResponseBase): Observable<GetGLTransferForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? GetGLTransferForViewDto.fromJS(resultData200) : new GetGLTransferForViewDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetGLTransferForViewDto>(<any>null);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    getGLTransferForEdit(id: number | null | undefined): Observable<GetGLTransferForEditOutput> {
        debugger;
        let url_ = this.baseUrl + "/api/services/app/GLTransfer/GetGLTransferForEdit?";
        if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {

            return this.processGetGLTransferForEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {

                    return this.processGetGLTransferForEdit(<any>response_);
                } catch (e) {
                    return <Observable<GetGLTransferForEditOutput>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetGLTransferForEditOutput>><any>_observableThrow(response_);
        }));
    }

    protected processGetGLTransferForEdit(response: HttpResponseBase): Observable<GetGLTransferForEditOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? GetGLTransferForEditOutput.fromJS(resultData200) : new GetGLTransferForEditOutput();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetGLTransferForEditOutput>(<any>null);
    }

    /**
     * @param input (optional) 
     * @return Success
     */
    createOrEdit(input: CreateOrEditGLTransferDto | null | undefined): Observable<void> {
        debugger;
        let url_ = this.baseUrl + "/api/services/app/GLTransfer/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(input);

        let options_: any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrEdit(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
        debugger;
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return _observableOf<void>(<any>null);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    delete(id: number | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/GLTransfer/Delete?";
        if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_: any) => {
            debugger;
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        debugger;
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return _observableOf<void>(<any>null);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }

    /**
    * @param filter (optional) 
    * @param maxDocIDFilter (optional) 
    * @param minDocIDFilter (optional) 
    * @param maxDocDateFilter (optional) 
    * @param minDocDateFilter (optional) 
    * @param audtUserFilter (optional) 
    * @param maxAudtDateFilter (optional) 
    * @param minAudtDateFilter (optional) 
    * @param createdByFilter (optional) 
    * @param maxCreateDateFilter (optional) 
    * @param minCreateDateFilter (optional)  
    * @return Success
    */
    GetGLTransferToExcel(filter: string | null | undefined, maxDocIDFilter: number | null | undefined, minDocIDFilter: number | null | undefined,
        maxDocDateFilter: moment.Moment | null | undefined,minDocDateFilter: moment.Moment | null | undefined,audtUserFilter: string | null | undefined,
        maxAudtDateFilter: moment.Moment | null | undefined, minAudtDateFilter: moment.Moment | null | undefined, createdByFilter: string | null | undefined,
        maxCreateDateFilter: moment.Moment | null | undefined, minCreateDateFilter: moment.Moment | null | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/GLTransfer/GetGLTransferToExcel?";
        if (filter !== undefined)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (maxDocIDFilter !== undefined)
            url_ += "maxDocIDFilter=" + encodeURIComponent("" + maxDocIDFilter) + "&";
        if (minDocIDFilter !== undefined)
            url_ += "MinDocIDFilter=" + encodeURIComponent("" + minDocIDFilter) + "&";
        if (maxDocDateFilter !== undefined)
            url_ += "maxDocDateFilter=" + encodeURIComponent(maxDocDateFilter ? "" + maxDocDateFilter.toJSON() : "") + "&";
        if (minDocDateFilter !== undefined)
            url_ += "MinDocDateFilter=" + encodeURIComponent(minDocDateFilter ? "" + minDocDateFilter.toJSON() : "") + "&";
        if (audtUserFilter !== undefined)
            url_ += "AudtUserFilter=" + encodeURIComponent("" + audtUserFilter) + "&";
        if (maxAudtDateFilter !== undefined)
            url_ += "MaxAudtDateFilter=" + encodeURIComponent(maxAudtDateFilter ? "" + maxAudtDateFilter.toJSON() : "") + "&";
        if (minAudtDateFilter !== undefined)
            url_ += "MinAudtDateFilter=" + encodeURIComponent(minAudtDateFilter ? "" + minAudtDateFilter.toJSON() : "") + "&";
        if (createdByFilter !== undefined)
            url_ += "CreatedByFilter=" + encodeURIComponent("" + createdByFilter) + "&";
        if (maxCreateDateFilter !== undefined)
            url_ += "MaxCreateDateFilter=" + encodeURIComponent(maxCreateDateFilter ? "" + maxCreateDateFilter.toJSON() : "") + "&";
        if (minCreateDateFilter !== undefined)
            url_ += "MinCreateDateFilter=" + encodeURIComponent(minCreateDateFilter ? "" + minCreateDateFilter.toJSON() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetGLTransferToExcel(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetGLTransferToExcel(<any>response_);
                } catch (e) {
                    return <Observable<FileDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<FileDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetGLTransferToExcel(response: HttpResponseBase): Observable<FileDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? FileDto.fromJS(resultData200) : new FileDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<FileDto>(<any>null);
    }
    getMaxGLTransferId(): Observable<number> {
        debugger;
        let url_ = this.baseUrl + "/api/services/app/GLTransfer/GetMaxID";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetMaxGLTransferId(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetMaxGLTransferId(<any>response_);
                } catch (e) {
                    return <Observable<number>><any>_observableThrow(e);
                }
            } else
                return <Observable<number>><any>_observableThrow(response_);
        }));
    }

    protected processGetMaxGLTransferId(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<number>(<any>null);
    }

    
    getChartOfAccountName(accID: string, type: string): Observable<string> {
        let url_ = this.baseUrl + "/api/services/app/GLTransfer/GetChartOfAccountName?";
        if (accID !== undefined)
            url_ += "accID=" + encodeURIComponent("" + accID) + "&";
        if (type !== undefined)
            url_ += "type=" + encodeURIComponent("" + type) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processgetChartOfAccountName(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processgetChartOfAccountName(<any>response_);
                } catch (e) {
                    return <Observable<string>><any>_observableThrow(e);
                }
            } else
                return <Observable<string>><any>_observableThrow(response_);
        }));
    }

    protected processgetChartOfAccountName(response: HttpResponseBase): Observable<string> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<string>(<any>null);
    }

    getLocationName(locID: number, type: string): Observable<string> {
        let url_ = this.baseUrl + "/api/services/app/GLTransfer/GetLocationName?";
        if (locID !== undefined)
            url_ += "locID=" + encodeURIComponent("" + locID) + "&";
        if (type !== undefined)
            url_ += "type=" + encodeURIComponent("" + type) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processgetLocationName(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processgetLocationName(<any>response_);
                } catch (e) {
                    return <Observable<string>><any>_observableThrow(e);
                }
            } else
                return <Observable<string>><any>_observableThrow(response_);
        }));
    }

    protected processgetLocationName(response: HttpResponseBase): Observable<string> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<string>(<any>null);
    }

    getBankName(bankID: string, type: string): Observable<string> {
        let url_ = this.baseUrl + "/api/services/app/GLTransfer/GetBankName?";
        if (bankID !== undefined)
            url_ += "bankID=" + encodeURIComponent("" + bankID) + "&";
        if (type !== undefined)
            url_ += "type=" + encodeURIComponent("" + type) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processgetBankName(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processgetBankName(<any>response_);
                } catch (e) {
                    return <Observable<string>><any>_observableThrow(e);
                }
            } else
                return <Observable<string>><any>_observableThrow(response_);
        }));
    }

    protected processgetBankName(response: HttpResponseBase): Observable<string> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<string>(<any>null);
    }

}
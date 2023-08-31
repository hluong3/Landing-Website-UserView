import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IOffering } from "../models/offering";

@Injectable({
  providedIn: "root",
})
export class OfferingService {
  API_URL = environment.API_URL;
  Ocp_Apim_Subscription_Key = environment.Ocp_Apim_Subscription_Key;
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers = this.headers.set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
    this.headers = this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers = this.headers.append(
      "Ocp-Apim-Subscription-Key",
      this.Ocp_Apim_Subscription_Key
    );
  }

  // async getAllRuleData(isRequest = false) {
  //   let url: string = environment.API_URL + 'rules?timestamp='+ new Date().getTime();
  //   isRequest && (url += '&type=request');
  //   return axios.get(url,
  //     { 'headers': { 'Ocp-Apim-Subscription-Key': environment.Ocp_Apim_Subscription_Key } }
  //   ).catch( (error) => {
  //     return Promise.reject(error)
  //   });
  // }

  getOfferingList(id: string): Observable<IOffering> {
    return this.http
      .get<IOffering>(this.API_URL + "/offering/" + id, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  getOfferingMenuList(id: string): Observable<IOffering> {
    return this.http
      .get<IOffering>(
        this.API_URL + `/offering-submenu-list/${id}/offering-menu-item`,
        {
          headers: this.headers,
        }
      )
      .pipe(catchError(this.errorHandler));
  }

  handleDownload(link: any) {
    return this.http
      .get(link?.changingThisBreaksApplicationSecurity, {
        headers: this.headers,
        responseType: "blob" as "json",
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  getFileExtension(filename: string) {
    return this.http
      .get(this.API_URL + "/attachment/info?filename=" + filename, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server error");
  }
}

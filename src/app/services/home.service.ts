import { IHomeRightMenu } from "./../models/home";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { IHomeOffering, IHomeSetting } from "../models/home";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HomeService {
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

  getOfferingList(): Observable<IHomeOffering[]> {
    return this.http
      .get<IHomeOffering[]>(this.API_URL + "/offering", {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }

  getHomeSetting(): Observable<IHomeSetting> {
    return this.http
      .get<IHomeSetting>(
        this.API_URL + "/setting/search?type=home_header_banner",
        {
          headers: this.headers,
        }
      )
      .pipe(catchError(this.errorHandler));
  }
  getHomeRightMenu(): Observable<IHomeRightMenu[]> {
    return this.http
      .get<IHomeRightMenu[]>(
        this.API_URL + "/setting/search?type=home_right_menu",
        {
          headers: this.headers,
        }
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server error");
  }
}

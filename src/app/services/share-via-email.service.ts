import { IShareInfor, IShareVideo } from "./../models/share-infor";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IEvent } from "../models/event";

@Injectable({
  providedIn: "root",
})
export class ShareViaEmailService {
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
  postShareEmailEvent(data: IShareInfor): Observable<IShareInfor> {
    return this.http
      .post<IShareInfor>(this.API_URL + "/email/share-with?type=ics", data, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  postShareEmailVideo(data: IShareVideo): Observable<IShareVideo> {
    return this.http
      .post<IShareVideo>(this.API_URL + "/email/share-with?type=video", data, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server error");
  }
}

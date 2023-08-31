import { IEvent } from "./../models/event";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CalendarService {
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

  getCalendarList(): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>(this.API_URL + "/calendar", {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  getCalendarByType(type: string, id: string): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>(this.API_URL + `/calendar/filter?type=${type}&id=${id}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  getRegions(): Observable<any> {
    return this.http
      .get(this.API_URL + "/region", {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  getCalendarByMonth(month: string, year: string): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>(
        this.API_URL + `/calendar/search?month=${month}&year=${year}`,
        {
          headers: this.headers,
        }
      )
      .pipe(catchError(this.errorHandler));
  }
  getAnotations(): Observable<any> {
    return this.http
      .get<any>(this.API_URL + "/calendar-category", {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server error");
  }
}

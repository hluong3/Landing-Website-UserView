import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IEvent } from "../models/event";
import { IHomeRightMenu, IHomeSetting } from "../models/home";
@Injectable({
  providedIn: "root",
})
export class TrainingService {
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
  getTrainingCategory(): Observable<any> {
    return this.http
      .get(this.API_URL + "/training-category", {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  getTrainingRightMenu(): Observable<IHomeRightMenu[]> {
    return this.http
      .get<IHomeRightMenu[]>(
        this.API_URL + "/setting/search?type=training_right_menu",
        {
          headers: this.headers,
        }
      )
      .pipe(catchError(this.errorHandler));
  }
  getTrainingSetting(): Observable<IHomeSetting> {
    return this.http
      .get<IHomeSetting>(
        this.API_URL + "/setting/search?type=training_header_banner",
        {
          headers: this.headers,
        }
      )
      .pipe(catchError(this.errorHandler));
  }

  getTrainingAnnoucement(type: string): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>(this.API_URL + `/calendar/training?type=${type}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  getTrainingCalendar(month: number, year: number): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>(
        this.API_URL + `/calendar/training?month=${month}&year=${year}`,
        {
          headers: this.headers,
        }
      )
      .pipe(catchError(this.errorHandler));
  }
  getOfferingEvents(id: string): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>(this.API_URL + `/calendar/training/offering/${id}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  getTrainingList(type: string): Observable<any> {
    return this.http
      .get(this.API_URL + `/${type}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server error");
  }
}

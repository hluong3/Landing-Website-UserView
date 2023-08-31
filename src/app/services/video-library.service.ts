import { IShareInfor } from "./../models/share-infor";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IMWVideoItem } from "../models/video-item";
import { IHomeOffering, IHomeRightMenu, IHomeSetting } from "../models/home";
@Injectable({
  providedIn: "root",
})
export class VideoLibraryService {
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
  getVideoMWCategory(): Observable<IMWVideoItem[]> {
    return this.http
      .get<IMWVideoItem[]>(this.API_URL + "/mw-subcategory", {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  getOfferingList(): Observable<IHomeOffering[]> {
    return this.http
      .get<IHomeOffering[]>(this.API_URL + "/offering", {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  getVideosList(id: string): Observable<any> {
    return this.http
      .get<any>(this.API_URL + `/video-library/category/${id}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  getOfferingVideoList(id: string): Observable<any> {
    return this.http
      .get<any>(this.API_URL + `/video-library/offering/${id}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }
  getVideoLibraryBanner(): Observable<IHomeSetting> {
    return this.http
      .get<IHomeSetting>(
        this.API_URL + `/setting/search?type=video_library_header_banner`,
        {
          headers: this.headers,
        }
      )
      .pipe(catchError(this.errorHandler));
  }
  getVideoRightMenu(): Observable<any> {
    return this.http
      .get<any>(
        this.API_URL + "/setting/search?type=video_library_right_menu",
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

import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ShareService {
  timeZoneSelected = new EventEmitter<String>();
}

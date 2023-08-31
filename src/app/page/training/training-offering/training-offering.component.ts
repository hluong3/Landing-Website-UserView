import { environment } from "src/environments/environment";
import { IOffering } from "./../../../models/offering";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { HomeService } from "src/app/services/home.service";
import { IHomeOffering } from "src/app/models/home";

@Component({
  selector: "app-training-offering",
  templateUrl: "./training-offering.component.html",
  styleUrls: ["./training-offering.component.scss"],
})
export class TrainingOfferingComponent implements OnInit {
  API_URL = environment.API_URL;
  offerings: IHomeOffering[] = [];
  constructor(
    private _router: Router,
    private _homeService: HomeService,
    private _sanitizer: DomSanitizer
  ) {}
  loading = false;
  ngOnInit(): void {
    this.loading = true;
    this._homeService.getOfferingList().subscribe((data) => {
      this.loading = false;
      this.offerings = data;
    });
  }

  trustImage(thumbnail: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      thumbnail ? this.API_URL + "/attachment?filename=" + thumbnail : ""
    );
  }
}

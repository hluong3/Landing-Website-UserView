import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { OfferingService } from "src/app/services/offering.service";
import { environment } from "src/environments/environment";
import { IOffering } from "../../models/offering";

@Component({
  selector: "app-offering",
  templateUrl: "./offering.component.html",
  styleUrls: ["./offering.component.scss"],
})
export class OfferingComponent implements OnInit {
  API_URL = environment.API_URL;
  id: string;
  offering: IOffering;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _offeringService: OfferingService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.id = this._route.snapshot.paramMap.get("id");
    this._offeringService.getOfferingList(this.id).subscribe(
      (data) => {
        this.offering = data;
      },
      (error) => console.log(error)
    );
  }
  trustImage(thumbnail: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      thumbnail ? this.API_URL + "/attachment?filename=" + thumbnail : ""
    );
  }
  naviage(list: any) {
    this._router.navigateByUrl("presentation1", list);
  }
}

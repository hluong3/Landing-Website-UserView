import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { IHomeRightMenu } from "src/app/models/home";
import { HomeService } from "src/app/services/home.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
})
export class TeamComponent implements OnInit {
  API_URL = environment.API_URL;
  public offeringList = [];
  public errorMsg = "";
  public showOffering = false;

  sidebarMenu: IHomeRightMenu[] = [];
  constructor(
    private _sanitizer: DomSanitizer,
    private _homeService: HomeService
  ) {}

  ngOnInit(): void {
    this._homeService.getOfferingList().subscribe(
      (data) => {
        this.offeringList = data;
        this.showOffering = true;
      },
      (error) => (this.errorMsg = error)
    );

    this._homeService.getHomeRightMenu().subscribe(
      (data: any) =>
        (this.sidebarMenu = (data?.menu as IHomeRightMenu[]) || []),
      (error) => (this.errorMsg = error)
    );
  }

  trustImage(thumbnail: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      thumbnail ? this.API_URL + "/attachment?filename=" + thumbnail : ""
    );
  }
}

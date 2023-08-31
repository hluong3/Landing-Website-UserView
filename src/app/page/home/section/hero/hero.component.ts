import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { HomeService } from "src/app/services/home.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.scss"],
})
export class HeroComponent implements OnInit {
  public settingBanner;
  public errorMsg = "";
  public showBanner = true;
  API_URL = environment.API_URL;
  constructor(
    private _sanitizer: DomSanitizer,
    private _homeService: HomeService
  ) {}

  ngOnInit(): void {
    this._homeService.getHomeSetting().subscribe(
      (data) => {
        this.settingBanner = data;
        this.settingBanner.image = data.image ?? "assets/img/Training.jpg";
        this.settingBanner.title =
          data.title ?? "Reinvent the workplace experience";
        this.settingBanner.description =
          data.description ??
          "Put the employee experience first to achieve new levels of productivity, engagement and collaboration, and help win the war for talent";
      },
      (error) => (this.errorMsg = error)
    );
  }

  trustImage(thumbnail: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      thumbnail ? this.API_URL + "/attachment?filename=" + thumbnail : ""
    );
  }
}

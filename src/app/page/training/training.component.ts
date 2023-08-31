import { filter } from 'rxjs/operators';
import { IHomeRightMenu, IHomeSetting } from "./../../models/home";
import { TrainingService } from "./../../services/training.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "src/environments/environment";

export interface ITrainingVideo {
  id: string;
  name: string;
  description: string;
  url: string;
  thumbnail: string;
  type?: string;
  isDefault?: boolean;
  filer?: string;
}

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.scss"],
})
export class TrainingComponent implements OnInit {
  videos: ITrainingVideo[] = [];
  API_URL: string = environment.API_URL;
  banner: IHomeSetting = {
    type: "training",
    title: "",
    description: "",
    image: "",
  };
  rightMenu: IHomeRightMenu[] = [
    {
      id: "",
      name: "",
      type: "",
      link: "",
      shortDescription: "",
      isDefault: true,
    },
  ];
  isLocal = false;
  constructor(
    private _router: Router,
    private _trainingService: TrainingService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this._trainingService.getTrainingCategory().subscribe(
      (data: any) => {
        // DISABLE Product Enablement Training
        this.videos = data.filter((x) => x.name !== "Product Enablement Training");
      },
      (error) => {
        console.log(error);
      }
    );
    this._trainingService.getTrainingSetting().subscribe(
      (data: any) => {
        this.banner = data;
        this.banner.image = data.image ?? "assets/img/Training.jpg";
        this.banner.title = data.title ?? "Modern Workplace Training";
        this.banner.description =
          data.description ??
          "Put the employee experience first to achieve new levels of productivity, engagement and collaboration, and help win the war for talent.";
      },
      (error) => {
        console.log(error);
      }
    );
    this._trainingService.getTrainingRightMenu().subscribe(
      (data: any) => {
        this.rightMenu = data.menu.map((item) => {
          item.typeFilter = "";
          if (item.name === "Partner Training") {
            item.typeFilter = "partner";
          } else if (item.name === "Vendor Training") {
            item.typeFilter = "vendor";
          }
          return { ...item };
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openPartnerList() {
    this._router.navigate(["training/training-list"], {
      queryParams: {
        type: "partner",
      },
    });
  }
  trustImage(thumbnail: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      thumbnail ? this.API_URL + "/attachment?filename=" + thumbnail : ""
    );
  }
}

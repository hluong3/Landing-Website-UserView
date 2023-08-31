import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { TrainingService } from "src/app/services/training.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-training-list",
  templateUrl: "./training-list.component.html",
  styleUrls: ["./training-list.component.scss"],
})
export class TrainingListComponent implements OnInit {
  API_URL = environment.API_URL;
  type = "";
  data = [];
  constructor(
    private _route: ActivatedRoute,
    private _trainingService: TrainingService,
    private _sanitizer: DomSanitizer
  ) {
    this._route.queryParamMap.subscribe((params) => {
      this.type = params.get("type");
    });
  }
  ngOnInit(): void {
    this._trainingService.getTrainingList(this.type).subscribe((data: any) => {
      this.data = data;
    });
  }
  trustImage(thumbnail: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      thumbnail ? this.API_URL + "/attachment?filename=" + thumbnail : ""
    );
  }
}

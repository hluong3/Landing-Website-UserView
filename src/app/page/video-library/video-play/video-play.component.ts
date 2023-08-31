import { ActivatedRoute } from "@angular/router";
import { environment } from "./../../../../environments/environment";
import { Component, OnInit } from "@angular/core";
import { IVideoItem } from "src/app/models/video-item";
import videoJsOptions from "src/app/video-player/basic-video-play-option";
import { Location } from "@angular/common";
@Component({
  selector: "app-video-play",
  templateUrl: "./video-play.component.html",
  styleUrls: ["./video-play.component.scss"],
})
export class VideoPlayComponent implements OnInit {
  API_URL = environment.API_URL;
  videoPlayerOption = videoJsOptions;
  video = {};
  constructor(private _route: ActivatedRoute, private _location: Location) {
    this.videoPlayerOption.width = "1080px";
    this.videoPlayerOption.height = "640px";
  }

  ngOnInit(): void {
    this.videoPlayerOption.autoplay = false;
    this._route.queryParamMap.subscribe(
      (params) => {
        let link = params.get("link");
        if (link.startsWith("/")) link = link.substring(1);
        this.videoPlayerOption.sources = [
          {
            src: this.API_URL + `/${link}`,
            type: "video/mp4",
          },
        ];
      },
      (error) => console.log(error)
    );
  }
  onBack(): void {
    this._location.back();
  }
}

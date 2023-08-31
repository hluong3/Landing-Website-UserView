import { ActivatedRoute } from "@angular/router";
import { environment } from "./../../../../environments/environment";
import { Component, OnInit } from "@angular/core";
import videoJsOptions from "src/app/video-player/basic-video-play-option";

@Component({
  selector: "app-video-offering-play",
  templateUrl: "./video-offering-play.component.html",
  styleUrls: ["./video-offering-play.component.scss"],
})
export class VideoOfferingPlayComponent implements OnInit {
  API_URL = environment.API_URL;
  videoPlayerOption = videoJsOptions;
  video = {};
  constructor(private _route: ActivatedRoute) {
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
}

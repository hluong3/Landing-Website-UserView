import { IHomeRightMenu } from "./../../models/home";
import { environment } from "./../../../environments/environment";
import { DomSanitizer } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { IMWVideoItem, IVideoItem } from "src/app/models/video-item";
import { VideoLibraryService } from "src/app/services/video-library.service";
import { IHomeOffering, IHomeSetting } from "src/app/models/home";

export interface VideoLibraryItem {
  item: IVideoItem;
  isSelected: boolean;
}
@Component({
  selector: "app-video-library",
  templateUrl: "./video-library.component.html",
  styleUrls: ["./video-library.component.scss"],
})
export class VideoLibraryComponent implements OnInit {
  API_URL = environment.API_URL;

  modernVideos: IMWVideoItem[] = [];
  offeringVideos: IHomeOffering[] = [];
  bannerVideos: IHomeSetting;
  menuVideos: IHomeRightMenu[];
  constructor(
    private _videoLibraryService: VideoLibraryService,
    private _sanitizer: DomSanitizer
  ) {
    this._videoLibraryService.getVideoRightMenu().subscribe((data) => {
      this.menuVideos = data?.menu;
    });
    this._videoLibraryService.getVideoLibraryBanner().subscribe((data) => {
      this.bannerVideos = data;
      this.bannerVideos.image = data.image ?? "assets/img/Training.jpg";
      this.bannerVideos.title = data.title ?? "Video Library";
      this.bannerVideos.description =
        data.description ??
        "Put the employee experience first to achieve new levels of productivity, engagement and collaboration, and help win the war for talent.";
    });
  }

  ngOnInit(): void {
    this._videoLibraryService.getVideoMWCategory().subscribe(
      (data) => {
        this.modernVideos = data;
      },
      (error) => console.log(error)
    );
    this._videoLibraryService.getOfferingList().subscribe(
      (data) => {
        this.offeringVideos = data;
      },
      (error) => console.log(error)
    );
  }
  trustImage(thumbnail: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      thumbnail
        ? thumbnail
          ? this.API_URL + "/attachment?filename=" + thumbnail
          : ""
        : ""
    );
  }
}
